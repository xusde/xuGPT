import React from "react";
import AppContextProvider from "@/components/AppContext";
import EventBusContextProvider from "@/components/EventBusContext";
import "@/styles/globals.css";
import "@/styles/markdown.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "xuGPT",
  description: "enjoy the power of ChatGPT",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="">
        <AppContextProvider>
          <EventBusContextProvider>{children}</EventBusContextProvider>
        </AppContextProvider>
      </body>
    </html>
  );
}
