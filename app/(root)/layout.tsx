import Footer from "../components/Footer";
import Navbar from "../components/Navbar/Navbar";
export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className="font-work-sans bg-white text-gray-900 dark:bg-gray-900 dark:text-white transition-colors duration-300">
      <Navbar />

      <div>{children}</div>

      <Footer />
    </main>
  );
}
