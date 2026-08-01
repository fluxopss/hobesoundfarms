import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Meet Our Residents",
  description:
    "Meet the livestock of Hobe Sound Farms — Brangus cattle, goats, hatchery chicks, Indio Gigante, and more.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
