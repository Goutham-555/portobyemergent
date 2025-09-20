import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FiDownload, FiExternalLink, FiLinkedin, FiMail, FiGithub } from 'react-icons/fi';
import { useInView } from 'react-intersection-observer';
import Typed from 'react-typed';

const Hero = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const [personalInfo, setPersonalInfo] = useState(null);

  useEffect(() => {
    const fetchPersonalInfo = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/personal-info`);
        const data = await response.json();
        setPersonalInfo(data);
      } catch (error) {
        console.error('Error fetching personal info:', error);
        // Fallback data
        setPersonalInfo({
          name: "B.Goutham",
          title: "BCA Student & Technology Enthusiast | KL University",
          summary: "I am a dedicated second-year Bachelor of Computer Applications student at KL University with a passion for emerging technologies and hands-on problem-solving.",
          email: "gurugoutham05@gmail.com",
          linkedin: "https://www.linkedin.com/in/b-goutham-251726326",
          location: "KL University, India"
        });
      }
    };

    fetchPersonalInfo();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
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

  if (!personalInfo) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-dark-400">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-hero-pattern opacity-5"></div>
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary-500 rounded-full opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="container-custom relative z-10"
      >
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <div className="space-y-8">
            <motion.div variants={itemVariants} className="space-y-4">
              <motion.p
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="text-primary-400 font-medium text-lg tracking-wide"
              >
                Hello, I'm
              </motion.p>
              
              <motion.h1
                variants={itemVariants}
                className="text-5xl md:text-7xl font-bold leading-tight"
              >
                <span className="animated-gradient">{personalInfo.name}</span>
              </motion.h1>
              
              <div className="text-xl md:text-2xl text-dark-300 h-16">
                <Typed
                  strings={[
                    personalInfo.title,
                    "Problem Solver",
                    "Technology Enthusiast",
                    "Future Software Developer"
                  ]}
                  typeSpeed={50}
                  backSpeed={30}
                  backDelay={1500}
                  loop
                  className="font-medium"
                />
              </div>
            </motion.div>

            <motion.p
              variants={itemVariants}
              className="text-lg text-dark-300 leading-relaxed max-w-2xl"
            >
              {personalInfo.summary}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-primary-600 to-primary-500 text-white font-semibold rounded-lg shadow-lg hover:shadow-primary-500/25 transition-all duration-300 flex items-center justify-center space-x-2 group"
              >
                <FiDownload className="w-5 h-5 group-hover:animate-bounce" />
                <span>Download Resume</span>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 border-2 border-primary-500 text-primary-400 font-semibold rounded-lg hover:bg-primary-500 hover:text-white transition-all duration-300 flex items-center justify-center space-x-2 group"
              >
                <FiExternalLink className="w-5 h-5 group-hover:rotate-45 transition-transform duration-300" />
                <span>View Projects</span>
              </motion.button>
            </motion.div>

            {/* Social Links */}
            <motion.div
              variants={itemVariants}
              className="flex items-center space-x-6 pt-4"
            >
              <p className="text-dark-400 text-sm">Connect with me:</p>
              <div className="flex space-x-4">
                <motion.a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-3 bg-white/5 border border-white/10 rounded-lg hover:bg-primary-500/20 hover:border-primary-500/30 transition-all duration-300 group"
                >
                  <FiLinkedin className="w-5 h-5 text-primary-400 group-hover:text-primary-300" />
                </motion.a>
                
                <motion.a
                  href={`mailto:${personalInfo.email}`}
                  whileHover={{ scale: 1.2, rotate: -5 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-3 bg-white/5 border border-white/10 rounded-lg hover:bg-accent-500/20 hover:border-accent-500/30 transition-all duration-300 group"
                >
                  <FiMail className="w-5 h-5 text-accent-400 group-hover:text-accent-300" />
                </motion.a>
                
                <motion.a
                  href="#"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-3 bg-white/5 border border-white/10 rounded-lg hover:bg-dark-500/20 hover:border-dark-500/30 transition-all duration-300 group"
                >
                  <FiGithub className="w-5 h-5 text-dark-300 group-hover:text-white" />
                </motion.a>
              </div>
            </motion.div>
          </div>

          {/* Right Column - Visual Element */}
          <motion.div
            variants={itemVariants}
            className="relative flex items-center justify-center"
          >
            <div className="relative">
              {/* Animated Circles */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 w-80 h-80 border border-primary-500/20 rounded-full"
              ></motion.div>
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="absolute inset-4 w-72 h-72 border border-accent-500/20 rounded-full"
              ></motion.div>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="absolute inset-8 w-64 h-64 border border-primary-400/30 rounded-full"
              ></motion.div>
              
              {/* Center Content */}
              <div className="relative w-80 h-80 flex items-center justify-center">
                <motion.div
                  animate={{ y: [-10, 10, -10] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="text-center space-y-4"
                >
                  <div className="w-32 h-32 mx-auto bg-gradient-to-r from-primary-500 to-accent-500 rounded-full flex items-center justify-center text-4xl font-bold text-white shadow-2xl">
                    BG
                  </div>
                  <div className="space-y-2">
                    <p className="text-primary-400 font-semibold">Student Developer</p>
                    <p className="text-dark-400 text-sm">Building the Future</p>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="flex flex-col items-center space-y-2 text-dark-400"
          >
            <span className="text-sm">Scroll to explore</span>
            <div className="w-6 h-10 border-2 border-dark-400 rounded-full flex justify-center">
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-1 h-3 bg-primary-500 rounded-full mt-2"
              />
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;