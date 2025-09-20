import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiGithub, FiExternalLink, FiFolder, FiPlus, FiCode, FiStar } from 'react-icons/fi';

const Projects = () => {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true
  });

  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/projects`);
        const data = await response.json();
        setProjects(data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    fetchProjects();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  // Featured placeholder projects to showcase skills
  const featuredProjects = [
    {
      id: '1',
      title: 'Smart India Hackathon Project',
      description: 'Led a winning team in developing an innovative solution for a real-world challenge. Showcased problem-solving abilities, teamwork, and technical implementation under pressure.',
      technologies: ['Problem Solving', 'Team Leadership', 'Innovation', 'Presentation'],
      status: 'Winner',
      category: 'Competition',
      impact: 'Successfully qualified for Smart India Hackathon finals'
    },
    {
      id: '2',
      title: 'IEEE Documentation System',
      description: 'Contributed to technical documentation projects as part of IEEE team. Developed skills in technical writing, documentation standards, and collaborative work processes.',
      technologies: ['Technical Writing', 'Documentation', 'Collaboration', 'IEEE Standards'],
      status: 'Ongoing',
      category: 'Professional',
      impact: 'Improved documentation quality and team efficiency'
    },
    {
      id: '3',
      title: 'C Programming Portfolio',
      description: 'Collection of C programming projects and assignments demonstrating proficiency in systems programming, algorithms, and problem-solving approaches.',
      technologies: ['C Programming', 'Data Structures', 'Algorithms', 'System Programming'],
      status: 'Completed',
      category: 'Academic',
      impact: 'Strong foundation in programming fundamentals'
    }
  ];

  const allProjects = [...projects, ...featuredProjects];

  return (
    <section className="py-20 bg-dark-900">
      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="container-custom"
      >
        {/* Section Header */}
        <motion.div variants={itemVariants} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            My <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-xl text-dark-300 max-w-2xl mx-auto">
            Showcase of academic projects, competition wins, and collaborative work that demonstrate my skills and growth
          </p>
        </motion.div>

        {allProjects.length > 0 ? (
          <motion.div variants={containerVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {allProjects.map((project, index) => (
              <motion.div
                key={project.id || index}
                variants={itemVariants}
                whileHover={{ scale: 1.03, y: -10 }}
                className="bg-gradient-to-br from-white/5 to-white/10 border border-white/10 rounded-xl p-6 hover:border-primary-500/30 transition-all duration-300 card-hover"
              >
                {/* Project Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-accent-500 rounded-lg flex items-center justify-center">
                      <FiFolder className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-1">
                        {project.title}
                      </h3>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          project.status === 'Winner' ? 'bg-yellow-500/20 text-yellow-400' :
                          project.status === 'Ongoing' ? 'bg-blue-500/20 text-blue-400' :
                          'bg-green-500/20 text-green-400'
                        }`}>
                          {project.status}
                        </span>
                        <span className="px-2 py-1 bg-primary-500/20 text-primary-400 rounded-full text-xs">
                          {project.category}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  {project.status === 'Winner' && (
                    <motion.div
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <FiStar className="w-5 h-5 text-yellow-400" />
                    </motion.div>
                  )}
                </div>

                {/* Project Description */}
                <p className="text-dark-300 text-sm mb-4 leading-relaxed">
                  {project.description}
                </p>

                {/* Impact */}
                {project.impact && (
                  <div className="mb-4 p-3 bg-accent-500/10 border border-accent-500/20 rounded-lg">
                    <p className="text-accent-400 text-sm font-medium">Impact:</p>
                    <p className="text-dark-300 text-xs">{project.impact}</p>
                  </div>
                )}

                {/* Technologies */}
                <div className="mb-6">
                  <p className="text-primary-400 text-sm font-medium mb-2">Technologies & Skills:</p>
                  <div className="flex flex-wrap gap-2">
                    {(project.technologies || []).map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-2 py-1 bg-primary-500/20 text-primary-300 rounded text-xs border border-primary-500/30"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Project Links */}
                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                  <div className="flex space-x-3">
                    {project.github_url && (
                      <motion.a
                        href={project.github_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-2 bg-white/5 border border-white/10 rounded-lg hover:border-primary-500/50 transition-colors"
                      >
                        <FiGithub className="w-4 h-4 text-primary-400" />
                      </motion.a>
                    )}
                    
                    {project.demo_url && (
                      <motion.a
                        href={project.demo_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-2 bg-white/5 border border-white/10 rounded-lg hover:border-accent-500/50 transition-colors"
                      >
                        <FiExternalLink className="w-4 h-4 text-accent-400" />
                      </motion.a>
                    )}
                  </div>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedProject(project)}
                    className="text-xs text-primary-400 hover:text-primary-300 font-medium flex items-center space-x-1"
                  >
                    <span>Learn More</span>
                    <FiExternalLink className="w-3 h-3" />
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          /* Empty State */
          <motion.div
            variants={itemVariants}
            className="text-center py-16"
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-24 h-24 bg-gradient-to-r from-primary-500/20 to-accent-500/20 border-2 border-dashed border-primary-500/30 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <FiPlus className="w-12 h-12 text-primary-400" />
            </motion.div>
            
            <h3 className="text-2xl font-bold text-white mb-4">Projects Coming Soon</h3>
            <p className="text-dark-300 max-w-md mx-auto mb-8">
              I'm currently working on exciting projects that will showcase my skills and creativity. 
              Stay tuned for updates on my latest work!
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              {['Web Development', 'AI/ML Projects', 'Mobile Apps', 'Open Source'].map((category, index) => (
                <motion.span
                  key={category}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="px-4 py-2 bg-gradient-to-r from-primary-500/20 to-accent-500/20 border border-primary-500/30 rounded-full text-sm text-primary-300"
                >
                  {category}
                </motion.span>
              ))}
            </div>
          </motion.div>
        )}

        {/* Call to Action */}
        <motion.div
          variants={itemVariants}
          className="mt-16 text-center p-8 bg-gradient-to-r from-primary-500/10 to-accent-500/10 border border-primary-500/20 rounded-2xl"
        >
          <FiCode className="w-12 h-12 text-primary-400 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-white mb-4">Interested in Collaboration?</h3>
          <p className="text-dark-300 max-w-2xl mx-auto mb-6">
            I'm always open to working on interesting projects and learning from experienced developers. 
            Whether it's a hackathon, open-source contribution, or innovative startup idea, let's connect!
          </p>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-3 bg-gradient-to-r from-primary-600 to-primary-500 text-white font-semibold rounded-lg shadow-lg hover:shadow-primary-500/25 transition-all duration-300"
          >
            Let's Connect
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Projects;