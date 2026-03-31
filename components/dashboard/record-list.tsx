"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

type Record = {
  id: string;
  amount: number;
  title?: string;
  date: string;
  category?: string;
  type?: string;
};

function groupByDate(items: Record[]) {
  return items.reduce<Record<string, Record[]>>((acc, item) => {
    const key = new Date(item.date).toLocaleDateString();
    acc[key] = acc[key] || [];
    acc[key].push(item);
    return acc;
  }, {});
}

export function RecordList({ kind, items, onRefresh }: { kind: "income" | "expense"; items: Record[]; onRefresh: () => void }) {
  async function remove(id: string) {
    await fetch(`/api/${kind}/${id}`, { method: "DELETE" });
    onRefresh();
  }

  const grouped = groupByDate(items);

  return (
    <Card>
      <h3 className="mb-4 font-medium">{kind === "income" ? "Income" : "Expenses"}</h3>
      <div className="space-y-4">
        {Object.entries(grouped).map(([date, rows]) => {
          const dailyTotal = rows.reduce((sum, row) => sum + row.amount, 0);
          return (
            <div key={date} className="space-y-2">
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>{date}</span>
                <span className="tabular-nums">${dailyTotal.toFixed(2)}</span>
              </div>
              <AnimatePresence>
                {rows.map((item) => (
                  <motion.div
                    layout
                    key={item.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    className="flex items-center justify-between rounded-xl border border-border p-3"
                  >
                    <div>
                      <p className="text-sm font-medium">{item.title || item.category || kind}</p>
                      <p className="text-xs text-muted-foreground">{item.category || item.type}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <p className="tabular-nums font-medium">${item.amount.toFixed(2)}</p>
                      <Button variant="ghost" onClick={() => remove(item.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
