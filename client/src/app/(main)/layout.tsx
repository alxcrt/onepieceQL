import Nav from "@/components/Nav";
import NavMobile from "@/components/NavMobile";

export default function MainLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="min-h-screen container mx-auto">
      {/* Include shared UI here e.g. a header or sidebar */}
      {/* <Nav /> */}
      <Nav />

      {children}
    </section>
  );
}
