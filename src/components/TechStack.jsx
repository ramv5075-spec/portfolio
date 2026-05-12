import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionWrapper from '../hoc';
import { fadeIn, textVariant } from '../utils/motion';
import style from './styles/techstack.module.css';

const SKILLS = [
  {
    category: 'Languages',
    emoji: '💻',
    items: [
      { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
      { name: 'Java', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg' },
      { name: 'C++', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg' },
      { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
      { name: 'TypeScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
      { name: 'SQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
      { name: 'Bash', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bash/bash-original.svg' },
    ],
  },
  {
    category: 'AI / ML',
    emoji: '🧠',
    items: [
      { name: 'PyTorch', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg' },
      { name: 'TensorFlow', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg' },
      { name: 'LangChain', icon: 'https://cdn.simpleicons.org/langchain/00C4CC' },
      { name: 'FAISS', icon: 'https://cdn.simpleicons.org/meta/0467DF' },
      { name: 'LLMs', icon: 'https://cdn.simpleicons.org/openai/ffffff' },
      { name: 'RAG', icon: 'https://cdn.simpleicons.org/huggingface/FFD21E' },
      { name: 'MCP', icon: 'https://cdn.simpleicons.org/anthropic/ffffff' },
      { name: 'Mistral 7B', icon: 'https://cdn.simpleicons.org/mistral/FF7000' },
    ],
  },
  {
    category: 'Frontend',
    emoji: '🎨',
    items: [
      { name: 'React.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
      { name: 'Vue.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg' },
      { name: 'React Native', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
      { name: 'Angular', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg' },
      { name: 'TypeScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
      { name: 'HTML5', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
      { name: 'CSS3', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
    ],
  },
  {
    category: 'Backend',
    emoji: '⚙️',
    items: [
      { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
      { name: 'Express.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg' },
      { name: 'Spring Boot', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg' },
      { name: 'FastAPI', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg' },
      { name: 'GraphQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg' },
      { name: 'REST APIs', icon: 'https://cdn.simpleicons.org/postman/FF6C37' },
    ],
  },
  {
    category: 'Databases',
    emoji: '🗄️',
    items: [
      { name: 'PostgreSQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' },
      { name: 'MySQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
      { name: 'MongoDB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
      { name: 'Redis', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg' },
      { name: 'Oracle DB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/oracle/oracle-original.svg' },
      { name: 'DynamoDB', icon: 'https://cdn.simpleicons.org/amazondynamodb/4053D6' },
      { name: 'SQL Server', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/microsoftsqlserver/microsoftsqlserver-plain.svg' },
    ],
  },
  {
    category: 'Cloud & DevOps',
    emoji: '☁️',
    items: [
      { name: 'AWS', icon: 'https://cdn.simpleicons.org/amazonaws/FF9900' },
      { name: 'GCP', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg' },
      { name: 'Azure', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg' },
      { name: 'Docker', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
      { name: 'Kubernetes', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg' },
      { name: 'GitHub Actions', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg' },
      { name: 'GitLab CI/CD', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/gitlab/gitlab-original.svg' },
    ],
  },
  {
    category: 'Microsoft',
    emoji: '🔷',
    items: [
      { name: 'Azure', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg' },
      { name: 'Power Automate', icon: 'https://cdn.simpleicons.org/microsoftazure/0078D4' },
      { name: 'Power Apps', icon: 'https://cdn.simpleicons.org/microsoftazure/742774' },
      { name: 'Copilot Studio', icon: 'https://cdn.simpleicons.org/microsoftcopilot/0078D4' },
    ],
  },
  {
    category: 'Messaging & Testing',
    emoji: '📨',
    items: [
      { name: 'Kafka', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apachekafka/apachekafka-original.svg' },
      { name: 'RabbitMQ', icon: 'https://cdn.simpleicons.org/rabbitmq/FF6600' },
      { name: 'JUnit', icon: 'https://cdn.simpleicons.org/junit5/25A162' },
      { name: 'PyTest', icon: 'https://cdn.simpleicons.org/pytest/0A9EDC' },
    ],
  },
];

const FILTERS = ['All', 'Languages', 'AI / ML', 'Frontend', 'Backend', 'Databases', 'Cloud & DevOps', 'Microsoft', 'Messaging & Testing'];

const TechStack = () => {
  const [active, setActive] = useState('All');

  const filtered = active === 'All' ? SKILLS : SKILLS.filter((s) => s.category === active);
  const isSingle = filtered.length === 1;

  return (
    <>
      <motion.h1 variants={textVariant()} className={style.title}>
        Tech Stack
      </motion.h1>

      <motion.div variants={fadeIn('', '', 0.1, 0.5)} className={style.filters}>
        {FILTERS.map((f) => (
          <button
            key={f}
            className={f === active ? style.filter_active : style.filter_btn}
            onClick={() => setActive(f)}
          >
            {f}
          </button>
        ))}
      </motion.div>

      <AnimatePresence mode="wait">
        {isSingle ? (
          <motion.div
            key="single"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className={style.single_card}
          >
            <div className={style.single_header}>
              <span className={style.single_emoji}>{filtered[0].emoji}</span>
              <h3 className={style.single_category}>{filtered[0].category}</h3>
            </div>
            <div className={style.icon_grid}>
              {filtered[0].items.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.06 }}
                  className={style.icon_card}
                >
                  <img
                    src={item.icon}
                    alt={item.name}
                    className={style.icon_img}
                    onError={(e) => { e.target.style.display = 'none'; }}
                  />
                  <span className={style.icon_name}>{item.name}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className={style.grid}
          >
            {filtered.map((group, gi) => (
              <motion.div
                key={group.category}
                variants={fadeIn('up', '', gi * 0.08, 0.45)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
                className={style.card}
                onClick={() => setActive(group.category)}
              >
                <div className={style.card_header}>
                  <span className={style.emoji}>{group.emoji}</span>
                  <h3 className={style.category}>{group.category}</h3>
                  <span className={style.count}>{group.items.length}</span>
                </div>
                <div className={style.card_icons}>
                  {group.items.slice(0, 6).map((item, i) => (
                    <div key={i} className={style.mini_icon} title={item.name}>
                      <img
                        src={item.icon}
                        alt={item.name}
                        className={style.mini_img}
                        onError={(e) => { e.target.style.display = 'none'; }}
                      />
                    </div>
                  ))}
                  {group.items.length > 6 && (
                    <div className={style.mini_more}>+{group.items.length - 6}</div>
                  )}
                </div>
                <p className={style.click_hint}>Click to explore →</p>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default SectionWrapper(TechStack, 'techstack', '');
