import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function RootGroupLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-dvh flex flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
