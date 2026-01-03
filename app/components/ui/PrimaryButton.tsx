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
        "bg-primary text-primary-foreground h-fit w-full min-w-48 px-8 py-2 font-semibold text-nowrap uppercase transition-[transform_shadow] duration-300 will-change-transform",
        "rounded-base shadow-base border border-[#111]",
        "hover:shadow-hover hover:-translate-x-px hover:-translate-y-px hover:cursor-pointer",
        "focus-visible:border-primary focus-visible:shadow-focus active:shadow-focus focus-within:outline-none focus:outline-none active:translate-x-[2px] active:translate-y-[2px]",
      )}
    >
      {children}
    </BaseButton>
  );
}
