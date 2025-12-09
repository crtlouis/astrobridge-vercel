import React, { useState, useEffect } from "react";

// --- 1. FIREBASE IMPORTS ---
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, signInAnonymously, onAuthStateChanged } from "firebase/auth";
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";

// --- 2. ICON IMPORTS ---
import { Send, CheckCircle, AlertCircle, Loader2 } from "lucide-react";

// --- 3. YOUR COMPONENT IMPORTS ---
import StaggeredMenu from "./components/StaggeredMenu.jsx"; 
import SpotlightCard from "./components/SpotlightCard.jsx";
import ColorBends from "./components/ColorBends"; 
import Magnet from "./components/Magnet";

/* -----------------------------------------------------------------------
   FIREBASE CONFIGURATION
   ----------------------------------------------------------------------- */
const firebaseConfig = {
  apiKey: "AIzaSyDDFt5e0CMAB-DviXHtG3M26xwPn838fus",
  authDomain: "astrobriddge.firebaseapp.com",
  projectId: "astrobriddge",
  storageBucket: "astrobriddge.firebasestorage.app",
  messagingSenderId: "812884847284",
  appId: "1:812884847284:web:636e8f1b6af01931ac05e1",
  measurementId: "G-QTQN94M9Z8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

/* -----------------------------------------------------------------------
   COMPONENT: WAITLIST FORM (Replaces "Notify Me" button)
   ----------------------------------------------------------------------- */
const WaitlistForm = ({ user }) => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !user) return;
    setStatus("loading");

    try {
      // Save to 'subscribers' collection in your database
      await addDoc(collection(db, 'subscribers'), {
        email: email,
        timestamp: serverTimestamp(),
        type: 'waitlist',
        source: 'landing_page'
      });
      setStatus("success");
      setEmail("");
    } catch (error) {
      console.error("Error:", error);
      setStatus("error");
    }
  };

  if (status === 'success') {
    return (
      <div className="mt-10 p-4 bg-green-500/20 border border-green-500/50 rounded-full inline-flex items-center gap-2 text-green-200 animate-in fade-in zoom-in">
        <CheckCircle size={20} /> <span>You're on the list! We'll be in touch.</span>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-10 w-full max-w-md mx-auto flex flex-col sm:flex-row shadow-2xl relative z-20">
      <input 
        type="email" 
        placeholder="Enter your email" 
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="flex-1 appearance-none rounded-t-xl sm:rounded-l-xl sm:rounded-r-none border border-white/20 bg-white/5 px-6 py-4 text-white placeholder-gray-400 focus:z-10 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 backdrop-blur-sm transition-all"
      />
      <button
        type="submit"
        disabled={status === 'loading'}
        className="group relative flex items-center justify-center rounded-b-xl sm:rounded-r-xl sm:rounded-l-none border border-transparent bg-white px-8 py-4 text-base font-bold text-black hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-75 transition-all"
      >
        {status === 'loading' ? <Loader2 className="animate-spin" /> : 'Notify me'}
      </button>
      {status === 'error' && <p className="absolute -bottom-8 left-0 text-red-400 text-sm flex items-center gap-1"><AlertCircle size={12}/> Failed to join. Try again.</p>}
    </form>
  );
};

/* -----------------------------------------------------------------------
   COMPONENT: CONTACT FORM (Replaces "Here" link)
   ----------------------------------------------------------------------- */
const ContactForm = ({ user }) => {
  const [formData, setFormData] = useState({ email: "", message: "" });
  const [status, setStatus] = useState("idle");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.message || !user) return;
    setStatus("loading");

    try {
      // Save to 'messages' collection in your database
      await addDoc(collection(db, 'messages'), {
        email: formData.email,
        message: formData.message,
        timestamp: serverTimestamp(),
        type: 'contact_form'
      });
      setStatus("success");
      setFormData({ email: "", message: "" });
    } catch (error) {
      console.error("Error:", error);
      setStatus("error");
    }
  };

  if (status === 'success') {
    return (
      <div className="w-full max-w-lg mx-auto p-8 bg-neutral-900/50 border border-green-500/30 rounded-2xl text-center backdrop-blur-md">
        <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="text-green-400" size={32} />
        </div>
        <h4 className="text-xl font-bold text-white mb-2">Message Sent!</h4>
        <p className="text-gray-400">Thanks for reaching out. We'll get back to you shortly.</p>
        <button onClick={() => setStatus('idle')} className="mt-6 text-sm text-blue-400 hover:text-white underline">Send another</button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-lg mx-auto bg-black/40 border border-white/10 rounded-2xl p-8 backdrop-blur-md text-left">
      <h4 className="text-2xl font-bold mb-6">Send us a message</h4>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">Your Email</label>
          <input
            type="email"
            required
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
            placeholder="name@example.com"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">Message</label>
          <textarea
            required
            rows={4}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors resize-none"
            placeholder="How can we collaborate?"
            value={formData.message}
            onChange={(e) => setFormData({...formData, message: e.target.value})}
          />
        </div>
        <button
          type="submit"
          disabled={status === 'loading'}
          className="w-full bg-white text-black font-bold py-4 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
        >
          {status === 'loading' ? <Loader2 className="animate-spin" /> : <><Send size={18} /> Send Message</>}
        </button>
      </form>
    </div>
  );
};

/* -----------------------------------------------------------------------
   MAIN APPLICATION
   ----------------------------------------------------------------------- */
export default function App() {
  
  // --- AUTH STATE (Required for writing to Database) ---
  const [user, setUser] = useState(null);

  useEffect(() => {
    // 1. Log in anonymously so the user can write to the database
    signInAnonymously(auth).catch(err => console.error("Auth failed:", err));
    
    // 2. Track auth state
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // --- MENU CONFIG ---
  const menuItems = [
    { label: 'Introduction', link: '#intro', ariaLabel: 'Watch Introduction' },
    { label: 'About', link: '#about', ariaLabel: 'About Us' },
    { label: 'What we do', link: '#get-involved', ariaLabel: 'Get Involved' },
    { label: 'Apply', link: '#apply', ariaLabel: 'Apply Now' }
  ];

  const socialItems = [
    { label: 'Instagram', link: 'https://www.instagram.com/astrobridge.eur?igsh=bDIyaHlyN2RoanJ1' },
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
      
      {/* --- MENU STAGGERED --- */}
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
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60" />

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
              <h3 className="text-4xl sm:text-5xl md:text-6xl lg:text-[76px] font-extrabold leading-[1.05] tracking-tight mr-0 md:-mr-24 relative z-30 select-none">
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
              
              {/* --- MAGNET INTEGRATION --- */}
              <div className="relative w-full md:w-[120%] md:translate-x-12 lg:translate-x-20 flex justify-center md:justify-end">
                <Magnet padding={0} disabled={false} magnetStrength={30}>
                    <div className="relative overflow-hidden rounded-4xl">
                        <img
                        src="/assets/falcon.jpg"
                        alt="SpaceX Falcon"
                        className="h-[460px] w-full object-cover md:h-[540px]"
                        />
                    </div>
                </Magnet>
              </div>

              {/* Texte */}
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
          
          <div className="relative w-full max-w-[1000px]">
            <h3 className="text-3xl font-extrabold md:text-5xl leading-tight">
              Some markets grow.
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-white">
                Others escape gravity.
              </span>
            </h3>
            <p className="mx-auto mt-6 max-w-2xl text-lg md:text-xl text-gray-200">
              Apply now and discover what the future holds for business in space.
            </p>
            
            {/* --- REPLACED BUTTON WITH WAITLIST FORM --- */}
            <WaitlistForm user={user} />

          </div>

          {/* --- REPLACED TEXT LINK WITH CONTACT FORM --- */}
          <div id="contact" className="mt-24 w-full px-4">
              <ContactForm user={user} />
          </div>

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
            <a href="https://www.instagram.com/astrobridge.eur?igsh=bDIyaHlyN2RoanJ1" className="hover:text-white transition-colors">Instagram</a>
            <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
            <a href="#" className="hover:text-white transition-colors">Email</a>
          </div>
        </div>
      </footer>
    </div>
  );
}