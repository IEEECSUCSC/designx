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
      className={cn("bg-primary text-primary-foreground px-8 py-2 font-medium")}
    >
      {children}
    </BaseButton>
  );
}
