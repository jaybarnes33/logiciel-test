"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import { MultiStepFormProvider } from "@/context/FormContext";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <MultiStepFormProvider>{children}</MultiStepFormProvider>
      </body>
    </html>
  );
}
