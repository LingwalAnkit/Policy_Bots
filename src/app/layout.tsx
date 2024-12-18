import React from "react";
import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./global.css";
import { twMerge } from "tailwind-merge";
import { ThemeProvider } from './context/themeContext';

const dmSans = DM_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Policy Bots",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="relative">
      <body className={`${twMerge(dmSans.className, "antialiased bg-white")} dark:bg-medium`}>
      <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
