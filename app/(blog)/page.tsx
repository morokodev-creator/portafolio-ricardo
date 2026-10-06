import { sanityFetch } from "@/sanity/lib/fetch";
import Link from "next/link";
import SharedHeader from "./shared-header";
import SharedFooter from "./shared-footer";
import Reveal from "./reveal";

const projectsQuery = `*[_type == "project"]{ _id, title, client, role, problem, metrics, "slug": slug.current }`;

const particles = [
  { left: '10%', delay: '0s', dur: '12s', size: 'w-1 h-1' },
  { left: '25%', delay: '2s', dur: '15s', size: 'w-2 h-2' },
  { left: '40%', delay: '1s', dur: '11s', size: 'w-1.5 h-1.5' },
  { left: '60%', delay: '4s', dur: '14s', size: 'w-2 h-2' },
  { left: '75%', delay: '0.5s', dur: '13s', size: 'w-1 h-1' },
  { left: '90%', delay: '3s', dur: '16s', size: 'w-1.5 h-1.5' },
];

export default async function PortfolioPage({ searchParams }: { searchParams: Promise<{ lang?: string }> }) {
  const resolvedParams = await searchParams;
  const currentLang = resolvedParams.lang === 'en' ? 'en' : 'es';

  const projects = await sanityFetch({ query: projectsQuery });

  const t = {
    badge: currentLang === 'es' ? 'Disponible para nuevos retos' : 'Available for new challenges',
    heroTitlePart1: currentLang === 'es' ? 'Diseño productos que ' : 'I design products that ',
    heroTitleHighlight: currentLang === 'es' ? 'resuelven' : 'solve',
    heroTitlePart2: currentLang === 'es' ? ', no solo que se ven bien.' : ', not just look good.',
    heroDesc: currentLang === 'es' 
      ? 'Soy Product Designer y especialista UX/UI Senior con +10 años de experiencia. Conecto los objetivos de negocio con la empatía del usuario para crear plataformas rentables, intuitivas y escalables.' 
      : 'Senior Product Designer and UX/UI specialist with +10 years of experience. I connect business goals with user empathy to create profitable, intuitive, and scalable platforms.',
    sectionTitle: currentLang === 'es' ? 'Casos Destacados' : 'Featured Work',
    roleLabel: currentLang === 'es' ? 'Mi Rol' : 'My Role',
    aboutTitle: currentLang === 'es' ? 'Un enfoque integral.' : 'A holistic approach.',
    aboutDesc: currentLang === 'es' 
      ? 'No soy solo un diseñador que hace pantallas bonitas. Mi trasfondo en docencia e innovación digital me permite comunicar el valor del diseño a stakeholders técnicos y de negocio. Entiendo cómo los sistemas funcionan por detrás (APIs, Bases de datos, CMS headless) lo que me permite diseñar soluciones que los ingenieros realmente pueden construir sin fricción.'
      : 'I am not just a designer who makes pretty screens. My background in teaching and digital innovation allows me to communicate the value of design to technical and business stakeholders. I understand how systems work under the hood (APIs, Databases, Headless CMS), allowing me to design solutions that engineers can actually build without friction.',
    skillsTitle: currentLang === 'es' ? 'Herramientas & Habilidades' : 'Tools & Skills',
    teachingTitle: currentLang === 'es' ? 'Docencia y Liderazgo' : 'Teaching & Leadership',
    teaching1Role: currentLang === 'es' ? 'Docente en Innovación Digital, IA aplicada y UX.' : 'Professor of Digital Innovation, Applied AI, and UX.',
    teaching2Role: currentLang === 'es' ? 'Mentor de Producto, ayudando a startups a pasar del MVP a productos viables y validados por el mercado.' : 'Product Mentor, helping startups transition from MVP to viable, market-validated products.',
  };

  return (
    <div className="min-h-screen bg-[#050505] text-slate-300 selection:bg-brand-500 selection:text-white font-sans antialiased">
      
      {/* HEADER IMPORTADO */}
      <SharedHeader currentLang={currentLang} />

      {/* HERO SECTION */}
      <section className="relative w-full min-h-screen flex items-center py-20">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/4 -left-20 w-96 h-96 bg-brand-900/20 rounded-full mix-blend-screen filter blur-[120px] animate-pulse-slow"></div>
          <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-brand-600/10 rounded-full mix-blend-screen filter blur-[120px] animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
          {particles.map((p, i) => (
            <div 
              key={i}
              className={`absolute bottom-0 bg-brand-500 rounded-full opacity-0 animate-float shadow-[0_0_10px_rgba(139,92,246,0.8)] ${p.size}`}
              style={{ left: p.left, animationDelay: p.delay, animationDuration: p.dur }}
            ></div>
          ))}
        </div>

        <div className="relative z-10 w-full max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1 space-y-8">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-900/40 text-brand-300 text-xs font-medium tracking-wide animate-fade-in-up">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-100"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-500"></span>
                    </span>
                    {t.badge}
                </div>
                
                <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white leading-[1.15] animate-fade-in-up" style={{animationDelay: '100ms'}}>
                    {t.heroTitlePart1}<span className="text-brand-400">{t.heroTitleHighlight}</span>{t.heroTitlePart2}
                </h1>
                
                <p className="text-lg md:text-xl text-slate-400 max-w-2xl leading-relaxed animate-fade-in-up" style={{animationDelay: '200ms'}}>
                    {t.heroDesc}
                </p>
            </div>
        </div>
      </section>

      {/* CASOS DE ESTUDIO */}
      <Reveal>
      <section id="work" className="py-24 bg-[#080808] border-t border-white/5 relative z-10">
        <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-3xl font-bold mb-16 text-white flex items-center gap-4">
                {t.sectionTitle} <span className="h-px bg-white/10 flex-1"></span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {projects.map((project: any, index: number) => (
                <Link key={project._id} href={`/proyecto/${project.slug}?lang=${currentLang}`}>
                  <article 
                    className="group relative bg-[#0f0f0f] rounded-2xl border border-white/5 p-8 hover:border-brand-500/30 hover:-translate-y-1 transition-all duration-300 cursor-pointer overflow-hidden"
                    style={{ animationDelay: `${index * 150}ms` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-brand-900/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                    
                    <div className="relative z-10">
                      <span className="text-xs font-bold text-brand-400 uppercase tracking-wider">{project.client}</span>
                      <h3 className="text-2xl font-bold text-white mt-2 mb-4 group-hover:text-brand-300 transition-colors">
                        {project.title?.[currentLang] || project.title?.es || "Proyecto sin título"}
                      </h3>
                      <p className="text-slate-400 text-sm leading-relaxed mb-6 line-clamp-3">
                        {project.problem?.[currentLang] || project.problem?.es}
                      </p>

                      <div className="pt-6 border-t border-white/10 flex items-center justify-between">
                          <div className="flex flex-col">
                            <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-1">{t.roleLabel}</span>
                            <span className="text-sm text-slate-300 font-medium">
                              {(project.role?.[currentLang] || project.role?.es)?.split(' (')[0]}
                            </span>
                          </div>
                          <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-brand-500 transition-colors">
                            <svg className="w-5 h-5 text-slate-500 group-hover:text-white transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                          </div>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
        </div>
      </section>
      </Reveal>

      {/* SOBRE MÍ */}
      <Reveal>
      <section id="about" className="py-24 bg-[#050505] border-t border-white/5 relative z-10">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
                <h2 className="text-3xl font-bold text-white">{t.aboutTitle}</h2>
                <p className="text-slate-400 leading-relaxed">
                    {t.aboutDesc}
                </p>
                <div className="pt-4">
                    <p className="text-sm font-bold text-brand-400 uppercase tracking-wider mb-4">{t.skillsTitle}</p>
                    <div className="flex flex-wrap gap-3">
                        <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-sm text-slate-300 hover:border-brand-500/50 transition-colors cursor-default">Figma (Avanzado)</span>
                        <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-sm text-slate-300 hover:border-brand-500/50 transition-colors cursor-default">Design Systems</span>
                        <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-sm text-slate-300 hover:border-brand-500/50 transition-colors cursor-default">Prototipado Rápido</span>
                        <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-sm text-slate-300 hover:border-brand-500/50 transition-colors cursor-default">UX Research</span>
                        <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-sm text-slate-300 hover:border-brand-500/50 transition-colors cursor-default">Next.js & Tailwind</span>
                        <span className="px-3 py-1 bg-brand-900/40 text-brand-300 border border-brand-700/50 rounded-full text-sm hover:bg-brand-900/60 transition-colors cursor-default">IA Integration (Claude/ChatGPT)</span>
                    </div>
                </div>
            </div>
            
            <div className="bg-[#0f0f0f] p-8 rounded-2xl border border-white/5 relative overflow-hidden group hover:border-brand-500/30 transition-all duration-500">
                <div className="absolute -right-10 -top-10 w-40 h-40 bg-brand-600 rounded-full blur-3xl opacity-10 group-hover:opacity-20 transition-opacity"></div>
                <h3 className="text-xl font-bold mb-6 text-white flex items-center gap-2">
                    <span className="w-2 h-2 bg-brand-500 rounded-full"></span> {t.teachingTitle}
                </h3>
                <ul className="space-y-6 relative z-10">
                    <li className="border-l border-white/10 pl-4 hover:border-brand-500 transition-colors">
                        <h4 className="font-semibold text-white">Toulouse Lautrec <span className="text-brand-400 text-sm font-normal ml-2">2024 - Act.</span></h4>
                        <p className="text-sm text-slate-400 mt-1">{t.teaching1Role}</p>
                    </li>
                    <li className="border-l border-white/10 pl-4 hover:border-brand-500 transition-colors">
                        <h4 className="font-semibold text-white">Emprende UP <span className="text-brand-400 text-sm font-normal ml-2">2021 - 2023</span></h4>
                        <p className="text-sm text-slate-400 mt-1">{t.teaching2Role}</p>
                    </li>
                </ul>
            </div>
        </div>
      </section>
      </Reveal>

      {/* FOOTER IMPORTADO */}
      <SharedFooter currentLang={currentLang} />
      
    </div>
  );
}