import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Experiences",
  description:
    "Weddings, field trips, animal encounters, birthdays, and Farm After Dark at Hobe Sound Farms.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
