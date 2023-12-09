import { motion } from "framer-motion";

const Faq = ({ faq }) => {
  const { question, answer } = faq || {};
  return (
    <motion.div
      whileHover={{
        scale: 1.2,
        transition: { duration: 1.3 },
      }}
      className="collapse collapse-plus bg-base-200 border-x-4 border-stSecondary"
    >
      <input type="checkbox" />
      <div className="collapse-title text-xl font-medium">{question}</div>
      <div className="collapse-content">
        <p>{answer}</p>
      </div>
    </motion.div>
  );
};

export default Faq;
