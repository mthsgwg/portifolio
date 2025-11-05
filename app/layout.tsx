
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Toaster } from 'sonner'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  metadataBase: new URL('https://matheus-portfolio.vercel.app'),
  title: 'Matheus Faria - Fullstack Developer',
  description: 'Portfólio profissional de Matheus Faria, desenvolvedor Fullstack especializado em NextJS, NodeJS, TypeScript, NestJS e TypeORM.',
  keywords: ['Fullstack Developer', 'NextJS', 'NodeJS', 'TypeScript', 'NestJS', 'TypeORM', 'React', 'Desenvolvedor'],
  authors: [{ name: 'Matheus Faria' }],
  creator: 'Matheus Faria',
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: '/',
    siteName: 'Matheus Faria Portfolio',
    title: 'Matheus Faria - Fullstack Developer',
    description: 'Portfólio profissional de Matheus Faria, desenvolvedor Fullstack especializado em NextJS, NodeJS, TypeScript, NestJS e TypeORM.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Matheus Faria - Fullstack Developer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Matheus Faria - Fullstack Developer',
    description: 'Portfólio profissional de Matheus Faria, desenvolvedor Fullstack',
    images: ['/og-image.png'],
  },
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" className="dark">
      <body className={`${inter.className} bg-black text-white overflow-x-hidden`}>
        {children}
        <Toaster theme="dark" position="top-right" />
      </body>
    </html>
  )
}
