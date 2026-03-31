import { z } from "zod";

export const incomeSchema = z.object({
  amount: z.coerce.number().positive(),
  type: z.enum(["fixed", "extra"]),
  title: z.string().min(2).max(80),
  date: z.string().datetime()
});

export const expenseSchema = z.object({
  amount: z.coerce.number().positive(),
  category: z.string().min(2).max(32),
  title: z.string().max(80).optional(),
  date: z.string().datetime()
});

export const expenseUpdateSchema = expenseSchema.partial().extend({
  id: z.string().min(1)
});
