import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Kharga Digital Media | CMS Studio',
  description: 'Executive Content Management System for Kharga Digital Media',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light">
      <body className="bg-[#edf1f7] dark:bg-[#08090f] text-[#0f172a] dark:text-[#f8fafc] antialiased selection:bg-[#D4AF37] selection:text-black">
        {children}
      </body>
    </html>
  );
}
