import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUserId } from "@/lib/auth";
import { expenseSchema } from "@/lib/validation";

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const userId = await getCurrentUserId();
  const { id } = await params;
  const payload = await request.json();
  const parsed = expenseSchema.partial().safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const existing = await prisma.expense.findFirst({ where: { id, userId } });
  if (!existing) {
    return NextResponse.json({ error: "Expense not found" }, { status: 404 });
  }

  const updated = await prisma.expense.update({
    where: { id },
    data: {
      title: parsed.data.title,
      category: parsed.data.category,
      amount: parsed.data.amount,
      date: parsed.data.date ? new Date(parsed.data.date) : undefined
    }
  });
  return NextResponse.json({ item: { ...updated, amount: Number(updated.amount) } });
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const userId = await getCurrentUserId();
  const { id } = await params;
  await prisma.expense.deleteMany({ where: { id, userId } });
  return NextResponse.json({ ok: true });
}
