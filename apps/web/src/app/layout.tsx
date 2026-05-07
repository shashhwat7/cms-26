import './globals.css';
import type { Metadata } from 'next';
import { Inter, Lora, JetBrains_Mono } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const lora = Lora({ subsets: ['latin'], variable: '--font-lora' });
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' });

export const metadata: Metadata = {
  title: 'Social Vault',
  description: 'High-performance social media asset manager',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${lora.variable} ${jetbrainsMono.variable} h-full`}>
      <body className="bg-[#0D0A1A] text-slate-200 h-full overflow-y-auto">{children}</body>
    </html>
  );
}
