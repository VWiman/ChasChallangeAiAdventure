import "/styles/globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "AI Adventure",
  description: "AI adventure website",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="container mx-auto max-w-5xl px-3">
          {children}
        </main>
      </body>
    </html>
  );
}
