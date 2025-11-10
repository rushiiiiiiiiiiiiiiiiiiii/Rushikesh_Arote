import React, { useState, useRef, useEffect } from "react";
import Lottie from "lottie-react";
import { Volume2, VolumeX, ArrowUp } from "lucide-react";
import heroAnimation from "./assets/hero-image.json";
import bgMusic from "./assets/mixkit-beautiful-dream-493.mp3";
import clickSound from "./assets/preview.mp3";
import { useClickSound } from "./hooks/useClickSound";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { motion } from "framer-motion";

const App = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const playClick = useClickSound();
  const [activeSkill, setActiveSkill] = useState(null);
const [isTransitioning, setIsTransitioning] = useState(false);

  const audioRef = useRef(null);
  const clickRef = useRef(null);
const handleSmoothNav = (targetId) => {
  playNavClick();
  setIsTransitioning(true);

  // Wait for the animation to play, then scroll
  setTimeout(() => {
    setIsTransitioning(false);

    const target = document.querySelector(targetId);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  }, 800); // match the motion transition duration
};

  useEffect(() => {
    audioRef.current = new Audio(bgMusic);
    audioRef.current.loop = true;
    audioRef.current.volume = 0.3;
    clickRef.current = new Audio(clickSound);
  }, []);

  const playNavClick = () => {
    if (clickRef.current) {
      clickRef.current.currentTime = 0;
      clickRef.current.play();
    }
  };

  const toggleMusic = () => {
    playNavClick();
    setIsPlaying((prev) => {
      const newState = !prev;
      if (newState) audioRef.current.play();
      else audioRef.current.pause();
      return newState;
    });
  };

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    playNavClick();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="relative min-h-screen text-white overflow-x-hidden bg-transparent">
      {/* 🌌 Particles Layer — sits *behind* all content but *above* background */}
      {/* 🌌 GLOBAL BACKGROUND (fixed — visible behind all sections) */}
      <div className="fixed inset-0 z-[0] overflow-hidden pointer-events-none">
        {/* Base Gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-gray-950 via-gray-900 to-gray-950 opacity-40"></div>

        {/* Glowing Blobs */}
        <div className="absolute w-[500px] h-[500px] bg-blue-500/20 blur-[200px] rounded-full top-[-100px] left-[-150px] animate-float-slow"></div>
        <div className="absolute w-[600px] h-[600px] bg-indigo-500/20 blur-[220px] rounded-full bottom-[-150px] right-[-100px] animate-float-reverse"></div>
        {/* Subtle radial ambient glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.08)_0%,transparent_70%)]"></div>

        {/* Floating Blue Particles */}
        {[...Array(40)].map((_, i) => (
          <motion.span
            key={i}
            className="absolute w-[3px] h-[3px] bg-blue-400 rounded-full shadow-[0_0_8px_rgba(59,130,246,0.8)]"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.8 + 0.2,
            }}
            animate={{
              y: [0, -25, 0],
              x: [0, Math.random() * 10 - 5, 0],
              opacity: [0.4, 1, 0.4],
              scale: [1, 1.4, 1],
            }}
            transition={{
              duration: 6 + Math.random() * 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* 🌍 Content Layer */}
      <div className="relative z-[1]">
        {/* 🌊 Page Transition Overlay */}
<motion.div
  initial={{ x: "100%" }}
  animate={isTransitioning ? { x: "0%" } : { x: "100%" }}
  transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
  className="fixed inset-0 z-[999] bg-gradient-to-r from-blue-600 via-purple-600 to-blue-500 pointer-events-none"
  style={{
    transformOrigin: "left center",
  }}
/>

{/* 🔹 Navbar */}
<header className="absolute top-0 left-0 w-full flex items-center justify-between px-6 sm:px-10 py-5 z-[100]">
  <h1
    className="text-2xl sm:text-3xl font-bold tracking-wide cursor-pointer text-blue-400 hover:text-blue-300 transition select-none"
    onClick={playNavClick}
  >
    Rushi<span className="text-white">.dev</span>
  </h1>

  <div className="flex items-center space-x-6 sm:space-x-8">
    {/* 🎵 Sound */}
    <button
      onClick={toggleMusic}
      aria-label="Toggle background music"
      className={`relative flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-lg border border-gray-600/40 bg-gray-800/40 backdrop-blur-md transition-all duration-500 ease-in-out cursor-pointer ${
        isPlaying ? "bg-white text-gray-900 border-white/80 scale-100" : ""
      }`}
    >
      {isPlaying ? (
        <Volume2 className="text-gray-900 animate-pulse" size={22} />
      ) : (
        <VolumeX className="text-gray-300" size={22} />
      )}
    </button>

    {/* 🍔 Menu */}
    <button
      aria-label="Toggle menu"
      onClick={() => {
        playNavClick();
        setMenuOpen(!menuOpen);
      }}
      className={`relative flex flex-col justify-center items-center w-11 h-11 sm:w-12 sm:h-12 rounded-lg cursor-pointer border border-gray-600/40 bg-gray-800/40 backdrop-blur-md transition-all duration-500 ease-in-out ${
        menuOpen ? "bg-white border-white/80 scale-100" : ""
      }`}
    >
      <span
        className={`w-5 h-[2px] mb-1 transition-all duration-300 ${
          menuOpen ? "translate-y-[6px] rotate-45 bg-gray-900" : "bg-white"
        }`}
      ></span>
      <span
        className={`w-5 h-[2px] mb-1 transition-all duration-300 ${
          menuOpen ? "opacity-0" : "bg-white"
        }`}
      ></span>
      <span
        className={`w-5 h-[2px] transition-all duration-300 ${
          menuOpen ? "-translate-y-[6px] -rotate-45 bg-gray-900" : "bg-white"
        }`}
      ></span>
    </button>
  </div>
</header>
{/* 🔹 Animated Right-Side Navigation Menu */}
<motion.nav
  // use numeric x for better COMPOSITE-only animation (GPU)
  initial={{ x: 100, opacity: 0 }}
  animate={menuOpen ? { x: 0, opacity: 1 } : { x: 100, opacity: 0 }}
  transition={{ duration: 0.35, ease: "easeOut" }}
  // force a new composite layer and hint the browser to optimize
  style={{ transform: "translateZ(0)", willChange: "transform, opacity" }}
  className={`fixed top-0 right-0 h-full w-full md:w-[380px]
  ${menuOpen ? "pointer-events-auto" : "pointer-events-none"}
  z-[90] flex flex-col items-center justify-center space-y-8
  transition-all duration-300 ease-in-out
  backdrop-blur-xl
  bg-gradient-to-b from-[#0f172a]/90 via-[#1e293b]/80 to-[#0f172a]/90
  border-l border-blue-400/20 md:border-blue-400/25
  shadow-[0_0_25px_rgba(59,130,246,0.2)]
`}

>
  {/* links */}
  {[
    { name: "Home", link: "#home" },
    { name: "About", link: "#about" },
    { name: "Skills", link: "#skills" },
    { name: "Experience", link: "#experience" },
    { name: "Projects", link: "#projects" },
    { name: "Contact", link: "#contact" },
  ].map((item, i) => (
    <motion.a
  key={item.name}
  onClick={() => {
    setMenuOpen(false);
    handleSmoothNav(item.link);
  }}
  whileHover={{
    scale: 1.12,
    textShadow: "0 0 12px rgba(96,165,250,0.8)",
    color: "#60A5FA",
  }}
  className="text-white text-xl md:text-lg font-semibold tracking-wide hover:text-blue-400 transition-all duration-300 cursor-pointer"
>
  {item.name}
</motion.a>

  ))}

  {/* right edge thin line only on desktop (cheap element) */}
  <div className="hidden md:block absolute top-0 right-0 w-[2px] h-full bg-gradient-to-b from-blue-400/40 via-blue-500/30 to-transparent opacity-60"></div>

  {/* mobile soft glow, cheap: just a translucent bg element (no blur) */}
  <div className="md:hidden absolute inset-0 bg-blue-500/8 -z-10"></div>
</motion.nav>

        {/* 🔹 Hero Section */}
        <section
          className={`flex flex-col md:flex-row items-center justify-center px-6 sm:px-12 md:px-20 min-h-screen transition-all duration-700 ease-in-out ${
            menuOpen
              ? "md:-translate-x-32 md:opacity-100 opacity-0 pointer-events-none"
              : "translate-x-0 opacity-100"
          }`}
        >
          {/* Left Content */}
          <div
            className={`w-full md:w-1/2 space-y-6 text-center md:text-left transition-all duration-700 ease-in-out ${
              menuOpen
                ? "md:opacity-0 md:pointer-events-none md:-translate-x-20"
                : "opacity-100 translate-x-0"
            }`}
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight sm:leading-[1.2] mt-16 sm:mt-20 md:mt-0">
              Hi, I’m <span className="text-blue-400">Rushi</span> 👋
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-300 leading-relaxed max-w-md mx-auto md:mx-0 sm:mt-2">
              A passionate Web Developer who loves building clean, interactive,
              and responsive web experiences.
            </p>
            <div className="flex justify-center md:justify-start">
              <button
                onClick={playClick}
                className="mt-5 sm:mt-6 bg-blue-500 hover:bg-blue-600 active:scale-95 transition px-6 sm:px-8 py-3 sm:py-3.5 rounded-xl font-semibold shadow-md text-base sm:text-lg"
              >
                View My Work
              </button>
            </div>
          </div>

          {/* Right Animation */}
          <div
            className={`w-full md:w-1/2 flex justify-center md:justify-end mt-[-20px] sm:mt-[-10px] md:mt-0 transition-transform duration-700 ease-in-out ${
              menuOpen
                ? "md:translate-x-[-340px] md:scale-110"
                : "translate-x-0 scale-100"
            }`}
          >
            <Lottie
              animationData={heroAnimation}
              loop
              className="w-[100vw] sm:w-[90vw] md:w-[440px] lg:w-[500px] xl:w-[540px] max-w-[640px]"
            />
          </div>
        </section>

        {/* 🔹 About Section */}
        <section
          id="about"
          className="flex flex-col items-center justify-center h-auto md:h-screen px-6 sm:px-12 md:px-24 py-10 sm:py-12 bg-transparent
 text-white overflow-hidden"
        >
          <div className="w-full flex flex-col items-center mb-8 sm:mb-10 text-center">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-2 tracking-tight">
              <span className="text-blue-400">About</span> Me
            </h1>
            <div className="h-[3px] w-16 sm:w-20 bg-blue-500 rounded-full"></div>
          </div>

          <div className="flex flex-col-reverse md:flex-row items-center justify-center gap-10 md:gap-16 w-full max-w-6xl">
            <motion.div
              className="flex justify-center md:justify-end w-full md:w-[38%] mb-1 md:mb-0"
              initial={{ opacity: 0, x: -80, y: 30, scale: 0.95 }}
              whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <div className="relative rounded-2xl overflow-hidden shadow-[0_0_40px_rgba(59,130,246,0.2)] hover:shadow-[0_0_60px_rgba(59,130,246,0.3)] transition-all duration-700">
                <img
                  src="/my.jpg"
                  alt="Rushi"
                  className="w-[300px] sm:w-[300px] md:w-[320px] rounded-2xl object-cover"
                />
              </div>
            </motion.div>

            <motion.div
              className="w-full md:w-[55%] flex justify-center md:justify-start"
              initial={{ opacity: 0, x: 80, y: 30, scale: 0.95 }}
              whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <div className="bg-white/10 backdrop-blur-lg border border-white/10 rounded-2xl shadow-lg p-6 sm:p-8 md:p-10 w-full max-w-xl text-center md:text-left transition-all duration-700 hover:shadow-[0_0_50px_rgba(59,130,246,0.25)]">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
                  <span className="text-blue-400">Rushikesh Arote</span>
                </h2>

                <h3 className="text-base sm:text-lg font-semibold text-blue-300 mb-4">
                  Full Stack Developer | MERN Developer
                </h3>

                <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-6">
                  I am a Full-Stack Developer based in Mumbai, India, pursuing
                  my <span className="">Information Technology</span> degree
                  from Mumbai University. I love learning and building modern
                  web applications. I specialize in the{" "}
                  <span className="">MERN stack</span>, creating interactive and
                  responsive web apps.
                </p>

                <div className="space-y-2 text-gray-300 mb-5">
                  <p>
                    <span className="font-semibold text-white">📧 Email:</span>{" "}
                    <a
                      href="mailto:rushikesharote14@gmail.com"
                      className="underline"
                    >
                      rushikesharote14@gmail.com
                    </a>
                  </p>
                  <p>
                    <span className="font-semibold text-white">
                      📍 Location:
                    </span>{" "}
                    Mumbai, India
                  </p>
                </div>

                <div className="mt-6">
                  <a
                    href="/Rushi_Resume.pdf"
                    download
                    className="inline-flex items-center bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 sm:px-8 py-2.5 rounded-lg shadow-lg hover:shadow-[0_0_20px_rgba(59,130,246,0.4)] transition-all duration-300 text-sm sm:text-base"
                  >
                    Download Resume
                    <i className="fas fa-arrow-right ml-2 text-xs sm:text-sm"></i>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* 🔹 Interactive Skills Section */}
        <section
          id="skills"
          className="flex flex-col items-center justify-center px-6 sm:px-12 md:px-24 py-20 bg-transparent
 text-white overflow-hidden relative"
        >
          {/* Title */}
          <div className="w-full flex flex-col items-center mb-12 sm:mb-16 text-center">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-2 tracking-tight">
              <span className="text-blue-400">My</span> Skills
            </h1>
            <div className="h-[3px] w-20 bg-blue-500 rounded-full"></div>
            <p className="text-gray-400 mt-4 text-sm sm:text-base max-w-2xl">
              A showcase of technologies and tools I use to build interactive,
              modern web experiences.
            </p>
          </div>

          {/* Skills Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 sm:gap-8 md:gap-10 max-w-5xl">
            {[
              // 🌐 Frontend
              {
                name: "HTML5",
                icon: "fab fa-html5",
                color: "#E44D26",
                percent: 95,
              },
              {
                name: "CSS3",
                icon: "fab fa-css3-alt",
                color: "#264DE4",
                percent: 92,
              },
              {
                name: "JavaScript",
                icon: "fab fa-js",
                color: "#F7E018",
                percent: 90,
              },
              {
                name: "React.js",
                icon: "fab fa-react",
                color: "#61DAFB",
                percent: 88,
              },
              {
                name: "React Native",
                icon: "fab fa-react",
                color: "#00D8FF",
                percent: 80,
              },
              {
                name: "Tailwind CSS",
                icon: "fas fa-wind",
                color: "#38BDF8",
                percent: 93,
              },
              {
                name: "Bootstrap",
                icon: "fab fa-bootstrap",
                color: "#7952B3",
                percent: 85,
              },
              // { name: "jQuery", icon: "fas fa-code", color: "#0769AD", percent: 75 },

              // ⚙️ Backend
              {
                name: "Node.js",
                icon: "fab fa-node-js",
                color: "#3C873A",
                percent: 85,
              },
              {
                name: "Express.js",
                icon: "fas fa-server",
                color: "#808080",
                percent: 82,
              },
              // { name: "PHP", icon: "fab fa-php", color: "#777BB4", percent: 70 },

              // 🗄️ Databases
              {
                name: "MongoDB",
                icon: "fas fa-database",
                color: "#4DB33D",
                percent: 80,
              },
              {
                name: "MySQL",
                icon: "fas fa-database",
                color: "#00618A",
                percent: 78,
              },

              // 🔗 APIs & Tools
              {
                name: "REST API",
                icon: "fas fa-plug",
                color: "#EAB308",
                percent: 85,
              },
              {
                name: "Git & GitHub",
                icon: "fab fa-github",
                color: "#FFFFFF",
                percent: 88,
              },
              {
                name: "Postman",
                icon: "fas fa-paper-plane",
                color: "#FF6C37",
                percent: 80,
              },
            ].map((skill, index) => (
              <motion.div
                key={skill.name}
                onClick={() => {
                  playClick();
                  setActiveSkill(skill);
                }}
                className="cursor-pointer relative bg-white/10 backdrop-blur-lg border border-white/10 rounded-2xl shadow-lg flex flex-col items-center justify-center text-center p-6 sm:p-8 hover:shadow-[0_0_30px_rgba(59,130,246,0.4)] transition-all duration-500 group"
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                  duration: 0.6,
                  ease: "easeOut",
                  delay: index * 0.08,
                }}
                viewport={{ once: true, amount: 0.3 }}
                whileHover={{ scale: 1.08, rotate: 2 }}
              >
                <i
                  className={`${skill.icon} text-5xl sm:text-6xl mb-3`}
                  style={{ color: skill.color }}
                ></i>
                <h3 className="text-sm sm:text-base font-semibold text-gray-200 group-hover:text-white transition">
                  {skill.name}
                </h3>
              </motion.div>
            ))}
          </div>

          {/* 🌟 Skill Modal (Popup) */}
          {activeSkill && (
            <motion.div
              className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-[200]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ type: "spring", stiffness: 150, damping: 12 }}
                className="relative bg-gradient-to-br from-gray-900 via-gray-850 to-gray-900 border border-blue-500/20 rounded-2xl shadow-[0_0_40px_rgba(59,130,246,0.3)] p-8 sm:p-10 max-w-md w-[90%] text-center"
              >
                {/* Close Button */}
                <button
                  onClick={() => {
                    playClick();
                    setActiveSkill(null);
                  }}
                  className="absolute top-3 right-3 text-gray-400 hover:text-blue-400 transition text-lg cursor-pointer"
                >
                  <i className="fas fa-times"></i>
                </button>

                {/* Icon & Name */}
                <i
                  className={`${activeSkill.icon} text-6xl mb-4`}
                  style={{ color: activeSkill.color }}
                ></i>
                <h2 className="text-2xl font-bold text-blue-400 mb-2">
                  {activeSkill.name}
                </h2>

                {/* Progress Bar */}
                <div className="w-full bg-gray-800 rounded-full h-3 mt-6 mb-3 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${activeSkill.percent}%` }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-blue-400 via-blue-500 to-purple-500 rounded-full"
                  ></motion.div>
                </div>
                <p className="text-gray-400 text-sm mb-4">
                  Skill Proficiency:{" "}
                  <span className="text-blue-300 font-semibold">
                    {activeSkill.percent}%
                  </span>
                </p>

                {/* Short Description */}
                <p className="text-gray-300 text-sm leading-relaxed">
                  {activeSkill.name} is a vital part of my developer toolkit,
                  helping me craft high-performance, scalable, and beautiful web
                  applications.
                </p>
              </motion.div>
            </motion.div>
          )}
        </section>

        {/* 🔹 Experience Section - Visible Glowing Timeline Behind Content */}
        <section
          id="experience"
          className="relative flex flex-col items-center justify-center px-6 sm:px-10 md:px-20 py-24 bg-transparent
 text-white overflow-hidden"
        >
          {/* Title */}
          <div className="w-full flex flex-col items-center mb-14 sm:mb-16 text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-3 tracking-tight">
              <span className="text-blue-400">My</span> Experience
            </h1>
            <div className="h-[3px] w-20 bg-blue-500 rounded-full"></div>
            <p className="text-gray-400 mt-4 text-sm sm:text-base max-w-2xl leading-relaxed px-3">
              Every milestone shaped my skills and growth — here’s the story of
              how I became a developer.
            </p>
          </div>

          {/* 🔹 Main Timeline Container */}
          <div className="relative w-full max-w-5xl mt-6">
            {/* 🌟 Full-Height Glowing Line Behind Content */}
            <div className="hidden md:block absolute inset-y-0 left-1/2 transform -translate-x-1/2 w-[4px] bg-gradient-to-b from-blue-500 via-blue-400 to-blue-200 shadow-[0_0_35px_rgba(59,130,246,0.8)] rounded-full opacity-90 -z-10 overflow-hidden">
              {/* Flow animation inside the line */}
              <motion.div
                animate={{ y: ["-100%", "100%"] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-blue-200 via-blue-400/80 to-transparent blur-md opacity-90"
              ></motion.div>
            </div>

            {/* 🔹 Experience Steps */}
            <div className="flex flex-col space-y-20 md:space-y-28 relative z-10">
              {[
                {
                  icon: "fas fa-chalkboard-teacher",
                  title: "Programming Mentor",
                  company: "Kaivalya Infotech",
                  location: "Dombivli, Maharashtra",
                  duration: "May 2022 - Oct 2022",
                  desc: "Guided aspiring developers in core JavaScript and React. Conducted coding workshops and helped students build logical problem-solving confidence.",
                },
                {
                  icon: "fas fa-laptop-code",
                  title: "Frontend Developer",
                  company: "Freelance / Remote",
                  location: "Thane, Maharashtra",
                  duration: "Nov 2022 - May 2023",
                  desc: "Worked with clients remotely to craft high-quality, mobile-first UIs using React and TailwindCSS. Delivered fast, elegant, and modern user experiences.",
                },
                {
                  icon: "fas fa-server",
                  title: "Full Stack Developer",
                  company: "Pacecon Technosys",
                  location: "Dadar, Mumbai",
                  duration: "Jun 2023 - Present",
                  desc: "Creating scalable full-stack apps with MERN stack. Building APIs, managing databases, and developing dashboards with smooth UI/UX.",
                },
              ].map((exp, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: 0.8,
                    delay: index * 0.15,
                    ease: "easeOut",
                  }}
                  viewport={{ once: true, amount: 0.3 }}
                  className={`relative flex flex-col md:flex-row items-center ${
                    index % 2 === 0 ? "md:flex-row-reverse" : ""
                  } md:justify-between`}
                >
                  {/* 🔹 Connector Dot aligned with the line */}
                  <div className="hidden md:flex items-center justify-center absolute left-1/2 transform -translate-x-1/2 z-0">
                    <div className="relative w-6 h-6 flex items-center justify-center">
                      <span className="absolute w-6 h-6 bg-blue-500 rounded-full animate-ping opacity-40"></span>
                      <span className="relative w-4 h-4 bg-blue-500 rounded-full shadow-[0_0_25px_rgba(59,130,246,0.9)]"></span>
                    </div>
                  </div>

                  {/* 🔹 Info & Icon */}
                  <div className="flex flex-col items-center text-center md:text-left md:w-1/2 px-4 relative z-10">
                    <div className="w-16 h-16 flex items-center justify-center bg-blue-500/10 border border-blue-500/20 rounded-full mb-4 shadow-[0_0_25px_rgba(59,130,246,0.3)]">
                      <i className={`${exp.icon} text-2xl text-blue-400`}></i>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-white">
                      {exp.title}
                    </h3>
                    <h4 className="text-blue-400 font-semibold text-sm sm:text-base">
                      {exp.company}
                    </h4>
                    <p className="text-gray-400 text-xs sm:text-sm">
                      {exp.location} • {exp.duration}
                    </p>
                  </div>

                  {/* 🔹 Description */}
                  <div className="md:w-1/2 mt-6 md:mt-0 text-center md:text-left px-6 sm:px-8 relative z-10">
                    <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                      {exp.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Background Subtle Glow */}
          <div className="absolute inset-0 -z-20 overflow-hidden">
            <div className="absolute w-full h-full bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.12)_0%,transparent_70%)] animate-pulse"></div>
          </div>
        </section>

        {/* 🔹 Projects Section */}
        <section
          id="projects"
          className="flex flex-col items-center justify-center px-6 sm:px-12 md:px-24 py-20 bg-transparent text-white overflow-hidden"
        >
          {/* Title */}
          <div className="w-full flex flex-col items-center mb-14 sm:mb-16 text-center">
            <h1 className="text-3xl sm:text-4xl font-extrabold mb-3 tracking-tight">
              <span className="text-blue-400">My</span> Projects
            </h1>
            <div className="h-[3px] w-20 bg-blue-500 rounded-full"></div>
            <p className="text-gray-400 mt-4 text-sm sm:text-base max-w-2xl leading-relaxed px-3">
              Some of the projects I’ve built — blending creativity,
              functionality, and performance.
            </p>
          </div>

          {/* Project Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl">
            {[
              {
                title: "Portfolio Website",
                desc: "A modern and responsive personal portfolio built with React and Tailwind CSS.",
                tech: ["React", "TailwindCSS", "Framer Motion"],
                link: "https://yourportfolio.com",
              },
              {
                title: "E-Commerce Platform",
                desc: "Full-stack shopping platform with payment integration and admin dashboard.",
                tech: ["MongoDB", "Express", "React", "Node.js"],
                link: "https://ecommerce-demo.com",
              },
              {
                title: "Weather App",
                desc: "Weather forecast web app using OpenWeather API and geolocation detection.",
                tech: ["JavaScript", "API", "CSS3"],
                link: "https://weatherapp-demo.com",
              },
            ].map((proj, index) => (
              <motion.div
                key={proj.title}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true, amount: 0.3 }}
                className="relative bg-white/10 backdrop-blur-lg border border-white/10 rounded-2xl shadow-lg p-6 sm:p-8 hover:shadow-[0_0_30px_rgba(59,130,246,0.4)] transition-all duration-500 group flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-blue-400 mb-2">
                    {proj.title}
                  </h3>
                  <p className="text-gray-300 text-sm sm:text-base mb-4 leading-relaxed">
                    {proj.desc}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {proj.tech.map((t) => (
                      <span
                        key={t}
                        className="bg-blue-500/10 text-blue-300 border border-blue-500/20 text-xs px-3 py-1 rounded-full"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                <a
                  href={proj.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-block text-blue-400 hover:text-blue-300 font-medium text-sm sm:text-base"
                >
                  View Project{" "}
                  <i className="fas fa-external-link-alt ml-2 text-xs"></i>
                </a>
              </motion.div>
            ))}
          </div>
        </section>

        {/* 🔹 Contact Section */}
        <section
          id="contact"
          className="flex flex-col items-center justify-center px-6 sm:px-12 md:px-24 py-20 bg-transparent
 text-white overflow-hidden"
        >
          {/* Title */}
          <div className="w-full flex flex-col items-center mb-12 text-center">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-3 tracking-tight">
              <span className="text-blue-400">Get</span> In Touch
            </h1>
            <div className="h-[3px] w-20 bg-blue-500 rounded-full"></div>
            <p className="text-gray-400 mt-4 text-sm sm:text-base max-w-xl leading-relaxed">
              I’m always open to discussing new projects, ideas, or
              opportunities.
            </p>
          </div>

          {/* Contact Form */}
          <motion.form
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.3 }}
            className="bg-white/10 backdrop-blur-lg border border-white/10 rounded-2xl shadow-lg p-6 sm:p-8 md:p-10 w-full max-w-lg text-center md:text-left"
          >
            <div className="flex flex-col space-y-5">
              <input
                type="text"
                placeholder="Your Name"
                className="bg-gray-800/60 border border-gray-700 rounded-lg px-4 py-3 text-sm sm:text-base focus:outline-none focus:border-blue-400"
              />
              <input
                type="email"
                placeholder="Your Email"
                className="bg-gray-800/60 border border-gray-700 rounded-lg px-4 py-3 text-sm sm:text-base focus:outline-none focus:border-blue-400"
              />
              <textarea
                rows="4"
                placeholder="Your Message"
                className="bg-gray-800/60 border border-gray-700 rounded-lg px-4 py-3 text-sm sm:text-base focus:outline-none focus:border-blue-400 resize-none"
              ></textarea>
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg shadow-md hover:shadow-[0_0_20px_rgba(59,130,246,0.4)] transition-all duration-300"
              >
                Send Message
              </button>
            </div>
          </motion.form>
        </section>

        {/* 🔹 Epic Futuristic Footer Section */}
        <footer
          className="relative overflow-hidden bg-transparent
 text-gray-300 py-14 px-6 sm:px-10 md:px-20 text-center border-t border-blue-900/30"
        >
          {/* 🌈 Glowing Top Divider Line */}
          <div className="absolute top-0 left-0 w-full h-[3px] bg-transparent animate-pulse"></div>

          {/* ✨ Floating Glow Orbs Background */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.08)_0%,transparent_70%)]">
            <div className="absolute w-[200px] h-[200px] bg-transparent rounded-full top-0 left-[10%] animate-pulse"></div>
            <div className="absolute w-[250px] h-[250px] bg- rounded-full bottom-0 right-[15%] animate-[float_6s_ease-in-out_infinite_alternate]"></div>
          </div>

          {/* 🌐 Social Links */}
          <div className="flex items-center justify-center space-x-8 sm:space-x-10 mb-8">
            {[
              {
                icon: "fab fa-github",
                link: "https://github.com/",
                color: "#ffffff",
              },
              {
                icon: "fab fa-linkedin",
                link: "https://linkedin.com/",
                color: "#0A66C2",
              },
              {
                icon: "fab fa-twitter",
                link: "https://twitter.com/",
                color: "#1DA1F2",
              },
              {
                icon: "fas fa-envelope",
                link: "mailto:rushikesharote14@gmail.com",
                color: "#EA4335",
              },
            ].map((social, index) => (
              <motion.a
                key={index}
                href={social.link}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.3, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300, damping: 10 }}
                className="relative text-2xl sm:text-3xl group transition-all duration-500"
              >
                <i
                  className={`${social.icon}`}
                  style={{ color: social.color }}
                ></i>
                <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-[2px] bg-gradient-to-r from-blue-400 to-purple-500 group-hover:w-8 transition-all duration-500 rounded-full"></span>
              </motion.a>
            ))}
          </div>

          {/* 💬 Footer Text */}
          <div className="space-y-2">
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-wide">
              <span className="text-blue-400">Rushi</span>.dev
            </h2>
            <p className="text-gray-400 text-sm sm:text-base max-w-lg mx-auto leading-relaxed">
              Crafting immersive web experiences with creativity, logic, and a
              touch of soul.
            </p>
          </div>

          {/* 💫 Divider Line */}
          <div className="w-24 h-[2px] mx-auto my-6 bg-gradient-to-r from-blue-400 via-blue-500 to-purple-500 rounded-full shadow-[0_0_15px_rgba(59,130,246,0.8)]"></div>

          {/* 👑 Copyright + Signature */}
          <p className="text-xs sm:text-sm text-gray-500">
            © {new Date().getFullYear()}{" "}
            <span className="text-blue-400 font-semibold">Rushi.dev</span> —
            Designed & Built with 💙 by{" "}
            <span className="text-white font-medium hover:text-blue-400 transition-all duration-300 cursor-pointer">
              Rushi Arote
            </span>
          </p>

          {/* 🌠 Hover Glow Animation (bottom beam) */}
          <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-blue-400 via-purple-500 to-blue-400 animate-[glow_3s_ease-in-out_infinite_alternate]"></div>

          {/* 🌀 Subtle Background Animation */}
          <style>
            {`
              @keyframes float {
                0% { transform: translateY(0px); }
                100% { transform: translateY(-25px); }
              }
              @keyframes glow {
                0% { opacity: 0.4; filter: blur(2px); }
                100% { opacity: 1; filter: blur(6px); }
              }
            `}
          </style>
        </footer>
      </div>

      {/* 🔼 Scroll-to-Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 cursor-pointer right-6 sm:bottom-8 sm:right-8 bg-blue-500 hover:bg-blue-600 text-white p-3 sm:p-4 rounded-full shadow-lg hover:shadow-[0_0_25px_rgba(59,130,246,0.4)] transition-all duration-500 z-[200] backdrop-blur-md border border-white/10 active:scale-95 opacity-90 hover:opacity-100"
        >
          <ArrowUp size={22} className="animate-bounce" />
        </button>
      )}

      {/* ✨ Animations */}
      <style>
        {`
          @keyframes float-slow {
            0% { transform: translateY(0px) translateX(0px); }
            50% { transform: translateY(-30px) translateX(20px); }
            100% { transform: translateY(0px) translateX(0px); }
          }
          @keyframes float-reverse {
            0% { transform: translateY(0px) translateX(0px); }
            50% { transform: translateY(30px) translateX(-20px); }
            100% { transform: translateY(0px) translateX(0px); }
          }
          .animate-float-slow {
            animation: float-slow 12s ease-in-out infinite;
          }
          .animate-float-reverse {
            animation: float-reverse 14s ease-in-out infinite;
          }
        html, body {
  background-color: #000;
  overflow-x: hidden;
  position: relative;
  z-index: -1;
}


        `}
      </style>
    </div>
  );
};

export default App;
