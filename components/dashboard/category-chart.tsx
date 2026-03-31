"use client";

import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";
import { Card } from "@/components/ui/card";

const colors = ["#FACC15", "#F59E0B", "#FB923C", "#FDBA74"];

export function CategoryChart({ data }: { data: Array<{ name: string; value: number }> }) {
  return (
    <Card>
      <h3 className="mb-4 text-sm font-medium text-muted-foreground">Category Breakdown</h3>
      {data.length ? (
        <div className="h-60">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={data} innerRadius={60} outerRadius={85} dataKey="value" paddingAngle={4}>
                {data.map((entry, index) => (
                  <Cell key={entry.name} fill={colors[index % colors.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <p className="rounded-xl border border-dashed border-border p-6 text-sm text-muted-foreground">No expense data yet.</p>
      )}
    </Card>
  );
}
