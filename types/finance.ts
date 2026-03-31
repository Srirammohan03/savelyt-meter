export type DashboardSummary = {
  totalIncome: number;
  totalExpenses: number;
  balance: number;
  byCategory: Array<{ name: string; value: number }>;
};

export type IncomeItem = {
  id: string;
  amount: number;
  type: "fixed" | "extra";
  title: string;
  date: string;
};

export type ExpenseItem = {
  id: string;
  amount: number;
  category: string;
  title?: string;
  date: string;
};
