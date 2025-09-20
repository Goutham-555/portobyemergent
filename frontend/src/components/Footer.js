import React from 'react';
import { motion } from 'framer-motion';
import { FiHeart, FiLinkedin, FiMail, FiGithub, FiArrowUp, FiCode, FiStar } from 'react-icons/fi';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      icon: FiLinkedin,
      href: 'https://www.linkedin.com/in/b-goutham-251726326',
      label: 'LinkedIn',
      color: 'hover:text-blue-400'
    },
    {
      icon: FiMail,
      href: 'mailto:gurugoutham05@gmail.com',
      label: 'Email',
      color: 'hover:text-green-400'
    },
    {
      icon: FiGithub,
      href: '#',
      label: 'GitHub',
      color: 'hover:text-purple-400'
    }
  ];

  const quickLinks = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Achievements', href: '#achievements' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' }
  ];

  return (
    <footer className="bg-dark-900 border-t border-white/10">
      {/* Main Footer Content */}
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2 space-y-6">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="flex items-center space-x-3"
            >
              <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-accent-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">BG</span>
              </div>
              <div>
                <h3 className="text-2xl font-bold gradient-text">B.Goutham</h3>
                <p className="text-dark-400 text-sm">Technology Enthusiast & Student Developer</p>
              </div>
            </motion.div>
            
            <p className="text-dark-300 leading-relaxed max-w-md">
              Passionate BCA student at KL University, dedicated to learning emerging technologies 
              and building innovative solutions. Always excited to connect with fellow tech enthusiasts!
            </p>
            
            <div className="flex items-center space-x-4">
              <span className="text-dark-400 text-sm">Connect with me:</span>
              <div className="flex space-x-3">
                {socialLinks.map((link) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    target={link.href.startsWith('http') ? '_blank' : '_self'}
                    rel={link.href.startsWith('http') ? 'noopener noreferrer' : ''}
                    whileHover={{ scale: 1.2, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                    className={`p-2 bg-white/5 border border-white/10 rounded-lg text-dark-400 transition-all duration-300 ${link.color} hover:border-current`}
                  >
                    <link.icon className="w-4 h-4" />
                  </motion.a>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold text-white">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <motion.a
                    href={link.href}
                    whileHover={{ x: 5 }}
                    className="text-dark-300 hover:text-primary-400 transition-all duration-300 text-sm flex items-center space-x-2"
                  >
                    <span className="w-1 h-1 bg-primary-500 rounded-full"></span>
                    <span>{link.name}</span>
                  </motion.a>
                </li>
              ))}
            </ul>
          </div>

          {/* Status & Info */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold text-white">Current Status</h4>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <div>
                  <p className="text-white text-sm font-medium">Available for Projects</p>
                  <p className="text-dark-400 text-xs">Open to collaboration</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <FiCode className="w-4 h-4 text-primary-400" />
                <div>
                  <p className="text-white text-sm font-medium">Currently Learning</p>
                  <p className="text-dark-400 text-xs">Advanced Web Development</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <FiStar className="w-4 h-4 text-accent-400" />
                <div>
                  <p className="text-white text-sm font-medium">Goal 2025</p>
                  <p className="text-dark-400 text-xs">Full-Stack Proficiency</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 py-6">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            {/* Copyright */}
            <div className="flex items-center space-x-4 text-dark-400 text-sm">
              <p>© {currentYear} B.Goutham. All rights reserved.</p>
              <div className="flex items-center space-x-1">
                <span>Made with</span>
                <motion.div
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  <FiHeart className="w-4 h-4 text-red-500" />
                </motion.div>
                <span>and React</span>
              </div>
            </div>

            {/* Back to Top */}
            <motion.button
              onClick={scrollToTop}
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.9 }}
              className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-primary-500/20 to-accent-500/20 border border-primary-500/30 rounded-lg text-primary-400 hover:text-primary-300 transition-all duration-300 group"
            >
              <span className="text-sm">Back to top</span>
              <motion.div
                animate={{ y: [0, -2, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <FiArrowUp className="w-4 h-4" />
              </motion.div>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary-500 rounded-full opacity-10"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>
    </footer>
  );
};

export default Footer;