import Footer from "../components/Footer";
import Navbar from "../components/Navbar/Navbar";
import { GlobalProvider } from "../context/GlobalContext";
export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <GlobalProvider>
      <main className="font-work-sans">
        <Navbar />

        <div>
          {children}
        </div>

        <Footer />
      </main>
    </GlobalProvider>
  );
}
