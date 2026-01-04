import { cn } from "@/lib/utils";

export default function Textarea(
  props: React.TextareaHTMLAttributes<HTMLTextAreaElement>,
) {
  return (
    <textarea
      {...props}
      className={cn(
        "bg-background w-full appearance-none px-4 py-2 transition-[transform_shadow] duration-300 will-change-transform outline-none lg:min-w-[24rem]",
        "rounded-base shadow-base border border-[#111]",
        "focus:border-primary focus:ring-primary focus-within:border-primary focus-visible:border-primary focus:shadow-focus focus:translate-x-[2px] focus:translate-y-[2px]",
        "placeholder:text-foreground/50",
      )}
    />
  );
}
