import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Triton Outfitters | Inventory Prediction Portal",
  description: "AI-powered tool to predict hoodie demand for campus events and mitigate deadstock.",
};

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
