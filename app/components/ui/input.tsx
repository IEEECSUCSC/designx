import { cn } from "@/lib/utils";
import { Input as BaseInput } from "@base-ui/react/input";

type InputProps = React.ComponentPropsWithoutRef<typeof BaseInput>;

export default function Input(props: InputProps) {
  return (
    <BaseInput
      {...props}
      tabIndex={1}
      className={cn(
        "w-full lg:min-w-[24rem] appearance-none px-4 py-2 outline-none",
        "rounded-base border border-[#111] shadow-base",
        "focus:border-primary focus:ring-primary focus-within:border-primary active:border-primary focus-visible:border-primary",
        "placeholder:text-foreground/50",
      )}
    />
  );
}
