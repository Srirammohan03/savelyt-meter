import { cn } from "@/lib/utils";

export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={cn(
        "h-11 w-full rounded-xl border border-border bg-transparent px-3 text-sm outline-none ring-0 transition focus:border-yellow-400",
        props.className
      )}
    />
  );
}
