import { cn } from "@/lib/utils";

export default function HeaderText({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <h1
      className={cn(
        "font-mono text-5xl leading-[0.9] font-semibold uppercase lg:text-9xl xl:text-[12rem]",
        "text-shadow-[4px_4px_0_#d8d8d8]",
      )}
    >
      {children}
    </h1>
  );
}
