"use client";

import Link from "next/link";

interface SharedHeaderProps {
  currentLang: 'es' | 'en';
  isProjectPage?: boolean;
  projectSlug?: string;
}

export default function SharedHeader({ currentLang, isProjectPage = false, projectSlug }: SharedHeaderProps) {
  const toggleLang = currentLang === 'es' ? 'en' : 'es';
  
  const t = {
    navWork: currentLang === 'es' ? 'Casos de Estudio' : 'Case Studies',
    navAbout: currentLang === 'es' ? 'Sobre Mí' : 'About Me',
    contact: 'Contacto',
  };

  const toggleLangUrl = isProjectPage && projectSlug 
    ? `/proyecto/${projectSlug}?lang=${toggleLang}` 
    : `/?lang=${toggleLang}`;

  const baseUrl = `/?lang=${currentLang}`;

  // Función infalible para forzar el scroll suave usando JavaScript
  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault(); // Evitamos que Next.js o el HTML hagan el salto brusco
    const element = document.getElementById(targetId);
    
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start", // Alinea el elemento al borde superior de la pantalla
      });
      // Opcional: actualiza la URL para que aparezca el # sin causar el salto
      window.history.pushState(null, '', `#${targetId}`);
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-[#050505]/90 backdrop-blur-md shadow-[0_-10px_10px_#050505] transition-all duration-300">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* LOGO */}
        <Link href={baseUrl}>
          <span className="text-xl font-bold tracking-tight text-white hover:opacity-80 transition-opacity">
            Ricardo Ocharan<span className="text-brand-500">.</span>
          </span>
        </Link>

        {/* ENLACES Y CAMBIO DE IDIOMA */}
        <div className="hidden md:flex items-center gap-8">
            {isProjectPage ? (
              // Si estamos dentro de un caso, usamos Link normal para regresar a la portada
              <>
                <Link href={`${baseUrl}#work`} className="text-sm font-medium text-slate-400 hover:text-brand-400 transition-colors">{t.navWork}</Link>
                <Link href={`${baseUrl}#about`} className="text-sm font-medium text-slate-400 hover:text-brand-400 transition-colors">{t.navAbout}</Link>
              </>
            ) : (
              // En la portada, forzamos el JavaScript para el scroll impecable
              <>
                <a href="#work" onClick={(e) => handleSmoothScroll(e, 'work')} className="text-sm font-medium text-slate-400 hover:text-brand-400 transition-colors cursor-pointer">{t.navWork}</a>
                <a href="#about" onClick={(e) => handleSmoothScroll(e, 'about')} className="text-sm font-medium text-slate-400 hover:text-brand-400 transition-colors cursor-pointer">{t.navAbout}</a>
              </>
            )}
            
            {/* Contacto siempre usa JS porque siempre apunta al footer de la página actual */}
            <a href="#contact" onClick={(e) => handleSmoothScroll(e, 'contact')} className="text-sm font-medium text-slate-400 hover:text-brand-400 transition-colors cursor-pointer">{t.contact}</a>
            
            <Link 
              href={toggleLangUrl}
              className="px-4 py-2 bg-white/5 rounded-full hover:bg-white/10 transition-colors text-xs font-bold text-white border border-white/10"
            >
              {currentLang === 'es' ? 'EN' : 'ES'}
            </Link>
        </div>
      </div>
    </nav>
  );
}