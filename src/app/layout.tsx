import { Toaster } from "@/components/ui/sonner";
import { ClerkProvider } from "@/services/clerk/components/ClerkProvider";
import "@/styles/globals.css";
import "@mdxeditor/editor/style.css";
import { type Metadata } from "next";
import { Geist } from "next/font/google";

export const metadata: Metadata = {
  title: "Atlas - AI Job Board",
  description:
    "Atlas is an AI-powered job board that connects job seekers with opportunities tailored to their skills and preferences.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClerkProvider>
      <html lang="en" className={`${geist.variable} dark`}>
        <body className="font-sans antialiased">
          {children}

          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
