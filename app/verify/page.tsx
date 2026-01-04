import { Metadata } from "next";
import VerifyClient from "./VerifyClient";

export const metadata: Metadata = {
  title: "Verify Certificate",
  description: "Verify your DesignX workshop participation certificate.",
};

export default function VerifyPage() {
  return <VerifyClient />;
}
