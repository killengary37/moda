import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function RootGroupLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-dvh flex flex-col">
      <Navbar />
        {children}
      <Footer />
    </div>
  );
}
