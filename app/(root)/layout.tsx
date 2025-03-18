import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { GlobalProvider } from "../context/GlobalContext";

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <GlobalProvider>
      <main className="font-work-sans">
        <Navbar />

        <div className="bg-gray-100 min-h-[81dvh] flex flex-col px-4 sm:px-6 md:px-8 lg:px-12 pt-32 pb-24">
          {children}
        </div>

        <Footer />
      </main>
    </GlobalProvider>
  );
}
