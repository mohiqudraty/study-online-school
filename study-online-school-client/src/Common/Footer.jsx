import { AiFillInstagram, AiFillTwitterCircle } from "react-icons/ai";
import { BsFacebook } from "react-icons/bs";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer border-t-2 footer-center p-10 bg-base-200 text-base-content rounded">
      <nav className="grid grid-flow-col gap-4">
        <a className="link link-hover">About us</a>
        <a className="link link-hover">Contact</a>
        <a className="link link-hover">Privacy Policy</a>
      </nav>
      <nav>
        <div className="grid grid-flow-col gap-4">
          <Link to={"https://www.instagram.com/"}>
            {" "}
            <AiFillInstagram className="h-8 w-8" />
          </Link>
          <Link to={"https://www.facebook.com/"}>
            {" "}
            <BsFacebook className="h-8 w-8" />
          </Link>
          <Link to={"https://twitter.com/"}>
            {" "}
            <AiFillTwitterCircle className="h-8 w-8" />
          </Link>
        </div>
      </nav>
      <aside>
        <p>
          Copyright © 2023 - All right reserved by{" "}
          <span className="text-stPrimary font-medium">Study Online Shool</span>
        </p>
      </aside>
    </footer>
  );
};

export default Footer;
