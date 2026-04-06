import "./globals.css";

export const metadata = {
  title: "RAV4YOU STORE",
  description: "Jual Script & Akun Game",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-black text-white">{children}</body>
    </html>
  );
}