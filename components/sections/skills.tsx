"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const skills = [
  {
    name: "NextJS",
    level: 92,
    description: "Framework React para produção",
    color: "from-gray-600 to-black",
    icon: "⚡",
  },
  {
    name: "NodeJS",
    level: 87,
    description: "Runtime JavaScript server-side",
    color: "from-green-600 to-green-800",
    icon: "🟢",
  },
  {
    name: "TypeScript",
    level: 92,
    description: "JavaScript com tipagem estática",
    color: "from-blue-600 to-blue-800",
    icon: "🔷",
  },
  {
    name: "NestJS",
    level: 76,
    description: "Framework Node.js escalável",
    color: "from-red-600 to-red-800",
    icon: "🏗️",
  },
  {
    name: "TypeORM",
    level: 82,
    description: "ORM para TypeScript e JavaScript",
    color: "from-orange-600 to-orange-800",
    icon: "🗄️",
  },
];

export default function Skills() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section className="py-20 lg:py-32 bg-gray-950/30 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="grid-pattern h-full w-full" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            Minhas <span className="text-cyan-400">Skills</span>
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-cyan-400 to-transparent mx-auto mb-6" />
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Tecnologias que domino para criar soluções completas e eficientes
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              variants={itemVariants}
              className="group"
            >
              <div className="glass rounded-xl p-6 hover:glow-border transition-all duration-300 h-full">
                <div className="flex items-center gap-4 mb-4">
                  <div className="text-2xl">{skill.icon}</div>
                  <div>
                    <h3 className="text-xl font-bold text-white">
                      {skill.name}
                    </h3>
                    <p className="text-sm text-gray-400">{skill.description}</p>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-300">Proficiência</span>
                    <span className="text-sm font-bold text-cyan-400">
                      {skill.level}%
                    </span>
                  </div>

                  <div className="w-full bg-gray-800 rounded-full h-2">
                    <motion.div
                      className={`bg-gradient-to-r ${skill.color} h-2 rounded-full relative overflow-hidden`}
                      initial={{ width: 0 }}
                      animate={
                        inView ? { width: `${skill.level}%` } : { width: 0 }
                      }
                      transition={{ duration: 1.5, delay: index * 0.2 }}
                    >
                      {/* Shimmer effect */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12"
                        animate={{
                          x: [-100, 200],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: index * 0.2 + 1.5,
                          repeatDelay: 3,
                        }}
                      />
                    </motion.div>
                  </div>
                </div>

                {/* Hover effect decoration */}
                <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-full h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Additional tech stack */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-16 text-center"
        >
          <p className="text-gray-400 mb-6">Outras tecnologias que trabalho:</p>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              "React",
              "PostgreSQL",
              "MongoDB",
              "Docker",
              "GCP",
              "Git",
              "REST APIs",
            ].map((tech, index) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.3, delay: 1.2 + index * 0.1 }}
                className="px-4 py-2 bg-gray-800/50 text-gray-300 rounded-full text-sm border border-gray-700 hover:border-cyan-400/50 hover:text-cyan-400 transition-all duration-300"
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
