"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function SignUpPage() {
  return (
    <main className="flex min-h-screen items-center justify-center p-4">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }} className="w-full max-w-md">
        <Card className="space-y-6">
          <div className="space-y-2 text-center">
            <h1 className="text-2xl font-semibold">Create account</h1>
            <p className="text-sm text-muted-foreground">Start tracking with Savely</p>
          </div>
          <div className="space-y-3">
            <Input type="text" placeholder="Full Name" />
            <Input type="email" placeholder="Email" />
            <Input type="password" placeholder="Password" />
            <Button className="w-full">Create account</Button>
            <Button variant="secondary" className="w-full">Continue with Google</Button>
          </div>
          <p className="text-center text-sm text-muted-foreground">
            Already have an account? <Link className="font-medium text-foreground" href="/login">Sign in</Link>
          </p>
        </Card>
      </motion.div>
    </main>
  );
}
