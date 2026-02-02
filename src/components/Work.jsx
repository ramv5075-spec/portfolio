// import React, { useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import style from './styles/work.module.css';
// import SectionWrapper from '../hoc';
// import { projects } from '../constants';
// import { fadeIn, textVariant } from '../utils/motion';
// import Popup from './Popup';

// const Work = () => {
//   const [isOpen, setOpen] = useState(false);
//   const [selectedProject, setSelectedProject] = useState(null);

//   const handlePopupClick = (project) => {
//     setSelectedProject(project);
//     setOpen(true);
//   };

//   const handlePopupClose = () => {
//     setSelectedProject(null);
//     setOpen(false);
//   };

//   return (
//     <div className="relative">
//       <motion.h1 variants={textVariant()} className={style.title}>
//         My Recent Works
//       </motion.h1>
//       <div className={style.project_container}>
//         {/* Projects Card */}
//         {projects.map((project, index) => (
//           <motion.div
//             key={project.id}
//             variants={fadeIn('up', '', index * 0.4, 0.5)}
//             index={index}
//             className={style.card}
//           >
//             <img className={style.img} src={project.img} alt="project sample" loading="lazy" />
//             <div className={style.card_overlay}>
//               <div className={style.card_text}>
//                 <div className={style.text}>
//                   <h2 className={style.name}>{project.name}</h2>
//                   <p className={style.tech}>
//                     {project.tech.map((i) => (
//                       <span key={i} className={style.tech_list}>{`#${i}`}</span>
//                     ))}
//                   </p>
//                 </div>
//                 <button type="button" className={style.btn_container} onClick={() => handlePopupClick(project)}>
//                   <span className={style.btn_hover}>Learn more</span>
//                   <span className={style.btn}>Learn more</span>
//                 </button>
//               </div>
//             </div>
//           </motion.div>
//         ))}
//       </div>
//       {/* Popup Window */}
//       <AnimatePresence>
//         {isOpen && (
//           <Popup handleClose={handlePopupClose} project={selectedProject} />
//         )}
//       </AnimatePresence>
//     </div>
//   );
// };

// export default SectionWrapper(Work, 'work', 'my-8');


import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import style from './styles/work.module.css';
import SectionWrapper from '../hoc';
import { projects } from '../constants';
import { fadeIn, textVariant } from '../utils/motion';
import Popup from './Popup';

const Work = () => {
  const [isOpen, setOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  const handlePopupClick = (project) => {
    setSelectedProject(project);
    setOpen(true);
  };

  const handlePopupClose = () => {
    setSelectedProject(null);
    setOpen(false);
  };

  return (
    <div className="relative">
      <motion.h1 variants={textVariant()} className={style.title}>
        My Recent Works
      </motion.h1>

      <div className={style.project_container}>
        {projects.map((project, index) => (
          <motion.article
            key={project.id}
            variants={fadeIn('up', '', index * 0.06, 0.35)}
            className={style.card}
          >
            <div className={style.header}>
              <h2 className={style.name}>{project.name}</h2>
              <span className={style.badge}>Project</span>
            </div>

            <p className={style.desc}>{project.desc}</p>

            <div className={style.chips}>
              {project.tech?.slice(0, 6).map((t) => (
                <span key={t} className={style.chip}>{t}</span>
              ))}
            </div>

            <div className={style.divider} />

            <div className={style.actions}>
  <a
    className={style.linkBtn}
    href={project.source_link}
    target="_blank"
    rel="noreferrer"
  >
    {project.source_label || 'GitHub'}
  </a>

  {project.hasLive && (
    <a
      className={style.linkBtn}
      href={project.live_link}
      target="_blank"
      rel="noreferrer"
    >
      Live
    </a>
  )}
</div>

          </motion.article>
        ))}
      </div>

      <AnimatePresence>
        {isOpen && <Popup handleClose={handlePopupClose} project={selectedProject} />}
      </AnimatePresence>
    </div>
  );
};

export default SectionWrapper(Work, 'work', 'my-8');


