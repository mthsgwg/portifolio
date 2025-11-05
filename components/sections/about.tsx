"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export default function About() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="about" className="py-20 lg:py-32 relative">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Text Content */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
                Sobre <span className="text-cyan-400">Mim</span>
              </h2>
              <div className="w-16 h-1 bg-gradient-to-r from-cyan-400 to-transparent mb-8" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="space-y-4 text-gray-300 leading-relaxed"
            >
              <p className="text-lg">
                Sou um desenvolvedor{" "}
                <span className="text-cyan-400 font-semibold">Fullstack</span>{" "}
                apaixonado por criar experiências digitais excepcionais e
                soluções tecnológicas inovadoras.
              </p>

              <p>
                Com expertise em <strong className="text-white">NextJS</strong>,{" "}
                <strong className="text-white">NodeJS</strong>,{" "}
                <strong className="text-white">TypeScript</strong>,{" "}
                <strong className="text-white">NestJS</strong> e{" "}
                <strong className="text-white">TypeORM</strong>, transformo
                ideias complexas em aplicações robustas e escaláveis.
              </p>

              <p>
                Minha abordagem combina{" "}
                <span className="text-cyan-400">código limpo</span>,{" "}
                <span className="text-cyan-400">arquitetura sólida</span> e{" "}
                <span className="text-cyan-400">design intuitivo</span> para
                entregar produtos que fazem a diferença na vida das pessoas.
              </p>

              <p>
                Sempre em busca de novos desafios e oportunidades para crescer
                como profissional, acredito que a tecnologia tem o poder de
                resolver problemas reais e criar impacto positivo.
              </p>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="grid grid-cols-2 gap-6 pt-8"
            >
              <div className="text-center">
                <h3 className="text-2xl font-bold text-cyan-400">5+</h3>
                <p className="text-sm text-gray-400">Tecnologias Principais</p>
              </div>
              <div className="text-center">
                <h3 className="text-2xl font-bold text-cyan-400">4+</h3>
                <p className="text-sm text-gray-400">Anos de Experiência</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Visual Element */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            <div className="relative z-10">
              {/* Code snippet mockup */}
              <div className="glass rounded-lg p-6 font-mono text-sm">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : {}}
                  transition={{ duration: 1, delay: 0.8 }}
                  className="space-y-2 text-xs lg:text-sm"
                >
                  <div className="text-gray-400">
                    <span className="text-purple-400">const</span>{" "}
                    <span className="text-cyan-400">developer</span>{" "}
                    <span className="text-white">=</span>{" "}
                    <span className="text-yellow-400">{"{"}</span>
                  </div>
                  <div className="pl-4 text-gray-300">
                    <span className="text-cyan-400">name</span>:{" "}
                    <span className="text-green-400">'Matheus Faria'</span>,
                  </div>
                  <div className="pl-4 text-gray-300">
                    <span className="text-cyan-400">role</span>:{" "}
                    <span className="text-green-400">
                      'Fullstack Developer'
                    </span>
                    ,
                  </div>
                  <div className="pl-4 text-gray-300">
                    <span className="text-cyan-400">skills</span>:{" "}
                    <span className="text-yellow-400">[</span>
                  </div>
                  <div className="pl-8 text-green-400">
                    'NextJS', 'NodeJS', 'TypeScript'
                  </div>
                  <div className="pl-4 text-yellow-400">]</div>
                  <div className="text-yellow-400">{"}"}</div>
                </motion.div>
              </div>
            </div>

            {/* Background decorations */}
            <motion.div
              className="absolute -top-4 -left-4 w-20 h-20 border-2 border-cyan-400/30 rounded-full"
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear",
              }}
            />

            <motion.div
              className="absolute -bottom-6 -right-6 w-12 h-12 bg-cyan-400/20 rounded-lg"
              animate={{
                rotate: -360,
              }}
              transition={{
                duration: 15,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
