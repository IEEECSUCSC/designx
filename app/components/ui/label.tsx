import { cn } from "@/lib/utils";

export default function Label(
  props: React.LabelHTMLAttributes<HTMLLabelElement>,
) {
  return (
    <label
      {...props}
      className={cn("text-foreground/80 text-sm font-medium md:text-xl")}
    />
  );
}
