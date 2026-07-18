import './index.css';

import Nav        from './components/Nav';
import Hero       from './components/Hero';
import About      from './components/About';
import Internship from './components/Internship';
import Projects   from './components/Projects';
import Skills     from './components/Skills';
import Footer     from './components/Footer';
import StatusBar  from './components/StatusBar';

export default function App() {
  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <Nav />

      <main id="main-content">
        <Hero />
        <About />
        <Internship />
        <Projects />
        <Skills />
      </main>

      <Footer />
      <StatusBar />
    </>
  );
}
