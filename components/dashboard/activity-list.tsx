import { Card } from "@/components/ui/card";
import { ExpenseItem } from "@/types/finance";

export function ActivityList({ items }: { items: ExpenseItem[] }) {
  return (
    <Card>
      <h3 className="mb-4 text-sm font-medium text-muted-foreground">Recent Activity</h3>
      {items.length === 0 ? (
        <p className="rounded-xl border border-dashed border-border p-6 text-sm text-muted-foreground">No activity yet. Add your first expense.</p>
      ) : (
        <div className="space-y-3">
          {items.map((item) => (
            <div key={item.id} className="flex items-center justify-between border-b border-border pb-3 last:border-0 last:pb-0">
              <div>
                <p className="font-medium">{item.title || "Expense"}</p>
                <p className="text-xs text-muted-foreground">{item.category}</p>
              </div>
              <span className="tabular-nums">-${item.amount.toFixed(2)}</span>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}
