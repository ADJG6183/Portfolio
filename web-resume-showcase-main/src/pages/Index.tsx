
import React, { useEffect, useState } from 'react';
import { User, Briefcase, Code, Mail, Github, Linkedin, ExternalLink, Calendar, MapPin } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const Index = () => {
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'experience', 'skills', 'projects', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;
          
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

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const skills = [
    'JavaScript', 'React', 'TypeScript', 'Python', 'Node.js', 'SQL', 
    'MongoDB', 'PostgreSQL', 'Express.js', 'HTML5', 'CSS3', 'Tailwind CSS',
    'Git', 'Docker', 'AWS', 'REST APIs', 'GraphQL', 'Next.js'
  ];

  const experiences = [
    {
      title: 'Senior Software Developer',
      company: 'Tech Solutions Inc.',
      period: '2022 - Present',
      location: 'San Francisco, CA',
      description: 'Led development of scalable web applications using React and Node.js. Mentored junior developers and improved team productivity by 30%.',
      technologies: ['React', 'TypeScript', 'Node.js', 'PostgreSQL']
    },
    {
      title: 'Full Stack Developer',
      company: 'Digital Agency Co.',
      period: '2020 - 2022',
      location: 'New York, NY',
      description: 'Built responsive web applications and RESTful APIs. Collaborated with design teams to create seamless user experiences.',
      technologies: ['JavaScript', 'React', 'Express.js', 'MongoDB']
    },
    {
      title: 'Junior Developer',
      company: 'StartUp Hub',
      period: '2019 - 2020',
      location: 'Austin, TX',
      description: 'Developed front-end components and assisted in database design. Gained experience in agile development methodologies.',
      technologies: ['HTML', 'CSS', 'JavaScript', 'MySQL']
    }
  ];

  const projects = [
    {
      title: 'E-Commerce Platform',
      description: 'A full-stack e-commerce solution with real-time inventory management and payment processing.',
      image: '/placeholder.svg',
      technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      liveUrl: '#',
      githubUrl: '#'
    },
    {
      title: 'Task Management App',
      description: 'Collaborative project management tool with real-time updates and team communication features.',
      image: '/placeholder.svg',
      technologies: ['Next.js', 'PostgreSQL', 'Socket.io', 'Tailwind'],
      liveUrl: '#',
      githubUrl: '#'
    },
    {
      title: 'Data Visualization Dashboard',
      description: 'Interactive dashboard for analyzing business metrics with custom charts and reporting.',
      image: '/placeholder.svg',
      technologies: ['React', 'D3.js', 'Python', 'FastAPI'],
      liveUrl: '#',
      githubUrl: '#'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-md shadow-sm z-50 transition-all duration-300">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="text-2xl font-bold text-gray-900">Aaron Green</div>
            <div className="hidden md:flex space-x-8">
              {[
                { id: 'home', label: 'Home' },
                { id: 'about', label: 'About' },
                { id: 'experience', label: 'Experience' },
                { id: 'skills', label: 'Skills' },
                { id: 'projects', label: 'Projects' },
                { id: 'contact', label: 'Contact' }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                    activeSection === item.id
                      ? 'bg-gray-900 text-white font-medium'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center pt-20 px-6 relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full opacity-20 animate-float"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-gray-300 to-gray-400 rounded-full opacity-15 animate-float-delayed"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full opacity-10 animate-pulse-slow"></div>
        </div>

        <div className="text-center max-w-4xl mx-auto animate-fade-in relative z-10">
          <div className="mb-8">
            <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-gray-800 to-gray-900 rounded-full flex items-center justify-center shadow-2xl animate-bounce-subtle">
              <User size={48} className="text-white" />
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-4 tracking-tight">
              John <span className="text-gray-600">Developer</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 font-light">
              Full Stack Developer & Problem Solver
            </p>
          </div>
          
          <div className="flex justify-center space-x-6 mb-12">
            <a href="mailto:john@example.com" className="p-4 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 hover:bg-gray-50">
              <Mail size={24} className="text-gray-700" />
            </a>
            <a href="#" className="p-4 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 hover:bg-gray-50">
              <Github size={24} className="text-gray-700" />
            </a>
            <a href="#" className="p-4 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 hover:bg-gray-50">
              <Linkedin size={24} className="text-gray-700" />
            </a>
          </div>

          <button
            onClick={() => scrollToSection('about')}
            className="bg-gray-900 text-white px-8 py-4 rounded-full font-medium hover:bg-gray-800 transition-all duration-300 hover:scale-105 shadow-lg"
          >
            Explore My Work
          </button>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-6 bg-white">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">About Me</h2>
            <div className="w-24 h-1 bg-gray-900 mx-auto"></div>
          </div>
          
          <div className="bg-gray-50 rounded-2xl shadow-xl p-8 md:p-12 animate-fade-in border border-gray-100">
            <div className="prose prose-lg mx-auto text-gray-700">
              <p className="text-xl leading-relaxed mb-6">
                I'm a passionate full-stack developer with over 4 years of experience creating 
                digital solutions that make a difference. I specialize in modern web technologies 
                and love turning complex problems into simple, beautiful designs.
              </p>
              <p className="text-lg leading-relaxed mb-6">
                My journey in software development started with a curiosity about how things work 
                behind the scenes. Today, I build scalable applications that serve thousands of users 
                and mentor the next generation of developers.
              </p>
              <p className="text-lg leading-relaxed">
                When I'm not coding, you'll find me exploring new technologies, contributing to 
                open-source projects, or sharing knowledge through technical writing and speaking 
                at local meetups.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Timeline Section */}
      <section id="experience" className="py-20 px-6 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Work Experience</h2>
            <div className="w-24 h-1 bg-gray-900 mx-auto"></div>
          </div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gray-300 h-full hidden md:block"></div>
            
            {experiences.map((exp, index) => (
              <div key={index} className={`relative mb-12 ${index % 2 === 0 ? 'md:pr-1/2 md:text-right' : 'md:pl-1/2 md:ml-auto'} animate-slide-up`}>
                {/* Timeline Dot */}
                <div className="absolute top-6 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-gray-900 rounded-full border-4 border-white shadow-lg hidden md:block"></div>
                
                <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 border border-gray-100">
                  <div className="flex flex-col">
                    <div className="mb-4">
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">{exp.title}</h3>
                      <p className="text-xl text-gray-700 font-medium mb-2">{exp.company}</p>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-gray-600">
                        <span className="flex items-center">
                          <Calendar size={16} className="mr-2" />
                          {exp.period}
                        </span>
                        <span className="flex items-center">
                          <MapPin size={16} className="mr-2" />
                          {exp.location}
                        </span>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 mb-6 leading-relaxed">{exp.description}</p>
                    
                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech, techIndex) => (
                        <span key={techIndex} className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm font-medium">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Carousel Section */}
      <section id="skills" className="py-20 px-6 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Skills & Technologies</h2>
            <div className="w-24 h-1 bg-gray-900 mx-auto"></div>
          </div>

          <div className="bg-gray-50 rounded-2xl shadow-xl p-8 md:p-12 border border-gray-100">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center justify-center">
                <Code className="mr-3 text-gray-700" />
                Technical Skills
              </h3>
            </div>
            
            <Carousel className="w-full max-w-4xl mx-auto">
              <CarouselContent className="-ml-2 md:-ml-4">
                {skills.map((skill, index) => (
                  <CarouselItem key={index} className="pl-2 md:pl-4 basis-1/2 md:basis-1/3 lg:basis-1/4">
                    <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-all duration-300 hover:scale-105 border border-gray-200">
                      <div className="text-center">
                        <span className="text-gray-800 font-medium">{skill}</span>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="text-gray-700 hover:text-gray-900" />
              <CarouselNext className="text-gray-700 hover:text-gray-900" />
            </Carousel>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-6 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Projects</h2>
            <div className="w-24 h-1 bg-gray-900 mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105 border border-gray-100 group">
                <div className="aspect-video bg-gray-200 relative overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300"></div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{project.title}</h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.map((tech, techIndex) => (
                      <span key={techIndex} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm">
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex gap-3">
                    <Button variant="outline" size="sm" className="flex-1 border-gray-300 hover:bg-gray-50">
                      <ExternalLink size={16} className="mr-2" />
                      Live Demo
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1 border-gray-300 hover:bg-gray-50">
                      <Github size={16} className="mr-2" />
                      Code
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6 bg-white">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Get In Touch</h2>
            <div className="w-24 h-1 bg-gray-900 mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Let's Work Together</h3>
              <p className="text-gray-600 leading-relaxed mb-8">
                I'm always interested in new opportunities and exciting projects. 
                Whether you have a project in mind or just want to chat about technology, 
                feel free to reach out!
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center">
                  <Mail className="text-gray-700 mr-4" size={20} />
                  <span className="text-gray-700">john@example.com</span>
                </div>
                <div className="flex items-center">
                  <Github className="text-gray-700 mr-4" size={20} />
                  <span className="text-gray-700">github.com/johndeveloper</span>
                </div>
                <div className="flex items-center">
                  <Linkedin className="text-gray-700 mr-4" size={20} />
                  <span className="text-gray-700">linkedin.com/in/johndeveloper</span>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100">
              <form className="space-y-6">
                <div>
                  <Label htmlFor="name" className="text-gray-700">Name</Label>
                  <Input 
                    id="name" 
                    type="text" 
                    className="mt-2 border-gray-300 focus:border-gray-900"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <Label htmlFor="email" className="text-gray-700">Email</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    className="mt-2 border-gray-300 focus:border-gray-900"
                    placeholder="your.email@example.com"
                  />
                </div>
                <div>
                  <Label htmlFor="message" className="text-gray-700">Message</Label>
                  <Textarea 
                    id="message" 
                    className="mt-2 border-gray-300 focus:border-gray-900 min-h-[120px]"
                    placeholder="Tell me about your project..."
                  />
                </div>
                <Button className="w-full bg-gray-900 hover:bg-gray-800 text-white">
                  Send Message
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-6">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="flex justify-center space-x-6 mb-8">
            <a href="mailto:john@example.com" className="p-3 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors duration-300">
              <Mail size={24} />
            </a>
            <a href="#" className="p-3 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors duration-300">
              <Github size={24} />
            </a>
            <a href="#" className="p-3 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors duration-300">
              <Linkedin size={24} />
            </a>
          </div>
          
          <p className="text-gray-400">© 2024 John Developer. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
