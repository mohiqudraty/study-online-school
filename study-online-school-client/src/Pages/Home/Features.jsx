import { motion } from "framer-motion";
const Features = ({ feature }) => {
  const { title, description, img } = feature || {};
  return (
    <motion.div
      whileHover={{
        scale: 1.1,
        transition: { duration: 1.3 },
      }}
      className="card  bg-base-100 shadow-xl hover:border-b-4 hover:border-stSecondary"
    >
      <figure className="px-10 pt-10">
        <img
          src={img}
          alt="Shoes"
          className="rounded-xl h-40 w-full object-cover"
        />
      </figure>
      <div className="card-body items-center text-center">
        <h2 className="card-title">{title}</h2>
        <p>{description}</p>
      </div>
    </motion.div>
  );
};

export default Features;
