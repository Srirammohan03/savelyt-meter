import { cn } from "@/lib/utils";

export function Select(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      {...props}
      className={cn(
        "h-11 w-full rounded-xl border border-border bg-transparent px-3 text-sm outline-none transition focus:border-yellow-400",
        props.className
      )}
    />
  );
}
