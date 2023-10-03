import './globals.css'
import { AuthContextProvider } from '@/components/auth/AuthContext'
import ThemeRegistry from '@/components/theme/ThemeRegistry'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'R-TEA | Rastreamento Comportamental de Pessoas Autistas'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt">
      <body className={inter.className}>
        <ThemeRegistry options={{ key: 'mui' }}>
          <AuthContextProvider>
            {children}
          </AuthContextProvider>
        </ThemeRegistry>
      </body>
    </html>
  )
}
