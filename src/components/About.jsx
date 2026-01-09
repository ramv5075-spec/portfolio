import React from 'react';
import { motion } from 'framer-motion';
import SectionWrapper from '../hoc';
import style from './styles/about.module.css';
import { textVariant, fadeIn } from '../utils/motion';

const About = () => (
  <>
    <motion.h1 variants={textVariant()} className={style.title}>
      About Me
    </motion.h1>
    <div className={style.para}>
      <motion.p variants={fadeIn('', '', 0.5, 1)} className={style.text}>
        Hey there! I&apos;m
        {' '}
        <a
          href="https://www.linkedin.com/in/ramvasanth-mahendran-8a0507203/"
          target="_blank"
          className={style.link}
          rel="noreferrer"
        >
          Ramvasanth Mahendran (Ram),
        </a>
        {' '}
       a Full-Stack Developer and AI Engineer with a Master’s degree in Computer Science & Engineering from the University at Buffalo.
      </motion.p>
       <motion.p variants={fadeIn('', '', 1, 1)} className={style.text}>
        I recently completed my IT Internship at Hachette Book Group, where I built an AI-powered customer support chatbot by designing an end-to-end Retrieval-Augmented Generation (RAG) pipeline. My work involved connecting Oracle and Microsoft SQL Server databases, generating embeddings, integrating local Large Language Models (LLMs), and delivering secure, enterprise-grade AI solutions tailored for internal use.
      </motion.p>
      <motion.p variants={fadeIn('', '', 1, 1)} className={style.text}>
        With 5+ years of hands-on experience, I’ve worked across mobile applications, web platforms, cloud deployments, and AI-driven systems. My technical skill set spans React, Vue.js, React Native, Node.js, Spring Boot, AWS, along with strong expertise in machine learning, embeddings, and vector databases.
      </motion.p>
      {/* <motion.p variants={fadeIn('', '', 1, 1)} className={style.text}>
       With over 4 years of experience in full-stack development, I’ve built and deployed mobile apps, web platforms, and backend systems. My technical toolkit includes React, Vue.js, React Native, Node.js, Spring Boot, and AWS, along with expertise in machine learning, embeddings, and vector databases.
        {' '}
        <a
          href="https://github.com/Rhaegar121"
          target="_blank"
          className={style.link}
          rel="noreferrer"
        >
          {' '}
          2500+ contributions on GitHub
        </a>
        {' '}
        in just one year. My experience in the Students&apos; Union further sharpened my problem-solving and communication abilities.
      </motion.p> */}
      <motion.p variants={fadeIn('', '', 1, 1.25)} className={style.text}>
        I specialize in building at the intersection of full-stack engineering and artificial intelligence—combining scalable backend architectures, intuitive front-end experiences, and intelligent models to solve real-world problems. From optimizing business workflows to building secure AI systems and interactive data visualizations, I focus on creating solutions that are robust, efficient, and user-centric.
      </motion.p>
      <motion.p variants={fadeIn('', '', 1.5, 1)} className={style.text}>
        I’m currently seeking full-time opportunities where I can contribute as a Full-Stack Engineer, AI Engineer, or Software Engineer.
Feel free to explore my projects and resume—and let’s build something impactful together.
        {' '}
        <a
          href="https://drive.google.com/file/d/1-llREzHkJjQ964BguAaC2WtJWXIms1mW/view?usp=drive_link"
          target="_blank"
          className={style.link}
          rel="noreferrer"
        >
          Check out my resume
        </a>
        {' '}
        for more insights into my journey and qualifications.
      </motion.p>
    </div>
  </>
);

export default SectionWrapper(About, 'about', '');
