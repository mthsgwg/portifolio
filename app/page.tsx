
import Hero from '@/components/sections/hero'
import About from '@/components/sections/about'
import Skills from '@/components/sections/skills'
import Projects from '@/components/sections/projects'
import Contact from '@/components/sections/contact'
import { ScrollProgress } from '@/components/ui/scroll-progress'

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      <ScrollProgress />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Contact />
    </main>
  )
}
