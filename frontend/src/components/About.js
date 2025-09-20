import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiUser, FiMapPin, FiMail, FiCalendar, FiBookOpen } from 'react-icons/fi';

const About = () => {
  const [ref, inView] = useInView({
    threshold: 0.3,
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
      }
    };

    fetchPersonalInfo();
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

  const stats = [
    { label: "Years of Study", value: "2+", icon: FiBookOpen },
    { label: "Certifications", value: "2", icon: FiUser },
    { label: "Organizations", value: "2", icon: FiMapPin },
    { label: "Hackathon Wins", value: "1", icon: FiCalendar },
  ];

  if (!personalInfo) {
    return (
      <div className="py-20">
        <div className="container-custom text-center">
          <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-dark-400">Loading about section...</p>
        </div>
      </div>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-b from-dark-900 to-dark-800">
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
            About <span className="gradient-text">Me</span>
          </h2>
          <p className="text-xl text-dark-300 max-w-2xl mx-auto">
            Passionate about technology and dedicated to continuous learning
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Content */}
          <motion.div variants={itemVariants} className="space-y-8">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-white mb-4">
                Professional Summary
              </h3>
              <p className="text-lg text-dark-300 leading-relaxed">
                {personalInfo.summary}
              </p>
              
              <div className="space-y-4">
                <h4 className="text-xl font-semibold text-primary-400">
                  Academic Excellence & Certifications
                </h4>
                <p className="text-dark-300 leading-relaxed">
                  Currently pursuing my BCA degree with focus on practical application of theoretical concepts. 
                  My academic journey is strengthened by industry-recognized certifications including Oracle OCI AI Foundation 
                  and Cisco Beginner-Level C Programming certificates.
                </p>
              </div>

              <div className="space-y-4">
                <h4 className="text-xl font-semibold text-accent-400">
                  Professional Memberships & Leadership
                </h4>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-dark-300">
                      <strong>ACM Student Member</strong> - Actively engaged in the global computing community
                    </p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-accent-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-dark-300">
                      <strong>IEEE Documentation Team Member</strong> - Contributing to technical documentation
                    </p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-dark-300">
                      <strong>Volunteer Coordinator</strong> - Demonstrating leadership in tech community
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-6">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="flex items-center space-x-3 p-4 bg-white/5 border border-white/10 rounded-lg"
              >
                <FiMail className="w-5 h-5 text-primary-400" />
                <div>
                  <p className="text-sm text-dark-400">Email</p>
                  <p className="text-white font-medium">{personalInfo.email}</p>
                </div>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="flex items-center space-x-3 p-4 bg-white/5 border border-white/10 rounded-lg"
              >
                <FiMapPin className="w-5 h-5 text-accent-400" />
                <div>
                  <p className="text-sm text-dark-400">Location</p>
                  <p className="text-white font-medium">{personalInfo.location}</p>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Column - Stats & Visual */}
          <motion.div variants={itemVariants} className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={inView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                  transition={{ delay: 0.5 + index * 0.1, type: "spring", stiffness: 100 }}
                  whileHover={{ scale: 1.05 }}
                  className="p-6 bg-gradient-to-br from-white/5 to-white/10 border border-white/10 rounded-xl text-center hover:border-primary-500/30 transition-all duration-300"
                >
                  <stat.icon className="w-8 h-8 text-primary-400 mx-auto mb-3" />
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={inView ? { scale: 1 } : { scale: 0 }}
                    transition={{ delay: 0.7 + index * 0.1, type: "spring", stiffness: 100 }}
                    className="text-3xl font-bold gradient-text mb-2"
                  >
                    {stat.value}
                  </motion.div>
                  <p className="text-sm text-dark-300 font-medium">{stat.label}</p>
                </motion.div>
              ))}
            </div>

            {/* Vision & Goals */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="p-6 bg-gradient-to-r from-primary-500/10 to-accent-500/10 border border-primary-500/20 rounded-xl"
            >
              <h4 className="text-xl font-semibold text-white mb-4 flex items-center">
                <span className="w-3 h-3 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full mr-3"></span>
                Vision & Goals
              </h4>
              <p className="text-dark-300 leading-relaxed">
                I am committed to building expertise in cutting-edge technologies while contributing meaningfully 
                to the tech community. My goal is to leverage my strong academic foundation, professional network, 
                and practical experience to create innovative solutions that address real-world challenges.
              </p>
            </motion.div>

            {/* Skills Preview */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="p-6 bg-white/5 border border-white/10 rounded-xl"
            >
              <h4 className="text-lg font-semibold text-white mb-4">Technical Foundation</h4>
              <div className="flex flex-wrap gap-2">
                {['C Programming', 'Cloud Computing', 'AI Foundations', 'Problem Solving', 'Team Leadership'].map((skill, index) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                    transition={{ delay: 1 + index * 0.1 }}
                    className="px-3 py-1 bg-gradient-to-r from-primary-500/20 to-accent-500/20 border border-primary-500/30 rounded-full text-sm text-primary-300"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Quote Section */}
        <motion.div
          variants={itemVariants}
          className="mt-16 text-center"
        >
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="max-w-4xl mx-auto p-8 bg-gradient-to-r from-dark-800 to-dark-700 border border-primary-500/20 rounded-2xl"
          >
            <blockquote className="text-xl md:text-2xl font-medium text-white italic mb-4">
              "The future belongs to those who combine technical excellence with creative problem-solving 
              and a passion for continuous learning."
            </blockquote>
            <cite className="text-primary-400 font-semibold">— B.Goutham</cite>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default About;