import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUserId } from "@/lib/auth";
import { expenseSchema } from "@/lib/validation";

export async function GET() {
  const userId = await getCurrentUserId();
  const items = await prisma.expense.findMany({ where: { userId }, orderBy: { date: "desc" } });
  return NextResponse.json({
    items: items.map((i) => ({ ...i, amount: Number(i.amount), date: i.date.toISOString() }))
  });
}

export async function POST(request: Request) {
  const userId = await getCurrentUserId();
  const payload = await request.json();
  const parsed = expenseSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const created = await prisma.expense.create({
    data: {
      userId,
      amount: parsed.data.amount,
      title: parsed.data.title,
      category: parsed.data.category,
      date: new Date(parsed.data.date)
    }
  });

  return NextResponse.json({ item: { ...created, amount: Number(created.amount) } }, { status: 201 });
}
