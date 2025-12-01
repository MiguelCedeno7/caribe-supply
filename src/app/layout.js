import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { AuthProvider } from "@/context/AuthContext";
import WeatherWidget from "@/components/WeatherWidget.jsx";

export const metadata = {
  title: "Caribe Supply",
  description: "Tienda online de herramientas y suministros",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className="bg-gray-100">
        <AuthProvider>
          <Header />
          <main className="min-h-screen mt-1">{children}</main>
          <Footer />
          <WeatherWidget />
        </AuthProvider>
      </body>
    </html>
  );
}
