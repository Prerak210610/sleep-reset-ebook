import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import MagneticCursor from "@/components/MagneticCursor";
import BookingModal from "@/components/BookingModal";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-cormorant",
  display: "swap"
});
const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-dm-sans",
  display: "swap"
});
const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["italic", "normal"],
  variable: "--font-playfair",
  display: "swap"
});

export const metadata: Metadata = {
  metadataBase: new URL("https://drsampoorna.com"),
  title: {
    default: "Dr. Sampoorna · Therapeutic Yoga · PhD Yogic Science",
    template: "%s · Dr. Sampoorna"
  },
  description:
    "PhD Scholar in Yogic Science, RYT 500, 22+ years of therapeutic practice. Founder of Cosmia Wellness and creator of the Sampoorna Fertility Yoga (SFY) Protocol.",
  keywords: [
    "Dr. Sampoorna",
    "Therapeutic Yoga",
    "Yogic Science",
    "Cosmia Wellness",
    "Sampoorna Fertility Yoga",
    "SFY",
    "Corporate Yoga India",
    "RYT 500",
    "Ministry of AYUSH"
  ],
  openGraph: {
    title: "Dr. Sampoorna · Therapeutic Yoga · PhD Yogic Science",
    description:
      "Where ancient wisdom meets modern science. 22+ years of clinical practice. PhD Scholar in Yogic Science.",
    type: "website"
  },
  robots: { index: true, follow: true }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${dmSans.variable} ${playfair.variable}`}>
      <body>
        <Providers>
          <MagneticCursor />
          <Navbar />
          <main className="pt-[106px]">{children}</main>
          <Footer />
          <FloatingWhatsApp />
          <BookingModal />
        </Providers>
      </body>
    </html>
  );
}
