// app/page.tsx
import Layout from './components/layout';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Project';
import Experience from './components/Experience';
import Contact from './components/Contact';

export default function Home() {
  return (
    <Layout>
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Contact />
    </Layout>
  );
}