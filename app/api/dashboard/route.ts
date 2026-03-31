import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUserId } from "@/lib/auth";

export async function GET(request: Request) {
  const userId = await getCurrentUserId();
  const { searchParams } = new URL(request.url);
  const month = Number(searchParams.get("month") || new Date().getMonth() + 1);
  const year = Number(searchParams.get("year") || new Date().getFullYear());
  const start = new Date(year, month - 1, 1);
  const end = new Date(year, month, 0, 23, 59, 59);

  const [incomes, expenses] = await Promise.all([
    prisma.income.findMany({ where: { userId, date: { gte: start, lte: end } } }),
    prisma.expense.findMany({ where: { userId, date: { gte: start, lte: end } } })
  ]);

  const totalIncome = incomes.reduce((sum, item) => sum + Number(item.amount), 0);
  const totalExpenses = expenses.reduce((sum, item) => sum + Number(item.amount), 0);

  const categoryMap = new Map<string, number>();
  expenses.forEach((expense) => {
    categoryMap.set(expense.category, (categoryMap.get(expense.category) || 0) + Number(expense.amount));
  });

  return NextResponse.json({
    totalIncome,
    totalExpenses,
    balance: totalIncome - totalExpenses,
    byCategory: Array.from(categoryMap.entries()).map(([name, value]) => ({ name, value }))
  });
}
