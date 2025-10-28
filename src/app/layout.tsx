import "./globals.css";

function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fa" dir="rtl" className="font-serif">
      <body>{children}</body>
    </html>
  );
};

export default RootLayout;