import Image from "next/image";
import certificates from "@/data/certificates.json";
import NavBar from "../components/NavBar";

type Certificate = {
  certificateId: string;
  name: string;
  event: string;
  role?: string;
  issueDate: string;
  workshops?: string[];
  certificateImage?: string;
};

export default function CertificatePage({
  searchParams,
}: {
  searchParams: { id?: string };
}) {
  const idFromQuery = searchParams?.id?.toString();
  const certificateList = certificates as Certificate[];
  const found = certificateList.find((item) =>
    idFromQuery
      ? item.certificateId.toLowerCase() === idFromQuery.toLowerCase()
      : item.certificateId === certificateList?.[0]?.certificateId,
  );
  const certificate = found ?? certificateList[0];
  const imageSrc = certificate.certificateImage || "/new.png";

  return (
    <main className="site-shell px-5 pb-14 pt-6">
      <Image
        src="/left_side_watermark.png"
        alt="DesignX watermark"
        width={620}
        height={960}
        className="site-watermark"
        priority
      />

      <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-10">
        <NavBar />

        <section className="relative flex w-full flex-col items-center gap-4">
          <div className="relative w-full max-w-5xl overflow-hidden rounded-md bg-white shadow-lg">
            <Image
              src={imageSrc}
              alt={`Certificate for ${certificate.name}`}
              width={1400}
              height={990}
              className="h-auto w-full"
              priority
            />
          </div>

          <div className="absolute -left-16 top-10 hidden sm:block">
            <Image
              src="/bot1.png"
              alt="Pixel bot"
              width={68}
              height={68}
              className="floating-icon"
            />
          </div>
          <div className="absolute -right-10 bottom-16 hidden sm:block">
            <Image
              src="/bot2.png"
              alt="Pixel bot"
              width={72}
              height={72}
              className="floating-icon"
            />
          </div>
        </section>
      </div>
    </main>
  );
}
