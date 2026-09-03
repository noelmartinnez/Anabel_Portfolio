import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { WorkGrid } from "@/components/WorkGrid";
import { Contact } from "@/components/Contact";

export default function Home() {
  // El ano se fija en el prerender, no en el navegador.
  const year = new Date().getFullYear();

  return (
    <>
      <Nav />
      <main>
        <Hero />
        <WorkGrid section="clientes" />
        <WorkGrid section="proyectos" />
        <Contact year={year} />
      </main>
    </>
  );
}
