import type { Metadata, Viewport } from "next";
import { Playfair_Display, Outfit, Dancing_Script, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { CustomCursor } from "@/components/ui/custom-cursor";
import { FloatingElements } from "@/components/ui/floating-elements";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const dancingScript = Dancing_Script({
  variable: "--font-dancing",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600"],
  display: "swap",
});

// The "machine voice" — reserved for metadata: eyebrows, dates, times,
// commit hashes, coordinates. Never headlines, never body prose.
const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0A0A0C",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="vi"
      className={`${playfair.variable} ${outfit.variable} ${dancingScript.variable} ${plexMono.variable} antialiased`}
    >
      {/* suppressHydrationWarning: browser extensions (adblock/VPN) inject
          attributes like bis_register into <body> before React hydrates —
          harmless, but React logs a mismatch warning without this. Only
          suppresses attribute warnings on this one element. */}
      <body
        suppressHydrationWarning
        className="min-h-screen bg-[#0A0A0C] text-white overflow-x-clip w-full"
      >
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
