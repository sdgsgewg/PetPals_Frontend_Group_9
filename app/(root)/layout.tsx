import Footer from "../components/Footer";
import Navbar from "../components/Navbar/Navbar";
import { PetsProvider } from "../context/PetsContext";
import { ServicesProvider } from "../context/ServicesContext";
export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <PetsProvider>
      <ServicesProvider>
        <main className="font-work-sans">
          <Navbar />

          <div>{children}</div>

          <Footer />
        </main>
      </ServicesProvider>
    </PetsProvider>
  );
}
