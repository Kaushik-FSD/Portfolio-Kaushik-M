import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Github, 
  Linkedin, 
  Mail, 
  ExternalLink, 
  Terminal, 
  Code2, 
  Coffee, 
  Plane, 
  TrendingUp, 
  Menu, 
  X, 
  ChevronRight,
  Cpu,
  Server,
  FileText,
  Image,
  BookOpen,
  Database,
  Layers,
  Sun,
  Moon
} from 'lucide-react';

// --- Components ---

const MacWindow = ({ children, title = "terminal", className = "" }: { children: React.ReactNode, title?: string, className?: string }) => (
  <div className={`rounded-xl border border-text-primary/10 bg-secondary-bg/50 backdrop-blur-sm shadow-2xl overflow-hidden ${className}`}>
    <div className="flex items-center justify-between px-4 py-2 border-b border-text-primary/5 bg-text-primary/5">
      <div className="flex gap-1.5">
        <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
        <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
        <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
      </div>
      <span className="text-[10px] font-mono text-text-secondary uppercase tracking-widest">{title}</span>
      <div className="w-10" />
    </div>
    <div className="p-4 md:p-6">
      {children}
    </div>
  </div>
);

const SectionTitle = ({ number, title }: { number: string, title: string }) => (
  <div className="flex items-center gap-4 mb-8 md:mb-12">
    <span className="text-accent-pink font-mono text-lg md:text-xl">{number}.</span>
    <h2 className="text-2xl md:text-3xl font-bold text-text-primary tracking-tight">{title}</h2>
    <div className="h-[1px] flex-grow bg-text-primary/10" />
  </div>
);

const NavLink = ({ href, number, text, onClick }: { href: string, number?: string, text: string, onClick?: () => void }) => (
  <a 
    href={href} 
    onClick={onClick}
    className="group flex items-center gap-2 text-sm font-medium text-text-secondary hover:text-accent-cyan transition-colors"
  >
    {number && <span className="text-accent-pink font-mono text-xs">{number}.</span>}
    <span>{text}</span>
  </a>
);

// --- Sections ---

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'light'>('light');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (theme === 'light') {
      document.documentElement.classList.add('light');
    } else {
      document.documentElement.classList.remove('light');
    }
  }, [theme]);

  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');

  const navItems = [
    { number: "01", text: "About", href: "#about" },
    { number: "02", text: "Experience", href: "#experience" },
    { number: "03", text: "Work", href: "#work" },
    { number: "04", text: "Contact", href: "#contact" },
  ];

  return (
    <div className="min-h-screen selection:bg-accent-cyan/30 selection:text-accent-cyan">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-primary-bg/80 backdrop-blur-md py-4 shadow-lg' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-end md:grid md:grid-cols-3">
          {/* Left spacer for desktop grid */}
          <div className="hidden md:block"></div>

          {/* Desktop Nav - Middle */}
          <div className="hidden md:flex items-center justify-center gap-8">
            {navItems.map((item, idx) => (
              <motion.div
                key={item.text}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                <NavLink href={item.href} number={item.number} text={item.text} />
              </motion.div>
            ))}
          </div>

          {/* Desktop Nav - Right */}
          <div className="hidden md:flex items-center justify-end gap-6">
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              onClick={toggleTheme}
              className="p-2 text-text-secondary hover:text-accent-cyan transition-colors"
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </motion.button>
            {/*<motion.a
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
              href="https://drive.google.com/file/d/1fhVIzu_mgjh2vlqLWkHTVaBE9t7Brr0d/view?usp=sharing"
              className="px-4 py-2 border border-accent-cyan text-accent-cyan text-sm font-mono rounded hover:bg-accent-cyan/10 transition-colors"
            >
              Resume
            </motion.a>*/}

          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className="p-2 text-text-secondary"
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? <Sun size={24} /> : <Moon size={24} />}
            </button>
            <button 
              className="text-accent-cyan relative z-50"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle Menu"
            >
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Nav Overlay */}
        {/*<AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              className="fixed inset-0 bg-secondary-bg z-40 md:hidden flex flex-col items-center justify-center gap-8"
            >
              {navItems.map((item) => (
                <motion.div key={item.text}>
                  <NavLink 
                    href={item.href} 
                    number={item.number} 
                    text={item.text} 
                    onClick={() => setIsMenuOpen(false)}
                  />
                </motion.div>
              ))}
              <a 
                href="https://drive.google.com/file/d/1fhVIzu_mgjh2vlqLWkHTVaBE9t7Brr0d/view?usp=sharing"
                className="px-8 py-3 border border-accent-cyan text-accent-cyan text-lg font-mono rounded"
              >
                Resume
              </a>
            </motion.div>
          )}
        </AnimatePresence>*/}
      </nav>

      <main className="max-w-7xl mx-auto px-6 md:px-12 pt-32">
        {/* Hero Section */}
        <section id="hero" className="min-h-[80vh] flex flex-col md:flex-row items-center gap-12 mb-32">
          <div className="flex-1">
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-accent-cyan font-mono mb-4"
            >
              Hi, my name is
            </motion.p>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-bold text-text-primary mb-4"
            >
              Kaushik Mandal.
            </motion.h1>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-4xl md:text-6xl font-bold text-text-secondary mb-8 leading-tight"
            >
              I build backend systems.
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="max-w-xl text-text-secondary text-lg mb-12"
            >
              I'm a software engineer who is building (and occasionally designing) backend systems. Currently, I focus on architecture, reliability, and shipping production software.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <a 
                href="#work"
                className="inline-block px-8 py-4 border border-accent-cyan text-accent-cyan font-mono rounded hover:bg-accent-cyan/10 transition-all hover:-translate-y-1"
              >
                Check out my projects!
              </a>
            </motion.div>
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="flex-1 w-full md:w-auto"
          >
            <MacWindow title="stack.java">
              <pre className="font-mono text-sm md:text-base leading-relaxed">
                <code className="text-accent-pink">public class</code> <code className="text-accent-yellow">TechStack</code> {'{'}{'\n\n'}
                {'    '}<code className="text-accent-cyan">private</code> List&lt;String&gt; skills;{'\n\n'}
                {'    '}<code className="text-accent-cyan">public void</code> init() {'{'}{'\n'}
                {'        '}skills = Arrays.asList({'\n'}
                {'            '}<code className="text-accent-yellow">"Java"</code>, <code className="text-accent-yellow">"Spring Boot"</code>,{'\n'}
                {'            '}<code className="text-accent-yellow">"Node.js"</code>, <code className="text-accent-yellow">"TypeScript"</code>,{'\n'}
                {'            '}<code className="text-accent-yellow">"MySQL"</code>, <code className="text-accent-yellow">"and more..."</code>{'\n'}
                {'        '});{'\n'}
                {'    '}{'}'}{'\n'}
                {'}'}
              </pre>
            </MacWindow>
          </motion.div>
        </section>

        {/* About Section */}
        <section id="about" className="mb-48 scroll-mt-32">
          <SectionTitle number="01" title="About Me" />
          <div className="max-w-5xl mx-auto">
            <div className="text-text-secondary space-y-6 text-lg mb-12 text-left">
              <p>
                I'm a backend engineer with 4+ years of experience building and maintaining production-grade systems. My day-to-day sits deep in the backend — writing robust service logic, designing database schemas, debugging complex production issues, and collaborating with teams on high-level architecture decisions.
              </p>
              <p>
                Most of my professional work is in Java and Spring Boot, where I've contributed to large-scale backend services, handled intricate data migrations (including server-to-Rancher and cloud transitions), and helped maintain systems that real users depend on.
              </p>
              <p>
                Outside of work, I build personal projects in JavaScript and Node.js — exploring frameworks like Fastify and patterns like multi-tenancy, job queues, and AI integrations. I'm currently expanding into Python and Applied AI Engineering, building systems that use LLMs, RAG pipelines, and embeddings.
              </p>
              <p className="text-accent-cyan font-medium">
                I'm not the engineer who does everything end-to-end alone — I'm the one who makes the backend harder to break.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="h-[1px] flex-grow bg-text-primary/10" />
                <p className="text-text-primary font-mono text-sm uppercase tracking-widest whitespace-nowrap">Technical Skills</p>
                <div className="h-[1px] flex-grow bg-text-primary/10" />
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-y-3 gap-x-4 justify-items-center">
                {[
                  "Java", "Javascript", "Typescript", "Node.js", "express.js", 
                  "MonogDB", "MySQL", "PostgreSQL", "Python", "Spring boot", 
                  "Fastify", "GCP", "ReactJs", "HTML5", "CSS", 
                  "Docker (prior knowledge)", "Git & GitHub", "FastAPI"
                ].map((skill) => (
                  <div key={skill} className="flex items-center gap-2 text-text-secondary text-sm font-mono hover:text-accent-cyan transition-colors cursor-default">
                    <ChevronRight size={14} className="text-accent-pink flex-shrink-0" />
                    <span>{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="mb-48 scroll-mt-32">
          <SectionTitle number="02" title="Where I’ve Worked" />
          <div className="space-y-12 max-w-4xl">
            {[
              {
                role: "Software Development Engineer II",
                company: "Lumen Technologies",
                period: "2024 - Present",
                impact: [
                  "Led the migration of LASER platform services from Unix servers to Rancher/Kubernetes, decoupling 20+ microservices into logical container groups — improving deployment efficiency, resource utilization, and scalability across the platform.",
                  "Designed and implemented Spring Cloud Config Server integration to externalize microservice configurations, enabling dynamic property updates without pod restarts or redeployments.",
                  "Resolved critical REST API timeout issues in Laser upstream services by identifying and fixing an immutable builder misuse in the HTTP client configuration — implemented a properly scoped request factory with custom timeout settings, eliminating stalled transactions flagged in AppDynamics.",
                  "Prior contribution in Solr search security with SSO using a reverse proxy architecture (NGINX + oauth2-proxy + Azure AD), enabling authentication with role mapping and audit logging for enterprise-grade access control.",
                  "Contributed to AWS migration documentation for Transport services and participated in architecture spike for decoupling monolithic services into containerized groups with CI/CD pipelines using Helm charts.",
                  "Extended REST V2 and V3 ticketing APIs with Alarm Status support across ticket details, update, and troubleTicket endpoints — and contributed to product-to-subtype lookup resolution as part of the WL2 Kubernetes migration."
                ]
              },
              {
                role: "Software Development Engineer I",
                company: "Global PayEx",
                period: "2022 - 2024",
                impact: [
                  "Refactored the codebase to segregate database users by role into new database collections, resulting in a 25% reduction in latency on both the service and repository layers when fetching nested records.",
                  "Collaborated in building NiFi data flows to handle diverse use-case scenarios, reducing product-level code changes by approximately 50%.",
                  "Designed and developed a new notification channel with supporting APIs for in-app and multi-type notifications across existing services.",
                  "Established a robust CI/CD pipeline using Jenkins for automated loading of build artifacts, test files, and deployment processes — alongside iterative refactoring and debugging workflows.",
                  "Contributed to backend architecture discussions and collaborated cross-functionally to maintain and evolve production services handling financial data.",
                  "ntegrated Redis caching into the project infrastructure to improve data retrieval efficiency, achieving a 20% reduction in response times for critical operations."
                ]
              },
              {
                role: "Software Developer Intern",
                company: "MyPaisa",
                period: "2021 - 2022",
                impact: [
                  "Built a proof-of-concept to reduce database load by routing read operations to a read replica across different RDBMS repositories — validating the approach before production rollout.",
                  "Developed APIs for multiple financial transaction scenarios including deductions, laying the groundwork for core backend functionality.",
                  "Collaborated with the team using Git-based version control workflows to manage code changes, coordinate tasks, and maintain clean commit history."
                ]
              }
            ].map((job, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="relative pl-8 border-l border-white/10"
              >
                <div className="absolute left-[-5px] top-0 w-2 h-2 rounded-full bg-accent-cyan" />
                <h3 className="text-xl font-bold text-text-primary">
                  {job.role} <span className="text-accent-cyan">@ {job.company}</span>
                </h3>
                <p className="text-sm font-mono text-text-secondary mb-4">{job.period}</p>
                <ul className="space-y-2">
                  {job.impact.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-text-secondary text-base">
                      <ChevronRight size={16} className="text-accent-cyan mt-1 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Projects Section */}
        <section id="work" className="mb-48 scroll-mt-32">
          <SectionTitle number="03" title="Open-source & Tooling" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "InfraCore",
                desc: "Production-grade multi-tenant SaaS backend platform with JWT auth, RBAC, API key infrastructure, webhook delivery with HMAC signing, BullMQ job queues, and AI-powered usage insights.",
                stack: ["Fastify", "TypeScript", "PostgreSQL", "Redis", "BullMQ", "Prisma"],
                highlight: "Multi-tenant + AI insights",
                github: "https://github.com/Kaushik-FSD/InfraCore",
                icon: <Server className="text-accent-cyan" />
              },
              {
                title: "StandupBot CLI",
                desc: "Developer-first CLI tool for logging daily work and generating AI-powered standup summaries. Monorepo with a Fastify backend, Redis caching, rate limiting, and a pluggable AI provider layer.",
                stack: ["Node.js", "TypeScript", "Fastify", "Redis", "PostgreSQL", "Commander.js"],
                highlight: "Pluggable AI provider layer",
                github: "https://github.com/Kaushik-FSD/Standup-CLI",
                icon: <Terminal className="text-accent-pink" />
              },
              {
                title: "Transcribe",
                desc: "AI-powered meeting transcript analyzer that handles 10k–20k word transcripts using a chunking strategy, extracting summaries, action items, and sentiment as structured JSON.",
                stack: ["Node.js", "Express", "Gemini API"],
                highlight: "Handles 20k word transcripts",
                github: "https://github.com/Kaushik-FSD/Transcribe",
                icon: <FileText className="text-accent-yellow" />
              },
              {
                title: "System Info CLI",
                desc: "Lightweight Python CLI tool to display real-time CPU, memory, disk, and network information with modular architecture, a timed decorator, and typed dataclass models.",
                stack: ["Python", "psutil", "argparse", "dataclasses"],
                highlight: "Real-time system metrics",
                github: "https://github.com/Kaushik-FSD/system-info-cli",
                icon: <Cpu className="text-accent-yellow" />
              },
              {
                title: "DALL-E Image Generator",
                desc: "Full-stack web app for AI image generation from text prompts, with image storage via Cloudinary and a community gallery to browse and share AI-generated images.",
                stack: ["React", "Node.js", "Express", "MongoDB", "OpenAI API", "Cloudinary"],
                highlight: "OpenAI image generation",
                github: "https://github.com/Kaushik-FSD/dall-e2.0",
                icon: <Image className="text-accent-cyan" />
              },
              {
                title: "SnapNote",
                desc: "Note-taking web app with Google OAuth authentication, allowing users to create, manage, and persist personal notes with secure login via Passport.js.",
                stack: ["Node.js", "Express", "MongoDB", "Google OAuth", "EJS"],
                highlight: "Google OAuth integration",
                github: "https://github.com/Kaushik-FSD/SnapNote",
                icon: <BookOpen className="text-accent-pink" />
              }
            ].map((project, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -10 }}
                className="group bg-secondary-bg/40 border border-text-primary/5 p-6 rounded-xl hover:border-accent-cyan/30 transition-all flex flex-col h-full"
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="p-3 bg-text-primary/5 rounded-lg">
                    {project.icon}
                  </div>
                  <div className="flex gap-4 text-text-secondary">
                    <a href={project.github} className="hover:text-accent-cyan transition-colors"><Github size={20} /></a>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-text-primary mb-2 group-hover:text-accent-cyan transition-colors">{project.title}</h3>
                <p className="text-text-secondary text-sm mb-6 flex-grow">{project.desc}</p>
                <div className="mb-4">
                  <span className="text-[10px] font-mono text-accent-pink uppercase tracking-widest">Key Highlight</span>
                  <p className="text-xs font-mono text-accent-yellow">{project.highlight}</p>
                </div>
                <div className="flex flex-wrap gap-2 mt-auto">
                  {project.stack.map(tech => (
                    <span key={tech} className="text-[10px] font-mono text-text-secondary bg-text-primary/5 px-2 py-1 rounded">{tech}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="mb-48 scroll-mt-32">
          <SectionTitle number="04" title="What’s Next?" />
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-bold text-text-primary mb-6">Get In Touch</h2>
            <p className="text-text-secondary text-lg mb-12">
              I'm always open to new opportunities, collaborations, or just a friendly chat about tech. Whether you have a question or want to discuss a potential project, my inbox is always open!
            </p>
            <div className="flex flex-col items-center gap-8">
              <a 
                href="mailto:mandalkaushik.work@gmail.com"
                className="px-10 py-5 border border-accent-cyan text-accent-cyan font-mono text-lg rounded hover:bg-accent-cyan/10 transition-all hover:-translate-y-1"
              >
                Say Hello
              </a>
              <div className="flex gap-8 text-text-secondary">
                <a href="https://github.com/Kaushik-FSD" className="hover:text-accent-cyan transition-colors hover:-translate-y-1 duration-300"><Github size={28} /></a>
                <a href="https://www.linkedin.com/in/mandal-kaushik/" className="hover:text-accent-cyan transition-colors hover:-translate-y-1 duration-300"><Linkedin size={28} /></a>
                <a href="mailto:mandalkaushik.work@gmail.com" className="hover:text-accent-cyan transition-colors hover:-translate-y-1 duration-300"><Mail size={28} /></a>
              </div>
            </div>
            <p className="mt-24 text-text-secondary font-mono text-xs">
              © 2026 Kaushik Mandal. All rights reserved.<br />
              {/*<span className="opacity-50">Inspired by the minimal aesthetic of modern dev portfolios.</span>*/}
            </p>
          </div>
        </section>
      </main>

      {/* Floating Socials (Desktop Only) */}
      <div className="hidden xl:block fixed bottom-0 left-12 z-50">
        <div className="flex flex-col items-center gap-6 after:content-[''] after:w-[1px] after:h-24 after:bg-white/20">
          <a href="https://github.com/Kaushik-FSD" className="text-text-secondary hover:text-accent-cyan hover:-translate-y-1 transition-all duration-300"><Github size={20} /></a>
          <a href="https://www.linkedin.com/in/mandal-kaushik/" className="text-text-secondary hover:text-accent-cyan hover:-translate-y-1 transition-all duration-300"><Linkedin size={20} /></a>
          <a href="mailto:mandalkaushik.work@gmail.com" className="text-text-secondary hover:text-accent-cyan hover:-translate-y-1 transition-all duration-300"><Mail size={20} /></a>
        </div>
      </div>

      <div className="hidden xl:block fixed bottom-0 right-12 z-50">
        <div className="flex flex-col items-center gap-6 after:content-[''] after:w-[1px] after:h-24 after:bg-white/20">
          <a 
            href="mailto:mandalkaushik.work@gmail.com" 
            className="text-text-secondary hover:text-accent-cyan transition-all duration-300 vertical-text font-mono text-xs tracking-widest mb-4"
            style={{ writingMode: 'vertical-rl' }}
          >
            mandalkaushik.work@gmail.com
          </a>
        </div>
      </div>
    </div>
  );
}
