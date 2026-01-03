import { cn } from "@/lib/utils";

export default function NotFoundText({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <h1
      className={cn(
        "font-mono text-[12rem] leading-[0.9] font-semibold uppercase lg:text-[16rem] xl:text-[28rem]",
        "text-shadow-[4px_4px_0_#d8d8d8]",
      )}
    >
      {children}
    </h1>
  );
}
