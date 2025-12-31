import Image from "next/image";

export default function Sponsors() {
    return (
        <section className="mx-auto mt-10 flex w-full max-w-3xl items-end justify-center gap-14 px-5 pb-10 text-center">
            <div className="space-y-3">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
                    Organized by
                </p>
                <div className="flex items-end justify-center gap-4">
                    <Image
                        src="/ieecs_logo.png"
                        alt="IEEE Computer Society"
                        width={170}
                        height={56}
                    />
                </div>
            </div>

            <div className="space-y-3">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
                    Partnering with
                </p>
                <div className="flex items-end justify-center">
                    <Image
                        src="/ifs_logo.png"
                        alt="IFS"
                        width={150}
                        height={56}
                    />
                </div>
            </div>
        </section>
    );
}
