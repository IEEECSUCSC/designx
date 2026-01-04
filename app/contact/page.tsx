"use client";

import { useState } from "react";
import Input from "../components/ui/input";
import PrimaryButton from "../components/ui/PrimaryButton";
import Label from "../components/ui/label";
import HeaderText from "../components/ui/HeaderText";
import { cn } from "@/lib/utils";
import Textarea from "../components/ui/Textarea";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{
    type: "success" | "error" | null;
    message: string | null;
  }>({ type: null, message: null });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({ type: null, message: null });
    setLoading(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus({ type: "success", message: data.message });
        setFormData({ firstName: "", lastName: "", email: "", message: "" });
      } else {
        setStatus({
          type: "error",
          message: data.error || "Something went wrong.",
        });
      }
    } catch (error) {
      console.error(error);
      setStatus({ type: "error", message: "Failed to send message." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="page-height page-top-margin relative z-20 flex flex-col items-center justify-center">
      <div className="container flex h-full w-full flex-1 flex-col px-4 py-12 lg:px-0">
        <div className="flex flex-col gap-6">
          <HeaderText>Contact Us</HeaderText>
          <form
            onSubmit={handleSubmit}
            className="flex w-full max-w-4xl flex-col gap-4 lg:w-fit"
          >
            <div className="flex w-full flex-col gap-4 lg:flex-row">
              <div className="flex w-full flex-col space-y-1 lg:w-fit">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  name="firstName"
                  type="text"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="First Name"
                  required
                  //   className="w-full"
                />
              </div>
              <div className="flex w-full flex-col space-y-1 lg:w-fit">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  name="lastName"
                  type="text"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Last Name"
                  required
                  //   className="w-full"
                />
              </div>
            </div>

            <div className="flex w-full flex-col space-y-1">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
                className="w-full"
              />
            </div>

            <div className="flex w-full flex-col space-y-1">
              <Label htmlFor="message">Context</Label>
              <Textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="How can we help you?"
                required
                rows={5}
              />
            </div>

            <div className="flex justify-center pt-4 lg:justify-start">
              <PrimaryButton type="submit" disabled={loading}>
                {loading ? "Sending..." : "Send Message"}
              </PrimaryButton>
            </div>

            {status.message && (
              <p
                className={cn(
                  "mt-2 text-sm font-medium",
                  status.type === "error" ? "text-red-500" : "text-green-600",
                )}
              >
                {status.message}
              </p>
            )}
          </form>
        </div>
      </div>
    </main>
  );
}
