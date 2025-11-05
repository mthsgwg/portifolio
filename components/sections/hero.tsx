
'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ArrowDown, Github, Linkedin } from 'lucide-react'

export default function Hero() {
  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 grid-pattern opacity-20" />
      
      {/* Floating elements */}
      <motion.div
        className="absolute top-20 left-10 w-2 h-2 bg-cyan-400 rounded-full"
        animate={{
          y: [-10, 10, -10],
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      <motion.div
        className="absolute top-40 right-20 w-1 h-1 bg-cyan-400 rounded-full"
        animate={{
          y: [10, -10, 10],
          opacity: [1, 0.3, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />

      <div className="container mx-auto px-6 text-center z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          {/* Main heading with staggered animation */}
          <motion.div className="mb-6">
            <motion.h1
              className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              <span className="text-white">Matheus</span>
              <br />
              <span className="text-cyan-400 glow-text">Faria</span>
            </motion.h1>
          </motion.div>

          {/* Subtitle */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mb-8"
          >
            <p className="text-xl md:text-2xl text-gray-300 font-light">
              Fullstack Developer
            </p>
            <div className="w-20 h-0.5 bg-gradient-to-r from-cyan-400 to-transparent mx-auto mt-4" />
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            Transformando ideias em soluções digitais com código limpo e design intuitivo
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
          >
            <Button
              onClick={scrollToAbout}
              size="lg"
              className="bg-cyan-400 hover:bg-cyan-300 text-black font-semibold px-8 py-3 rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-cyan-400/25"
            >
              Conhecer meu trabalho
            </Button>
            
            <div className="flex gap-4">
              <Button
                variant="outline"
                size="lg"
                onClick={() => window.open('https://github.com/mthsgwg', '_blank')}
                className="border-gray-600 hover:border-cyan-400 hover:bg-cyan-400/10 rounded-full"
              >
                <Github className="w-5 h-5 mr-2" />
                GitHub
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                onClick={() => window.open('https://www.linkedin.com/in/matheus-faria-984a37187/', '_blank')}
                className="border-gray-600 hover:border-cyan-400 hover:bg-cyan-400/10 rounded-full"
              >
                <Linkedin className="w-5 h-5 mr-2" />
                LinkedIn
              </Button>
            </div>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="animate-bounce cursor-pointer"
            onClick={scrollToAbout}
          >
            <ArrowDown className="w-6 h-6 text-gray-400 hover:text-cyan-400 transition-colors" />
          </motion.div>
        </motion.div>
      </div>

      {/* Gradient orb */}
      <motion.div
        className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-cyan-400/20 to-transparent rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </section>
  )
}
