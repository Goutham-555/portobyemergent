import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiAward, FiStar, FiUsers, FiBookOpen, FiTarget } from 'react-icons/fi';

const Achievements = () => {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true
  });

  const [achievements, setAchievements] = useState([]);
  const [certifications, setCertifications] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [achievementsRes, certificationsRes] = await Promise.all([
          fetch(`${process.env.REACT_APP_BACKEND_URL}/api/achievements`),
          fetch(`${process.env.REACT_APP_BACKEND_URL}/api/certifications`)
        ]);
        
        const achievementsData = await achievementsRes.json();
        const certificationsData = await certificationsRes.json();
        
        setAchievements(achievementsData);
        setCertifications(certificationsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
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

  const getAchievementIcon = (title) => {
    if (title.toLowerCase().includes('hackathon')) return FiAward;
    if (title.toLowerCase().includes('acm')) return FiUsers;
    if (title.toLowerCase().includes('ieee')) return FiBookOpen;
    return FiAward;
  };

  return (
    <section className="py-20 bg-gradient-to-b from-dark-800 to-dark-900">
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
            <span className="gradient-text">Achievements</span> & Certifications
          </h2>
          <p className="text-xl text-dark-300 max-w-2xl mx-auto">
            Recognition and certifications that mark my journey in technology and leadership
          </p>
        </motion.div>

        {/* Achievements Grid */}
        <motion.div variants={itemVariants} className="mb-16">
          <h3 className="text-2xl font-bold text-white mb-8 flex items-center">
            <FiAward className="w-8 h-8 text-primary-400 mr-3" />
            Key Achievements
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {achievements.map((achievement, index) => {
              const IconComponent = getAchievementIcon(achievement.title);
              
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ scale: 1.03, y: -5 }}
                  className="p-6 bg-gradient-to-br from-white/5 to-white/10 border border-white/10 rounded-xl hover:border-primary-500/30 transition-all duration-300 card-hover"
                >
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-accent-500 rounded-lg flex items-center justify-center">
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-white mb-2">
                        {achievement.title}
                      </h4>
                      <p className="text-dark-300 text-sm mb-3 leading-relaxed">
                        {achievement.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-primary-400 font-medium bg-primary-500/20 px-2 py-1 rounded-full">
                          {achievement.date}
                        </span>
                        <motion.div
                          animate={{ rotate: [0, 10, -10, 0] }}
                          transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
                        >
                          <FiStar className="w-4 h-4 text-accent-400" />
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Certifications Section */}
        <motion.div variants={itemVariants}>
          <h3 className="text-2xl font-bold text-white mb-8 flex items-center">
            <FiBookOpen className="w-8 h-8 text-accent-400 mr-3" />
            Professional Certifications
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {certifications.map((cert, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                className="p-6 bg-gradient-to-r from-accent-500/10 to-primary-500/10 border border-accent-500/20 rounded-xl"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h4 className="text-xl font-semibold text-white mb-2">
                      {cert.name}
                    </h4>
                    <p className="text-accent-400 font-medium mb-1">
                      {cert.issuer}
                    </p>
                    <p className="text-sm text-dark-400 mb-3">
                      Issued: {cert.date}
                    </p>
                  </div>
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-gradient-to-r from-accent-500 to-primary-500 rounded-full flex items-center justify-center">
                      <FiAward className="w-8 h-8 text-white" />
                    </div>
                  </div>
                </div>
                
                <p className="text-dark-300 text-sm leading-relaxed">
                  {cert.description}
                </p>
                
                <div className="mt-4 pt-4 border-t border-white/10">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-xs text-green-400 font-medium">Verified Certificate</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Stats Overview */}
        <motion.div
          variants={itemVariants}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {[
            { icon: FiAward, label: 'Hackathon Wins', value: '1', color: 'from-yellow-500 to-orange-500' },
            { icon: FiAward, label: 'Certifications', value: '2+', color: 'from-blue-500 to-purple-500' },
            { icon: FiUsers, label: 'Organizations', value: '2', color: 'from-green-500 to-teal-500' },
            { icon: FiTarget, label: 'Years Active', value: '2+', color: 'from-pink-500 to-red-500' }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ scale: 0, opacity: 0 }}
              animate={inView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
              transition={{ delay: 0.5 + index * 0.1, type: "spring", stiffness: 100 }}
              whileHover={{ scale: 1.05 }}
              className="text-center p-6 bg-white/5 border border-white/10 rounded-xl hover:border-primary-500/30 transition-all duration-300"
            >
              <div className={`w-16 h-16 bg-gradient-to-r ${stat.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                <stat.icon className="w-8 h-8 text-white" />
              </div>
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
        </motion.div>

        {/* Future Goals */}
        <motion.div
          variants={itemVariants}
          className="mt-16 p-8 bg-gradient-to-r from-primary-500/10 to-accent-500/10 border border-primary-500/20 rounded-2xl"
        >
          <div className="text-center space-y-4">
            <FiTarget className="w-12 h-12 text-primary-400 mx-auto" />
            <h3 className="text-2xl font-bold text-white">Future Aspirations</h3>
            <p className="text-dark-300 max-w-3xl mx-auto leading-relaxed">
              Looking ahead, I aim to contribute to innovative projects in emerging technologies, 
              expand my leadership roles in tech communities, and build solutions that make a positive impact. 
              My goal is to bridge the gap between academic knowledge and real-world applications 
              while inspiring others in their technology journey.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 mt-6">
              {['Advanced AI/ML', 'Full-Stack Development', 'Tech Leadership', 'Open Source Contribution'].map((goal, index) => (
                <motion.span
                  key={goal}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                  transition={{ delay: 1 + index * 0.1 }}
                  className="px-4 py-2 bg-gradient-to-r from-primary-500/20 to-accent-500/20 border border-primary-500/30 rounded-full text-sm text-primary-300"
                >
                  {goal}
                </motion.span>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Achievements;