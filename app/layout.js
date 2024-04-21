import "/styles/globals.css";

export const metadata = {
  title: "AI Adventure",
  description: "AI adventure website",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
