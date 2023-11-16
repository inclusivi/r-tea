import './globals.css'
import { AuthContextProvider } from '@/components/auth/AuthContext'
import ThemeRegistry from '@/components/theme/ThemeRegistry'
import { darkTheme } from '@/components/theme/default'
import type { Metadata } from 'next'

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
      <body>
        <ThemeRegistry options={{ key: 'mui' }} theme={darkTheme}>
          <AuthContextProvider>
            {children}
          </AuthContextProvider>
        </ThemeRegistry>
      </body>
    </html>
  )
}
