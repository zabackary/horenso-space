import { SignupForm } from "@/components/signup-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign up",
};

export default function Page() {
  return <SignupForm />;
}
