import './style/global.css';
import { Inter } from 'next/font/google';

// Use Inter with various weights for better typography
const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  weight: ['400', '500', '600', '700', '800']
});

export const metadata = {
  title: 'Joey Russell | Software Developer',
  description: 'Personal portfolio website of Joey Russell, Software Developer specializing in modern web applications and software solutions.',
  keywords: 'software developer, web developer, full stack, portfolio, Joey Russell, programming',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} bg-white text-gray-900 antialiased`}>
        {children}
      </body>
    </html>
  );
}