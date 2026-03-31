"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";

type Kind = "income" | "expense";

export function FinanceForm({ kind, onDone }: { kind: Kind; onDone: () => void }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(formData: FormData) {
    try {
      setLoading(true);
      setError(null);
      const payload = {
        amount: Number(formData.get("amount")),
        title: String(formData.get("title") || ""),
        date: new Date(String(formData.get("date"))).toISOString(),
        ...(kind === "income"
          ? { type: String(formData.get("type") || "extra") }
          : { category: String(formData.get("category") || "General") })
      };
      const res = await fetch(`/api/${kind}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      if (!res.ok) throw new Error("Unable to save");
      onDone();
      setOpen(false);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Button onClick={() => setOpen(true)}>Add {kind}</Button>
      <AnimatePresence>
        {open ? (
          <motion.div className="fixed inset-0 z-50 bg-black/50 p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div initial={{ y: 24, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 30, opacity: 0 }} transition={{ duration: 0.25 }} className="mx-auto mt-24 max-w-md rounded-2xl border border-border bg-card p-6">
              <h3 className="mb-4 text-lg font-semibold">Add {kind}</h3>
              <form
                action={async (fd) => {
                  await submit(fd);
                }}
                className="space-y-3"
              >
                <Input name="amount" type="number" placeholder="Amount" step="0.01" required />
                {kind === "expense" ? (
                  <Select name="category" defaultValue="Food">
                    <option>Food</option>
                    <option>Transport</option>
                    <option>Shopping</option>
                    <option>Bills</option>
                  </Select>
                ) : (
                  <Select name="type" defaultValue="fixed">
                    <option value="fixed">Fixed</option>
                    <option value="extra">Extra</option>
                  </Select>
                )}
                <Input name="title" placeholder="Title" />
                <Input name="date" type="date" required />
                {error ? <p className="text-sm text-red-500">{error}</p> : null}
                <div className="flex gap-2">
                  <Button type="submit" disabled={loading} className="flex-1">
                    {loading ? "Saving..." : "Save"}
                  </Button>
                  <Button type="button" variant="secondary" onClick={() => setOpen(false)}>
                    Cancel
                  </Button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
