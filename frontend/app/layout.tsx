import type { Metadata } from "next";
import { Poppins, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-plus-jakarta",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: {
    default: "Mangroves Global",
    template: "%s | Mangroves Global",
  },
  description:
    "Mangroves Global Trading FZ LLC — UAE-based business group operating across trading, logistics and creative business services.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${plusJakarta.variable} ${poppins.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
