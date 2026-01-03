import Image from "next/image";

import WatermarkImage from "@/assets/watermark.png";

export default function Watermark() {
  return (
    <div className="absolute -right-1 bottom-0 z-1 flex h-[calc(100vh-var(--header-height))] w-[620px] justify-end">
      <Image
        src={WatermarkImage}
        alt="DesignX watermark"
        className="pointer-events-none h-full w-auto"
        width={620}
        height={100}
        priority
      />
    </div>
  );
}
