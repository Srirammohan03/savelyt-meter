"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";

export function StatCard({
  title,
  value,
  icon
}: {
  title: string;
  value: string;
  icon: React.ReactNode;
}) {
  return (
    <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.22 }}>
      <Card className="space-y-3">
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>{title}</span>
          {icon}
        </div>
        <p className="text-3xl font-semibold tabular-nums">{value}</p>
      </Card>
    </motion.div>
  );
}
