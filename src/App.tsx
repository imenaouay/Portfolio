import React, { useState, useRef } from 'react';
import { Code, Palette, Camera, Laptop, ChevronLeft, ChevronRight, Github, Linkedin, Mail, Menu, X, ArrowRight, ExternalLink, Link } from 'lucide-react';

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  icon: React.ReactNode;
  category: string;
}

interface Skill {
  name: string;
  level: number;
  category: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "Web Development",
    description: "Built modern web applications using React and TypeScript. Implemented responsive designs and optimized performance.",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80",
    icon: <Code className="w-6 h-6" />,
    category: "Development"
  },
  {
    id: 2,
    title: "UI/UX Design",
    description: "Created intuitive user interfaces and engaging experiences. Focused on user-centered design principles.",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=800&q=80",
    icon: <Palette className="w-6 h-6" />,
    category: "Design"
  },
  {
    id: 3,
    title: "Photography",
    description: "Captured moments through creative photography. Specialized in product and landscape photography.",
    image: "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?auto=format&fit=crop&w=800&q=80",
    icon: <Camera className="w-6 h-6" />,
    category: "Photography"
  },
  {
    id: 4,
    title: "App Development",
    description: "Developed cross-platform mobile applications. Created seamless user experiences across devices.",
    image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=800&q=80",
    icon: <Laptop className="w-6 h-6" />,
    category: "Development"
  },
];

function App() {
  const [currentFrame, setCurrentFrame] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const skills: Skill[] = [
    { name: "React", level: 90, category: "Frontend" },
    { name: "TypeScript", level: 85, category: "Languages" },
    { name: "Node.js", level: 80, category: "Backend" },
    { name: "UI/UX Design", level: 75, category: "Design" },
    { name: "Python", level: 85, category: "Languages" },
    { name: "AWS", level: 70, category: "Cloud" },
  ];

  const projectsRef = useRef<HTMLDivElement>(null);

  const scrollProjects = (direction: 'left' | 'right') => {
    if (projectsRef.current) {
      const scrollAmount = direction === 'left' ? -400 : 400;
      projectsRef.current.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const nextFrame = () => {
    setCurrentFrame((prev) => (prev + 1) % projects.length);
  };

  const prevFrame = () => {
    setCurrentFrame((prev) => (prev - 1 + projects.length) % projects.length);
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id);
    }
    setIsMenuOpen(false);
  };

  React.useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'skills', 'projects', 'contact'];
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <nav className="fixed top-0 left-0 right-0 bg-gray-900/95 backdrop-blur-sm z-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
              Portfolio
            </span>
            
            <div className="hidden md:flex items-center space-x-1">
              {['home', 'about', 'skills', 'projects', 'contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className={`px-4 py-2 rounded-lg capitalize transition-colors ${
                    activeSection === item
                      ? 'bg-blue-500 text-white'
                      : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-800 bg-gray-900/95 backdrop-blur-sm">
            <div className="px-4 py-2 space-y-1">
              {['home', 'about', 'skills', 'projects', 'contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className={`block w-full text-left px-4 py-2 rounded-lg capitalize transition-colors ${
                    activeSection === item
                      ? 'bg-blue-500 text-white'
                      : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      <div className="pt-20">
        <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden py-20 px-8">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: 'radial-gradient(circle at 25px 25px, white 2%, transparent 0%), radial-gradient(circle at 75px 75px, white 2%, transparent 0%)',
              backgroundSize: '100px 100px'
            }}/>
          </div>

          <div className="max-w-6xl mx-auto relative">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                  Creative
                  <span className="block text-blue-500">Developer</span>
                </h1>
                <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                  Transforming ideas into exceptional digital experiences through creative development and innovative design solutions.
                </p>
                <div className="flex flex-wrap gap-4">
                  <button
                    onClick={() => scrollToSection('projects')}
                    className="px-8 py-4 bg-blue-500 rounded-lg font-medium hover:bg-blue-600 transition-colors flex items-center gap-2"
                  >
                    View Projects
                    <ArrowRight className="w-5 h-5" />
                  </button>
                  <a
                    href="https://github.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-8 py-4 border border-gray-700 rounded-lg font-medium hover:bg-gray-800 transition-colors flex items-center gap-2"
                  >
                    GitHub
                    <ExternalLink className="w-5 h-5" />
                  </a>
                </div>
                
                <div className="grid grid-cols-3 gap-8 mt-12">
                  <div>
                    <div className="text-3xl font-bold text-blue-500">5+</div>
                    <div className="text-gray-400 mt-1">Years Experience</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-blue-500">50+</div>
                    <div className="text-gray-400 mt-1">Projects Completed</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-blue-500">30+</div>
                    <div className="text-gray-400 mt-1">Happy Clients</div>
                  </div>
                </div>
              </div>
              
              <div className="relative">
                <div className="relative z-10">
                  <img
                    src="https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80"
                    alt="Profile"
                    className="rounded-2xl shadow-2xl"
                  />
                </div>
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-blue-500/20 rounded-full blur-2xl"/>
                <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-purple-500/20 rounded-full blur-2xl"/>
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="py-20 px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-8">About Me</h2>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <img
                  src="https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80"
                  alt="Profile"
                  className="rounded-lg shadow-xl"
                />
              </div>
              <div>
                <p className="text-gray-300 text-lg leading-relaxed mb-6">
                  I'm a passionate full-stack developer with a keen eye for design and a love for creating
                  beautiful, functional web applications. With over 5 years of experience in the industry,
                  I've worked on various projects ranging from small business websites to large-scale
                  enterprise applications.
                </p>
                <p className="text-gray-300 text-lg leading-relaxed">
                  My approach combines technical expertise with creative problem-solving to deliver
                  solutions that not only work flawlessly but also provide an exceptional user experience.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="skills" className="py-20 px-8 bg-gray-800">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-12">Skills</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {skills.map((skill, index) => (
                <div key={index} className="bg-gray-900 p-6 rounded-lg">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-xl font-semibold">{skill.name}</h3>
                    <span className="text-sm text-gray-400">{skill.category}</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2.5">
                    <div
                      className="bg-blue-500 h-2.5 rounded-full transition-all duration-500"
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="projects" className="py-20">
          <div className="max-w-6xl mx-auto px-8 mb-8">
            <h2 className="text-3xl font-bold mb-4">Projects</h2>
            <p className="text-gray-400 text-lg">Explore my latest work and creative endeavors</p>
          </div>
          
          <div className="relative">
            <button 
              onClick={() => scrollProjects('left')}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 bg-gray-800/90 hover:bg-gray-700 rounded-full backdrop-blur-sm transition-colors"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            
            <button 
              onClick={() => scrollProjects('right')}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 bg-gray-800/90 hover:bg-gray-700 rounded-full backdrop-blur-sm transition-colors"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            <div 
              ref={projectsRef}
              className="flex overflow-x-auto scrollbar-hide snap-x snap-mandatory gap-6 px-8 pb-8"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="flex-none w-[400px] snap-center group"
                >
                  <div className="bg-gray-800 rounded-xl overflow-hidden h-full transition-transform duration-300 group-hover:-translate-y-2">
                    <div className="relative h-48">
                      <img 
                        src={project.image} 
                        alt={project.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 to-transparent" />
                      <div className="absolute bottom-4 left-4 flex items-center gap-2">
                        <div className="p-2 bg-gray-900/50 backdrop-blur-sm rounded-lg">
                          {project.icon}
                        </div>
                        <span className="text-sm font-medium bg-gray-900/50 backdrop-blur-sm px-3 py-1 rounded-full">
                          {project.category}
                        </span>
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-2 group-hover:text-blue-400 transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-gray-400 mb-4">
                        {project.description}
                      </p>
                      <div className="flex items-center gap-4">
                        <a
                          href="#"
                          className="flex items-center gap-2 text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors"
                        >
                          View Project <ArrowRight className="w-4 h-4" />
                        </a>
                        <a
                          href="#"
                          className="flex items-center gap-2 text-sm font-medium text-gray-400 hover:text-gray-300 transition-colors"
                        >
                          Source Code <Github className="w-4 h-4" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="py-20 px-8 bg-gray-800">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-12">Get in Touch</h2>
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-xl font-semibold mb-4">Contact Information</h3>
                <div className="space-y-4">
                  <a href="mailto:contact@example.com" className="flex items-center gap-3 text-gray-300 hover:text-white">
                    <Mail className="w-5 h-5" />
                    <span>contact@example.com</span>
                  </a>
                  <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-gray-300 hover:text-white">
                    <Github className="w-5 h-5" />
                    <span>GitHub Profile</span>
                  </a>
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-gray-300 hover:text-white">
                    <Linkedin className="w-5 h-5" />
                    <span>LinkedIn Profile</span>
                  </a>
                </div>
              </div>
              <form className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">Name</label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 text-white"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">Email</label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 text-white"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">Message</label>
                  <textarea
                    id="message"
                    rows={4}
                    className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 text-white"
                    placeholder="Your message"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </section>

        <footer className="bg-gray-900 border-t border-gray-800">
          <div className="max-w-6xl mx-auto px-8 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="text-gray-400 text-sm">
                © {new Date().getFullYear()} IMDevArt. All rights reserved.
              </div>
              <div className="flex items-center gap-4">
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <Github className="w-5 h-5" />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href="mailto:contact@example.com"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <Mail className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;