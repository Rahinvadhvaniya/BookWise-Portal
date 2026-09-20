import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "BookWise Portal | Discover. Read. Listen. Order.",
    template: "%s | BookWise Portal",
  },
  description:
    "BookWise Portal is a modern bookstore for physical books and protected audiobooks.",
  metadataBase: new URL("https://bookwise-portal.example.com"),
  openGraph: {
    title: "BookWise Portal",
    description: "Discover. Read. Listen. Order.",
    type: "website",
    url: "https://bookwise-portal.example.com",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
