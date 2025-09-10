import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { AuthProvider } from "@/components/auth-provider"
import { LanguageProvider } from "@/lib/i18n/language-context"
import { Suspense } from "react"
import "./globals.css"

export const metadata: Metadata = {
  title: "Rural Health Connect - Healthcare for Every Village",
  description:
    "Bridging the gap between rural communities and quality healthcare through technology, making medical care accessible, affordable, and efficient for all.",
  generator: "v0.app",
  keywords:
    "rural healthcare, telemedicine, digital health records, AI diagnostics, medicine tracker, India healthcare",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <Suspense fallback={<div>Loading...</div>}>
          <LanguageProvider>
            <AuthProvider>{children}</AuthProvider>
          </LanguageProvider>
        </Suspense>
        <Analytics />
      </body>
    </html>
  )
}
