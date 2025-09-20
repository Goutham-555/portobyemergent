import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiCode, FiCloud, FiUsers, FiFileText, FiTrendingUp } from 'react-icons/fi';

const Skills = () => {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true
  });

  const [skills, setSkills] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/skills`);
        const data = await response.json();
        setSkills(data);
      } catch (error) {
        console.error('Error fetching skills:', error);
      }
    };

    fetchSkills();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
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

  const categoryIcons = {
    'Programming': FiCode,
    'Web Development': FiCode,
    'Database': FiFileText,
    'Networking': FiCloud,
    'Cloud': FiCloud,
    'AI/ML': FiCode,
    'Soft Skills': FiUsers,
    'Communication': FiFileText,
    'Core': FiTrendingUp
  };

  const categories = ['All', ...Array.from(new Set(skills.map(skill => skill.category)))];
  
  const filteredSkills = activeCategory === 'All' 
    ? skills 
    : skills.filter(skill => skill.category === activeCategory);

  const getSkillLevel = (level) => {
    switch(level.toLowerCase()) {
      case 'beginner': return 25;
      case 'intermediate': return 60;
      case 'advanced': return 85;
      case 'expert': return 95;
      case 'foundation': return 40;
      default: return 50;
    }
  };

  const getSkillColor = (level) => {
    switch(level.toLowerCase()) {
      case 'beginner': return 'from-orange-500 to-red-500';
      case 'intermediate': return 'from-yellow-500 to-orange-500';
      case 'advanced': return 'from-green-500 to-blue-500';
      case 'expert': return 'from-blue-500 to-purple-500';
      case 'foundation': return 'from-primary-500 to-accent-500';
      default: return 'from-primary-500 to-accent-500';
    }
  };

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
            My <span className="gradient-text">Skills</span>
          </h2>
          <p className="text-xl text-dark-300 max-w-2xl mx-auto">
            Technical expertise and soft skills developed through academic study and practical experience
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <motion.button
              key={category}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                activeCategory === category
                  ? 'bg-gradient-to-r from-primary-500 to-accent-500 text-white shadow-lg'
                  : 'bg-white/5 border border-white/10 text-dark-300 hover:text-white hover:border-primary-500/50'
              }`}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* Skills Grid */}
        <motion.div 
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredSkills.map((skill, index) => {
            const IconComponent = categoryIcons[skill.category] || FiCode;
            const skillPercentage = getSkillLevel(skill.level);
            const skillColor = getSkillColor(skill.level);
            
            return (
              <motion.div
                key={`${skill.name}-${index}`}
                variants={itemVariants}
                whileHover={{ scale: 1.02, y: -5 }}
                className="p-6 bg-gradient-to-br from-white/5 to-white/10 border border-white/10 rounded-xl hover:border-primary-500/30 transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-gradient-to-r from-primary-500/20 to-accent-500/20 rounded-lg">
                      <IconComponent className="w-5 h-5 text-primary-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">{skill.name}</h3>
                      <p className="text-sm text-dark-400">{skill.category}</p>
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${skillColor} text-white`}>
                    {skill.level}
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="relative">
                  <div className="w-full bg-dark-700 rounded-full h-2 mb-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={inView ? { width: `${skillPercentage}%` } : { width: 0 }}
                      transition={{ delay: 0.5 + index * 0.1, duration: 1, ease: "easeOut" }}
                      className={`h-2 rounded-full bg-gradient-to-r ${skillColor} relative overflow-hidden`}
                    >
                      <motion.div
                        animate={{ x: ['-100%', '100%'] }}
                        transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                      />
                    </motion.div>
                  </div>
                  <div className="flex justify-between text-xs text-dark-400">
                    <span>{skill.category}</span>
                    <span>{skillPercentage}%</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Learning Journey */}
        <motion.div
          variants={itemVariants}
          className="mt-16 p-8 bg-gradient-to-r from-primary-500/10 to-accent-500/10 border border-primary-500/20 rounded-2xl"
        >
          <div className="text-center space-y-4">
            <h3 className="text-2xl font-bold text-white">Continuous Learning Journey</h3>
            <p className="text-dark-300 max-w-3xl mx-auto">
              I believe in the power of continuous learning and staying updated with the latest technologies. 
              My skill development is driven by hands-on projects, professional certifications, 
              and active participation in tech communities.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 mt-6">
              <div className="flex items-center space-x-2 px-4 py-2 bg-white/5 rounded-lg">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm text-white">Currently Learning</span>
              </div>
              <div className="flex items-center space-x-2 px-4 py-2 bg-white/5 rounded-lg">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="text-sm text-white">Certified</span>
              </div>
              <div className="flex items-center space-x-2 px-4 py-2 bg-white/5 rounded-lg">
                <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                <span className="text-sm text-white">Project Experience</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Skills Summary */}
        <motion.div
          variants={itemVariants}
          className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="text-center p-6 bg-white/5 border border-white/10 rounded-xl"
          >
            <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <FiCode className="w-8 h-8 text-white" />
            </div>
            <h4 className="text-xl font-semibold text-white mb-2">Technical Skills</h4>
            <p className="text-dark-300">Strong foundation in programming languages and development tools</p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="text-center p-6 bg-white/5 border border-white/10 rounded-xl"
          >
            <div className="w-16 h-16 bg-gradient-to-r from-accent-500 to-primary-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <FiUsers className="w-8 h-8 text-white" />
            </div>
            <h4 className="text-xl font-semibold text-white mb-2">Leadership</h4>
            <p className="text-dark-300">Experience in team coordination and volunteer management</p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="text-center p-6 bg-white/5 border border-white/10 rounded-xl"
          >
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <FiCode className="w-8 h-8 text-white" />
            </div>
            <h4 className="text-xl font-semibold text-white mb-2">Problem Solving</h4>
            <p className="text-dark-300">Analytical thinking and creative solution development</p>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Skills;