import type { Metadata, Viewport } from "next";
import { Playfair_Display, Outfit, Dancing_Script } from "next/font/google";
import "./globals.css";
import { CustomCursor } from "@/components/ui/custom-cursor";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

const dancingScript = Dancing_Script({
  variable: "--font-dancing",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  title: "Lễ Tốt Nghiệp - Phan Lê Thanh Hoàng | Graduation Ceremony",
  description:
    "Bạn được mời tham dự lễ tốt nghiệp của Phan Lê Thanh Hoàng — Kỹ sư Công nghệ Thông tin, Đại học FPT Đà Nẵng. You are invited to celebrate the graduation of Phan Le Thanh Hoang.",
  openGraph: {
    title: "Lễ Tốt Nghiệp - Phan Lê Thanh Hoàng",
    description:
      "Hãy cùng chúc mừng hành trình tốt nghiệp. Celebrate the graduation journey.",
    type: "website",
    images: ["/assets/logo.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lễ Tốt Nghiệp - Phan Lê Thanh Hoàng",
    description: "Hãy cùng chúc mừng hành trình tốt nghiệp. Celebrate the graduation journey.",
    images: ["/assets/logo.png"],
  },
};

import { Security } from "@/components/ui/security";
import { FloatingElements } from "@/components/ui/floating-elements";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="vi"
      className={`${playfair.variable} ${outfit.variable} ${dancingScript.variable} antialiased`}
    >
      <body className="min-h-screen bg-[#0A0A0C] text-white overflow-x-clip w-full">
        <Security />
        <FloatingElements />
        <a href="#main-content" className="skip-to-content">
          Skip to main content
        </a>
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
