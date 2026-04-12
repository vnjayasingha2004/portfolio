import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import SkillsShowcase from "./components/SkillsShowcase";
import About from "./components/About";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen text-white">
      <Navbar />
      <Hero />
      <SkillsShowcase />
      <About />
      <Projects />
      <Contact />
      <Footer />
    </main>
  );
}