import React from "react";
import StaggeredMenu from "./components/StaggeredMenu.jsx"; 
import SpotlightCard from "./components/SpotlightCard.jsx";
import ColorBends from "./components/ColorBends"; 
import Magnet from "./components/Magnet";



export default function App() {
  
  // --- CONFIGURATION DU MENU ---
  const menuItems = [
    { label: 'Introduction', link: '#intro', ariaLabel: 'Watch Introduction' },
    { label: 'About', link: '#about', ariaLabel: 'About Us' },
    { label: 'What we do', link: '#get-involved', ariaLabel: 'Get Involved' },
    { label: 'Apply', link: '#apply', ariaLabel: 'Apply Now' }
  ];

  const socialItems = [
    { label: 'Instagram', link: '#' },
    { label: 'LinkedIn', link: '#' },
    { label: 'Email', link: '#' }
  ];

  const handleWatchIntro = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-white/30">
      
      {/* --- MENU STAGGERED (Gardé car il fonctionnait) --- */}
      <StaggeredMenu
        items={menuItems}
        socialItems={socialItems}
        logoUrl="/assets/logo.svg"
        menuButtonColor="#fff"
        openMenuButtonColor="#000"
        accentColor="#3b82f6"
        colors={["#000428", "#004e92", "#0072ff"]}
        position="right"
        isFixed={true}
      />

      {/* --- HERO SECTION --- */}
      <section id="intro" className="relative h-[95vh] w-full overflow-hidden pt-24">
        {/* Background Layers */}
        <div 
          className="absolute inset-0 opacity-60"
          style={{ 
            backgroundImage: "url('/assets/starsbg.jpg')", 
            backgroundSize: 'cover', 
            backgroundPosition: 'center' 
          }} 
        />
        <img
          src="/assets/earth.jpg"
          alt="Earth from space"
          className="absolute inset-0 h-full w-full object-cover object-[50%_55%]"
        />
        <div className="absolute inset-0 bg-linear-to-b from-black/30 via-transparent to-black/60" />

        {/* Hero Content */}
        <div className="relative z-10 mx-auto h-full max-w-7xl px-6 flex flex-col justify-end pb-20 md:pb-32">
          <div className="grid gap-4 md:gap-8">
            <div className="flex justify-end">
              <h1 className="max-w-2xl text-right text-4xl sm:text-6xl lg:text-7xl font-extrabold leading-[1.1] tracking-tight drop-shadow-2xl">
                The next frontier isn’t just for rockets.
              </h1>
            </div>
            <div>
              <h2 className="text-left text-4xl sm:text-6xl lg:text-7xl font-extrabold leading-[1.1] tracking-tight drop-shadow-2xl">
                It’s for ideas
              </h2>
            </div>
          </div>
        </div>
      </section>

{/* --- ABOUT SECTION --- */}
      <section id="about" className="relative overflow-hidden py-24 md:py-32">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10">
          <div className="grid gap-16 md:grid-cols-[0.95fr_1.3fr] md:gap-12">
            
            {/* Left Column */}
            <div className="relative z-20 flex flex-col justify-center">
              <h3 className="text-4xl sm:text-5xl md:text-6xl lg:text-[76px] font-extrabold leading-[1.05] tracking-tight -mr-0 md:-mr-24 relative z-30 select-none">
                Europe’s first student
                <br />
                association for business
                <br />
                in space
              </h3>

              <div className="relative mt-12 overflow-hidden rounded-[2rem] w-full group">
                <img
                  src="/assets/sat.jpg"
                  alt="Satellite"
                  className="h-[360px] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </div>

            {/* Right Column */}
            <div className="relative z-10 flex flex-col items-center md:items-end">
              
              {/* --- 2. INTEGRATION DU MAGNET SUR L'IMAGE FALCON --- */}
              <div className="relative w-full md:w-[120%] md:translate-x-12 lg:translate-x-20 flex justify-center md:justify-end">
                <Magnet padding={0} disabled={false} magnetStrength={30}>
                    <div className="relative overflow-hidden rounded-[2rem]">
                        <img
                        src="/assets/falcon.jpg"
                        alt="SpaceX Falcon"
                        className="h-[460px] w-full object-cover md:h-[540px]"
                        />
                    </div>
                </Magnet>
              </div>

              {/* Texte (déplacé sous l'image) */}
              <div className="mt-10 w-full md:w-[90%] md:translate-x-12 lg:translate-x-20 md:pr-10 text-left md:text-right">
                <p className="text-lg md:text-xl font-medium leading-relaxed text-gray-300">
                  Where strategy and business meets space. Astrobridge brings young business
                  minds into the space economy through educational content, industry-led talks,
                  and inter-disciplinary events that launch ideas beyond Earth.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* --- WHAT WE DO SECTION --- */}
      
      <section
        id="get-involved"
        className="relative flex min-h-[90vh] items-center py-24"
        style={{
          backgroundImage: "url('/assets/satearth.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/40" />

        <div className="relative mx-auto w-full max-w-7xl px-6">
          <div className="grid gap-8 md:gap-12 lg:grid-cols-3">
            {[
              {
                title: "Educate",
                text: "Providing educational content on the space economy, space policy, business models and non-engineering roles through social media content.",
              },
              {
                title: "Connect",
                text: "Bridging the gap between business students and the space industry through speakers, panels, and inter-university collaborations.",
              },
              {
                title: "Launch",
                text: "Empowering students to develop and apply ideas through workshops, professional opportunities, and cross-disciplinary projects to encourage business innovation in space.",
              },
            ].map((card, idx) => (
              <SpotlightCard
                key={idx}
                className="custom-spotlight-card group h-full rounded-4xl border border-white/10 bg-black/40! p-10 backdrop-blur-md transition-all duration-300 hover:scale-[1.02] hover:border-white/30"
                spotlightColor="rgba(0, 114, 255, 1)  "
              >
                <div className="relative z-10 h-full flex flex-col">
                  <h4 className="mb-6 text-3xl font-bold md:text-4xl">{card.title}</h4>
                  <p className="text-lg leading-relaxed text-gray-200 grow">{card.text}</p>
                </div>
              </SpotlightCard>
            ))}
          </div>
        </div>
      </section>

{/* --- CTA / APPLY SECTION --- */}
      <section
        id="apply"
        // MODIFICATION 1 : 'min-h-[80vh]' force la section à prendre 80% de la hauteur de l'écran
        className="relative flex flex-col items-center justify-center min-h-[80vh] px-6 text-center overflow-hidden"
      >
        {/* Background ColorBends */}
        <div className="absolute inset-0 w-full h-full">
          <ColorBends
            colors={["#000428", "#004e92", "#0072ff"]} 
            rotation={0}
            speed={0.2}
            scale={1.0}
            frequency={1.0}
            warpStrength={1.0}
            mouseInfluence={2.0}
            parallax={0.5}
            noise={0.1}
            transparent={false}
          />
        </div>

        {/* Contenu */}
        <div className="relative z-10 w-full flex flex-col items-center">
          
          {/* MODIFICATION 2 : 'max-w-[1000px]' élargit considérablement la zone de texte */}
          <div className="relative w-full max-w-[1000px]">
            <h3 className="text-3xl font-extrabold md:text-5xl leading-tight">
              Some markets grow.
              <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-200 to-white">
                Others escape gravity.
              </span>
            </h3>
            <p className="mx-auto mt-6 max-w-2xl text-lg md:text-xl text-gray-200">
              Apply now and discover what the future holds for business in space.
            </p>
            <a
              href="#join"
              className="mx-auto mt-10 inline-block rounded-full bg-white px-10 py-4 text-lg font-bold text-black transition-transform hover:scale-105 hover:bg-gray-100"
            >
              Notify me
            </a>
          </div>

          <p className="mt-12 text-gray-400">
            Are you an individual or part of an organization and want to connect or collaborate? Contact us{" "}
            <a href="#contact" className="text-white underline decoration-1 underline-offset-4 hover:text-blue-200 transition-colors">
              here
            </a>.
          </p>

        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="border-t border-white/10 bg-black py-12 text-center text-sm text-gray-500">
        <div className="mx-auto max-w-7xl px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <img src="/assets/logo.svg" alt="" className="h-6 opacity-50" />
            <span>© {new Date().getFullYear()} AstroBridge</span>
          </div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Instagram</a>
            <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
            <a href="#" className="hover:text-white transition-colors">Email</a>
          </div>
        </div>
      </footer>
    </div>
  );
}