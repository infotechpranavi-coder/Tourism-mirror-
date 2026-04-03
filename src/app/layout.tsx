import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import Footer from "@/components/layout/Footer";
import PageTransition from "@/components/layout/PageTransition";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Bhoomi | Premium News & Magazine Portal",
  description: "Stay updated with the latest news, featured stories, and digital magazines. Experience next-gen journalism with Bhoomi.",
  keywords: ["news", "magazine", "bhoomi", "digital news", "articles", "news portal"],
  authors: [{ name: "Aitik-official" }],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-white`}>
        <Toaster position="bottom-right" reverseOrder={false} />
        <div className="min-h-screen flex flex-col text-dark overflow-x-hidden">
          <main className="flex-1">
            <PageTransition>{children}</PageTransition>
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
