import { sanityFetch } from "@/sanity/lib/fetch";
import { groq } from "next-sanity";
import SharedHeader from "@/app/(blog)/shared-header";
import SharedFooter from "@/app/(blog)/shared-footer";
import Reveal from "@/app/(blog)/reveal";

export default async function ProjectDetailPage({ 
  params, 
  searchParams 
}: { 
  params: Promise<{ slug: string }>,
  searchParams: Promise<{ lang?: string }>
}) {
  const { slug } = await params;
  
  const resolvedSearchParams = await searchParams;
  const currentLang = resolvedSearchParams.lang === 'en' ? 'en' : 'es';

  const query = groq`*[_type == "project" && slug.current == $slug][0]{
    title, client, role, problem, solution, testimonial, metrics, "galleryUrls": gallery[].asset->url
  }`;
  
  const project = await sanityFetch({ query, params: { slug } });

  const t = {
    role: currentLang === 'es' ? 'Rol:' : 'Role:',
    problem: currentLang === 'es' ? 'El Problema' : 'The Problem',
    solution: currentLang === 'es' ? 'La Solución' : 'The Solution',
    visuals: currentLang === 'es' ? 'Detalle Visual' : 'Visual Detail',
    notFound: currentLang === 'es' ? 'Proyecto no encontrado' : 'Project not found',
  };

  if (!project) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center text-white">
        <h2>{t.notFound}</h2>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#050505] text-slate-300 font-sans antialiased flex flex-col">
      {/* HEADER COMPARTIDO */}
      <SharedHeader currentLang={currentLang} isProjectPage={true} projectSlug={slug} />

      {/* CONTENIDO DEL PROYECTO */}
      <div className="flex-grow max-w-4xl mx-auto px-6 pt-32 pb-32">
        <header className="mb-16">
          <span className="text-sm font-bold text-brand-400 uppercase tracking-wider">{project.client}</span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mt-4 mb-6 leading-tight">
            {project.title?.[currentLang] || project.title?.es}
          </h1>
          <div className="inline-block px-4 py-2 bg-white/5 rounded-lg border border-white/10">
            <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold mr-2">{t.role}</span>
            <span className="text-sm font-medium text-slate-300">{project.role?.[currentLang] || project.role?.es}</span>
          </div>
        </header>

        {/* MÉTRICAS */}
        {project.metrics && project.metrics.length > 0 && (
          <Reveal>
            <section className="grid grid-cols-2 gap-4 mb-16">
              {project.metrics.map((metric: any, index: number) => (
                <div key={index} className="bg-[#0f0f0f] p-6 rounded-2xl border border-white/5">
                  <p className="text-4xl font-extrabold text-brand-500 mb-2">{metric.value}</p>
                  <p className="text-sm font-medium text-slate-400">{metric.label?.[currentLang] || metric.label?.es}</p>
                </div>
              ))}
            </section>
          </Reveal>
        )}

        {/* PROBLEMA Y SOLUCIÓN */}
        <Reveal>
          <section className="grid md:grid-cols-2 gap-12 mb-16">
            <div>
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-500"></span> {t.problem}
              </h3>
              <p className="text-slate-400 leading-relaxed whitespace-pre-wrap">
                {project.problem?.[currentLang] || project.problem?.es}
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500"></span> {t.solution}
              </h3>
              <p className="text-slate-400 leading-relaxed whitespace-pre-wrap">
                {project.solution?.[currentLang] || project.solution?.es}
              </p>
            </div>
          </section>
        </Reveal>

        {/* TESTIMONIO */}
        {project.testimonial && (project.testimonial[currentLang] || project.testimonial.es) && (
          <Reveal>
            <section className="mb-20">
              <blockquote className="relative p-8 md:p-12 bg-[#0f0f0f] rounded-3xl border border-white/5 text-center overflow-hidden group">
                <div className="absolute -top-10 -left-10 w-40 h-40 bg-brand-600 rounded-full blur-3xl opacity-10 group-hover:opacity-20 transition-opacity duration-500"></div>
                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-brand-600 rounded-full blur-3xl opacity-10 group-hover:opacity-20 transition-opacity duration-500"></div>
                <svg className="w-10 h-10 mx-auto mb-6 text-brand-500/40" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
                <p className="relative z-10 text-xl md:text-2xl text-white italic font-medium leading-relaxed max-w-3xl mx-auto">
                  {project.testimonial[currentLang] || project.testimonial.es}
                </p>
              </blockquote>
            </section>
          </Reveal>
        )}

        {/* GALERÍA DE IMÁGENES */}
        {project.galleryUrls && project.galleryUrls.length > 0 && (
          <section className="space-y-8">
            <Reveal>
              <h3 className="text-xl font-bold text-white mb-8 border-b border-white/10 pb-4">{t.visuals}</h3>
            </Reveal>
            
            {project.galleryUrls.map((url: string, index: number) => (
              <Reveal key={index}>
                <div className="rounded-2xl overflow-hidden border border-white/10 bg-[#0f0f0f]">
                  <img src={url} alt={`Captura ${index + 1}`} className="w-full h-auto object-cover" loading="lazy" />
                </div>
              </Reveal>
            ))}
          </section>
        )}
      </div>

      {/* FOOTER COMPARTIDO */}
      <SharedFooter currentLang={currentLang} />
    </main>
  );
}