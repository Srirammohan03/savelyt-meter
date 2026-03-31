"use client";

import { ArrowDownCircle, ArrowUpCircle, Wallet } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { ActivityList } from "@/components/dashboard/activity-list";
import { CategoryChart } from "@/components/dashboard/category-chart";
import { FinanceForm } from "@/components/dashboard/finance-form";
import { RecordList } from "@/components/dashboard/record-list";
import { StatCard } from "@/components/dashboard/stat-card";
import { Skeleton } from "@/components/ui/skeleton";
import { DashboardSummary, ExpenseItem, IncomeItem } from "@/types/finance";

export default function DashboardPage() {
  const [summary, setSummary] = useState<DashboardSummary | null>(null);
  const [incomes, setIncomes] = useState<IncomeItem[]>([]);
  const [expenses, setExpenses] = useState<ExpenseItem[]>([]);
  const [loading, setLoading] = useState(true);

  const refresh = async () => {
    setLoading(true);
    const [summaryRes, incomeRes, expenseRes] = await Promise.all([
      fetch("/api/dashboard"),
      fetch("/api/income"),
      fetch("/api/expense")
    ]);
    const summaryData = await summaryRes.json();
    const incomeData = await incomeRes.json();
    const expenseData = await expenseRes.json();
    setSummary(summaryData);
    setIncomes(incomeData.items || []);
    setExpenses(expenseData.items || []);
    setLoading(false);
  };

  useEffect(() => {
    void refresh();
  }, []);

  const topExpenses = useMemo(() => expenses.slice(0, 5), [expenses]);

  if (loading || !summary) {
    return (
      <div className="grid gap-6">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          <Skeleton className="h-36" />
          <Skeleton className="h-36" />
          <Skeleton className="h-36" />
        </div>
        <Skeleton className="h-64" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <div className="flex gap-2">
          <FinanceForm kind="income" onDone={refresh} />
          <FinanceForm kind="expense" onDone={refresh} />
        </div>
      </div>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <StatCard title="Total Income" value={`$${summary.totalIncome.toFixed(2)}`} icon={<ArrowUpCircle className="h-5 w-5 text-yellow-500" />} />
        <StatCard title="Total Expenses" value={`$${summary.totalExpenses.toFixed(2)}`} icon={<ArrowDownCircle className="h-5 w-5 text-orange-500" />} />
        <StatCard title="Remaining Balance" value={`$${summary.balance.toFixed(2)}`} icon={<Wallet className="h-5 w-5 text-emerald-500" />} />
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <CategoryChart data={summary.byCategory} />
        <ActivityList items={topExpenses} />
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <RecordList kind="income" items={incomes} onRefresh={refresh} />
        <RecordList kind="expense" items={expenses} onRefresh={refresh} />
      </section>
    </div>
  );
}
