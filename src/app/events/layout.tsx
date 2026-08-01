import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nights",
  description:
    "Farmers market weekends, Farm After Dark, line dancing, and seasonal festivals at Hobe Sound Farms.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
