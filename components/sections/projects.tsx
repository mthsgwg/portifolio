"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Button } from "@/components/ui/button";
import {
  ExternalLink,
  Github,
  Code2,
  Database,
  Globe,
  Smartphone,
} from "lucide-react";
import Image from "next/image";

type Project = {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  category: string;
  image: string;
  github: string;
  live: string;
  icon: React.ComponentType<any>;
  featured: boolean;
  demo: string;
  openCode: boolean;
};

const projects: Project[] = [
  {
    id: 1,
    title: "Site de Notícias - PatosJá",
    description:
      "Site de notícias local com sistema de gerenciamento de conteúdo e integração com redes sociais.",
    technologies: [
      "NextJS",
      "NodeJS",
      "TypeScript",
      "PostgreSQL",
      "Express",
      "GCP",
      "Docker",
    ],
    category: "Fullstack",
    image: "/patosja.png",
    github: "#",
    live: "#",
    icon: Globe,
    featured: true,
    demo: "https://patosja.com.br",
    openCode: false,
  },
  {
    id: 2,
    title: "WebApp de consulta de empresas - Consultando Empresas",
    description:
      "Dashboard de consulta de empresas via setor de atuação, CNAE's e outros filtros. Além disso consta com uma integração de CRM e fitros de venda, com quadro Kanban e QSA de sócios via data scrapping.",
    technologies: ["NextJS", "NodeJS", "TypeScript", "MariaDB/MySQL"],
    category: "Fullstack",
    image: "/consultando_empresas.png",
    github: "https://github.com/mthsgwg/consultafacil",
    live: "#",
    icon: Globe,
    featured: true,
    demo: "",
    openCode: true,
  },
  {
    id: 3,
    title: "App de Tennis - Fuelo",
    description:
      "Sistema completo de usuários e gerenciamento de torneios, quadras de tennis, agendamento de partidas, controle de membros e pagamentos online. Com diferenciação de niveis de acesso de usuários.",
    technologies: [
      "Expo",
      "React Native",
      "Redis",
      "NextJS",
      "NodeJS",
      "TypeScript",
      "PostgreSQL",
      "TypeORM",
    ],
    category: "Fullstack",
    image: "/fuelo.png",
    github: "",
    live: "#",
    icon: Globe,
    featured: true,
    demo: "https://fuelo.com.br",
    openCode: false,
  },
];

export default function Projects() {
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
    <section className="py-20 lg:py-32 relative">
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            Meus <span className="text-cyan-400">Projetos</span>
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-cyan-400 to-transparent mx-auto mb-6" />
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Uma seleção dos meus trabalhos mais relevantes
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid gap-8"
        >
          {/* Featured projects - larger cards */}
          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                variants={itemVariants}
                className="group"
              >
                <div className="glass rounded-xl overflow-hidden hover:glow-border transition-all duration-500 h-full">
                  {/* Project Image */}
                  <div className="relative aspect-video bg-gray-800 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/20 to-transparent" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      {/* <project.icon className="w-16 h-16 text-cyan-400/50" /> */}
                      <Image
                        src={`${project.image}`}
                        alt={project.title}
                        layout="fill"
                        objectFit="cover"
                      />
                    </div>
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-cyan-400/20 text-cyan-400 rounded-full text-xs font-semibold">
                        {project.category}
                      </span>
                    </div>
                  </div>

                  {/* Project Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                      {project.title}
                    </h3>

                    <p className="text-gray-300 mb-4 leading-relaxed">
                      {project.description}
                    </p>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-1 bg-gray-800 text-gray-300 rounded text-xs"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Action buttons */}
                    <div className="flex gap-3">
                      <Button
                        variant={`${project.openCode ? "outline" : "disabled"}`}
                        size="sm"
                        onClick={() => {
                          project.openCode
                            ? window.open(`${project.github}`, "_blank")
                            : null;
                        }}
                        className="flex-1 border-gray-600 hover:border-cyan-400 hover:bg-cyan-400/10"
                      >
                        <Github className="w-4 h-4 mr-2" />
                        Código {project.openCode ? "" : "(desabilitado)"}
                      </Button>
                      <Button
                        size="sm"
                        onClick={() =>
                          project.demo.length < 1
                            ? null
                            : window.open(project.demo || "#", "_blank")
                        }
                        className="flex-1 bg-cyan-400 hover:bg-cyan-300 text-black"
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Demo {project.demo.length < 1 ? "(em breve)" : ""}
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Regular projects grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects
              .filter((project) => !project.featured)
              .map((project, index) => (
                <motion.div
                  key={project.id}
                  variants={itemVariants}
                  className="group"
                >
                  <div className="glass rounded-lg overflow-hidden hover:glow-border transition-all duration-300 h-full">
                    {/* Project Image */}
                    <div className="relative aspect-video bg-gray-800 overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/10 to-transparent" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <project.icon className="w-12 h-12 text-cyan-400/40" />
                      </div>
                      <div className="absolute top-3 left-3">
                        <span className="px-2 py-1 bg-cyan-400/20 text-cyan-400 rounded text-xs">
                          {project.category}
                        </span>
                      </div>
                    </div>

                    {/* Project Content */}
                    <div className="p-4">
                      <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                        {project.title}
                      </h3>

                      <p className="text-gray-300 text-sm mb-3 leading-relaxed">
                        {project.description}
                      </p>

                      {/* Technologies */}
                      <div className="flex flex-wrap gap-1 mb-4">
                        {project.technologies.slice(0, 3).map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-1 bg-gray-800 text-gray-300 rounded text-xs"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.technologies.length > 3 && (
                          <span className="px-2 py-1 bg-gray-700 text-gray-400 rounded text-xs">
                            +{project.technologies.length - 3}
                          </span>
                        )}
                      </div>

                      {/* Action buttons */}
                      <div className="flex gap-2">
                        <Button
                          variant={`${
                            project.openCode ? "outline" : "disabled"
                          }`}
                          size="sm"
                          // onClick={() => {
                          //   project.openCode ? window.open(``, "_blank") : null;
                          // }}
                          className="flex-1 border-gray-600 hover:border-cyan-400 hover:bg-cyan-400/10 text-xs"
                          disabled={true}
                        >
                          <Github className="w-3 h-3 mr-1" />
                          Código
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => window.open("#demo", "_blank")}
                          className="flex-1 bg-cyan-400 hover:bg-cyan-300 text-black text-xs"
                        >
                          <ExternalLink className="w-3 h-3 mr-1" />
                          Demo
                        </Button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
          </div>
        </motion.div>

        {/* View more button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
          className="text-center mt-12"
        >
          <Button
            variant="outline"
            size="lg"
            onClick={() => window.open("https://github.com/mthsgwg", "_blank")}
            className="border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black rounded-full px-8"
          >
            Ver todos os projetos
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
