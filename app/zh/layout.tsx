import { Inter } from "next/font/google";
import type { ReactNode } from "react";
import "../globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export default function ChineseLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="zh-Hans"
      suppressHydrationWarning
      className={`${inter.variable} h-full antialiased`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html:
              'try{if(localStorage.getItem("preferred-theme")==="dark")document.documentElement.dataset.theme="dark"}catch(e){}',
          }}
        />
      </head>
      <body className="flex min-h-full flex-col bg-bg font-sans text-text">
        <main className="relative z-10 flex-1">{children}</main>
      </body>
    </html>
  );
}
