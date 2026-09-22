import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "On To The Next",
  description: "Simple trip planning, one decision at a time.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <div className="site-shell">
          <header className="brand-bar">
            <Link className="brand" href="/">On To The Next</Link>
            <span className="prototype-badge">Sprint 1 prototype</span>
          </header>
          {children}
        </div>
      </body>
    </html>
  );
}
