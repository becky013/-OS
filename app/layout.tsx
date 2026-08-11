import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "localhost:3000";
  const protocol = requestHeaders.get("x-forwarded-proto") ?? (host.startsWith("localhost") ? "http" : "https");
  const socialImage = `${protocol}://${host}/og.png`;

  return {
    title: "Pet Life Operating System",
    description:
      "Explore the complete Pet Life Operating System inside a high-fidelity interactive iPhone prototype.",
    openGraph: {
      title: "Pet Life Operating System",
      description: "A high-fidelity interactive iPhone prototype for modern pet care.",
      type: "website",
      images: [{ url: socialImage, width: 1536, height: 1024, alt: "Pet Life Operating System iPhone prototype" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "Pet Life Operating System",
      description: "A high-fidelity interactive iPhone prototype for modern pet care.",
      images: [socialImage],
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
