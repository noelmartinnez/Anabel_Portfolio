import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Nav } from "@/components/Nav";
import { Contact } from "@/components/Contact";
import { ProjectView } from "@/components/ProjectView";
import { getProject, projects } from "@/content/projects";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};

  const title = `${project.title} — Anabel Pérez Lara`;
  // Las cuentas de cliente no llevan descripción: se compone una a partir del enfoque.
  const description =
    project.description?.es ?? `${project.subtitle.es} para ${project.title}.`;

  // Declarar `openGraph` aqui sustituye por completo al del layout, y con el se
  // pierde la imagen de `opengraph-image.jpg`: hay que volver a nombrarla.
  const image = {
    url: "/opengraph-image.jpg",
    width: 1200,
    height: 630,
    alt: "Retrato de Anabel Pérez Lara",
  };

  return {
    title,
    description,
    alternates: { canonical: `/trabajo/${slug}` },
    openGraph: {
      title,
      description,
      type: "article",
      url: `/trabajo/${slug}`,
      siteName: "Anabel Pérez Lara",
      locale: "es_ES",
      images: [image],
    },
    twitter: { card: "summary_large_image", title, description, images: [image] },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  return (
    <>
      <Nav />
      <main>
        <ProjectView project={project} />
        <Contact year={new Date().getFullYear()} />
      </main>
    </>
  );
}
