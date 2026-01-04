import { Metadata } from "next";
import CertificateClient from "./CertificateClient";

export const metadata: Metadata = {
  title: "Get Certificate",
  description:
    "Find and download your DesignX workshop participation certificate.",
};

export default function CertificatePage() {
  return <CertificateClient />;
}
