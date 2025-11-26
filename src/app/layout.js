import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

export const metadata = {
  title: "Caribe Supply",
  description: "Tienda online de herramientas y suministros",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className="bg-gray-100">
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
