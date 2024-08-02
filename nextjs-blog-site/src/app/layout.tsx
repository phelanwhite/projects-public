import type { Metadata } from "next";
import { Inter, Work_Sans } from "next/font/google";
import "./globals.css";
import ReactQueryProvider from "@/components/ReactQueryProvider";
import { ClerkProvider } from "@clerk/nextjs";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });
const work_Sans = Work_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Nextjs Blog Site",
  description: "Write a new blog",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <ReactQueryProvider>
        <html lang="en">
          <body className={work_Sans.className}>
            <Header />
            <main className="max-w-[1216px] w-full mx-auto pt-6">
              {children}
              <div className="bg-bgGray text-secondaryColor text-center p-4 mt-20 mb-24">
                <div className="text-sm">Advertisement</div>
                <div className="text-xl font-semibold">You can place ads</div>
                <div className="text-[18px]">750x100</div>
              </div>
            </main>
            <Footer />
          </body>
        </html>
      </ReactQueryProvider>
    </ClerkProvider>
  );
}
