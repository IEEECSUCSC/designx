import Image from "next/image";

export default function Sponsors() {
  return (
    <section className="mx-auto mt-6 w-full max-w-4xl pb-10 text-center lg:mt-10">
      <div className="grid grid-cols-2 items-start gap-14">
        <div className="flex flex-col items-center gap-3">
          <p className="text-xs font-semibold tracking-[0.28em] text-zinc-500 uppercase">
            Organized by
          </p>
          <div className="flex h-16 items-center justify-center">
            <Image
              src="/ieecs_logo.png"
              alt="IEEE Computer Society"
              width={190}
              height={64}
              className="h-14 w-auto"
            />
          </div>
        </div>

        <div className="flex flex-col items-center gap-3">
          <p className="text-xs font-semibold tracking-[0.28em] text-zinc-500 uppercase">
            Partnering with
          </p>
          <div className="flex h-16 items-center justify-center">
            <Image
              src="/ifs_logo.png"
              alt="IFS"
              width={190}
              height={64}
              className="h-14 w-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
