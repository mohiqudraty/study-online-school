import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Banner = () => {
  return (
    <div
      className="hero min-h-screen container mx-auto"
      style={{
        backgroundImage: "url(https://i.ibb.co/JqbMRkq/banner.jpg)",
      }}
    >
      <div className="hero-overlay bg-opacity-80"></div>
      <div className="hero-content text-center text-neutral-content">
        <div className="max-w-3xl">
          <h1 className="mb-5 text-5xl font-bold">
            Welcome to Our <br /> Study Online School!
          </h1>
          <h1 className="mb-5 text-3xl font-bold">
            Empower Your Learning Journey
          </h1>
          <p className="mb-5">
            We Learn, We Grow, We Succeed 📚👫 Join the Community of Lifelong
            Learners!
          </p>
          <Link to={"all-assignment"}>
            <motion.button
              whileHover={{
                scale: 1.2,
                transition: { duration: 1.3 },
              }}
              className="btn bg-stSecondary  text-white hover:bg-stPrimary"
            >
              Explore All Assignment
            </motion.button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Banner;
