import Nav from "@/components/Nav";

export default function MainLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="min-h-screen container mx-auto">
      <Nav />

      {children}
    </section>
  );
}
