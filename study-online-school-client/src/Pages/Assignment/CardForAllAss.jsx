import { AiOutlineEye } from "react-icons/ai";
import { BsPencilSquare } from "react-icons/bs/";
import { Link } from "react-router-dom";

const CardForAllAss = ({ assignment }) => {
  const { _id, title, description, marks, photo, level } = assignment || {};
  return (
    <div className="card  bg-base-100 shadow-xl">
      <figure>
        <img className="h-72 w-full object-cover" src={photo} alt={title} />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          {title}
          <div
            className={
              level === "easy"
                ? "badge badge-success"
                : level === "medium"
                ? "badge badge-info"
                : "badge badge-warning"
            }
          >
            {level}
          </div>
        </h2>
        <p className="text-stGray">{description}</p>
        <div className="flex justify-between w-full">
          <span className="font-semibold">Marks: {marks}</span>
        </div>

        <div className="flex justify-between">
          <Link to={`/view-assignment/${_id}`}>
            <button className="btn bg-stPrimary text-white hover:text-stBlack">
              View <AiOutlineEye />
            </button>
          </Link>

          <Link to={`/update-assignment/${_id}`}>
            <button className="btn bg-stSecondary text-white hover:text-stBlack">
              <BsPencilSquare /> Update
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CardForAllAss;
