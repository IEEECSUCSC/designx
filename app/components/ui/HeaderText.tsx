import { cn } from "@/lib/utils";

export default function HeaderText({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <h1
      className={cn(
        "text-2xl leading-[0.9] font-semibold uppercase lg:text-[12rem] font-mono",
        "text-shadow-[4px_4px_0_#d8d8d8]",
      )}
    >
      {children}
    </h1>
  );
}
