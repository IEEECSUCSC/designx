import { cn } from "@/lib/utils";
import { Button as BaseButton } from "@base-ui/react";
import { type ReactNode } from "react";

type PrimaryButtonProps = React.ComponentPropsWithoutRef<typeof BaseButton> & {
  children: ReactNode;
};

export default function PrimaryButton({
  children,
  ...props
}: PrimaryButtonProps) {
  return (
    <BaseButton
      {...props}
      className={cn(
        "bg-primary text-primary-foreground h-fit min-w-48 px-8 py-2 font-semibold uppercase transition-[transform_shadow] duration-300 will-change-transform",
        "border border-[#111] shadow-[4px_4px_0_#111111]",
        "hover:-translate-x-px hover:-translate-y-px hover:cursor-pointer hover:shadow-[6px_6px_0_#111111]",
        "focus-visible:border-primary focus-within:outline-none focus:outline-none focus-visible:shadow-[2px_2px_0_#111111] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0_#111111]",
      )}
    >
      {children}
    </BaseButton>
  );
}
