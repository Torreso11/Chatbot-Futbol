import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

// Configuración de las fuentes
const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: 'TacticaAI - Football Tactical Analysis',
  description: 'Premium UEFA-level tactical analysis platform for European football',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      {/* Se aplican las variables de fuente y la clase antialiased. 
          ${geistSans.variable} permite usar 'font-sans' en Tailwind.
      */}
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased bg-[#0A0F0D] text-slate-200`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}