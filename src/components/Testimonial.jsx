import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionWrapper from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";
import { testimonials } from "../constants";
import style from "./styles/testimonial.module.css";

const FLAGS = { "India": "🇮🇳", "London,UK": "🇬🇧", "South Africa": "🇿🇦", "Rwanda": "🇷🇼", "Macedonia": "🇲🇰" };

const Testimonial = () => {
  const [active, setActive] = useState(0);
  const [auto, setAuto] = useState(true);

  useEffect(() => {
    if (!auto) return;
    const t = setInterval(() => setActive((a) => (a + 1) % testimonials.length), 5000);
    return () => clearInterval(t);
  }, [auto]);

  const prev = () => { setAuto(false); setActive((a) => (a - 1 + testimonials.length) % testimonials.length); };
  const next = () => { setAuto(false); setActive((a) => (a + 1) % testimonials.length); };

  return (
    <>
      <motion.h1 variants={textVariant()} className={style.title}>Testimonials</motion.h1>
      <motion.p variants={fadeIn("","",0.1,0.5)} className={style.subtitle}>
        What colleagues say about working with me
      </motion.p>

      <div className={style.carousel}>
        {/* Big quote mark */}
        <div className={style.quote_mark}>&ldquo;</div>

        {/* Testimonial content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className={style.card}
          >
            <p className={style.text}>{testimonials[active].text}</p>

            <div className={style.author_row}>
              <div className={style.avatar}>
                {testimonials[active].name.charAt(0)}
              </div>
              <div className={style.author_info}>
                <span className={style.author_name}>{testimonials[active].name}</span>
                <span className={style.author_location}>
                  {FLAGS[testimonials[active].country] || "🌍"} {testimonials[active].country}
                </span>
              </div>
              <a
                href={testimonials[active].linkedIn}
                target="_blank"
                rel="noreferrer"
                className={style.li_btn}
                title="View LinkedIn"
              >
                in
              </a>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Controls */}
        <div className={style.controls}>
          <button className={style.arrow_btn} onClick={prev} aria-label="Previous">←</button>
          <div className={style.dots}>
            {testimonials.map((_, i) => (
              <button
                key={i}
                className={i === active ? style.dot_active : style.dot}
                onClick={() => { setAuto(false); setActive(i); }}
                aria-label={"Go to testimonial " + (i + 1)}
              />
            ))}
          </div>
          <button className={style.arrow_btn} onClick={next} aria-label="Next">→</button>
        </div>
      </div>
    </>
  );
};

export default SectionWrapper(Testimonial, "testimonial", "");
