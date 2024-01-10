"use client";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import TokenProvider from "@/lib/TokenProvider";
import { AuthContext } from "@/lib/AuthContext";
import { useState } from "react";
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Define state variables

  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
          <TokenProvider>
            <Navbar />
            {children}
          </TokenProvider>
        </AuthContext.Provider>
      </body>
    </html>
  );
}
