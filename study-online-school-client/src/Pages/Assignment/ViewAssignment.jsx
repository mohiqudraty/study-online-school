import moment from "moment";
import { useLoaderData, useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import Loader from "../../Components/Loader/Loader";
import { Helmet } from "react-helmet-async";

const ViewAssignment = () => {
  const { user: authUser } = useAuth();
  const assignment = useLoaderData();
  const navigate = useNavigate();
  const { title, description, marks, photo, level, dueDate, user } =
    assignment || {};
  //  Convert date from ISO 8601 to Date object using Moment.js
  assignment.date = moment(dueDate).toDate().toDateString();
  // console.log(assignment.date);

  const queryClient = useQueryClient();
  const {
    mutate: submitAssignment,
    isError,
    error,
    isLoading,
  } = useMutation({
    mutationFn: (assignment) => {
      return axios.post(
        "https://study-online-school-server.vercel.app/api/v1/submit-assignment",
        assignment
      );
    },
    onSuccess: () => {
      toast.success("Assignment Submitted Successfully");
      queryClient.invalidateQueries(" submitAssignment");
      navigate("/submitted-assignment");
    },
    onError: (error) => {
      // An error happened!
      toast.error(error.message);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const pdf = form.pdf.value;
    const note = form.note.value;

    const assignment = {
      pdf,
      note,
      user: authUser,
      email: authUser.email,
      status: "pending",
      title,
      marks,
    };
    console.log(assignment);
    submitAssignment(assignment);
  };

  if (isLoading) {
    <Loader></Loader>;
  }

  if (isError) {
    toast.error(error.message);
  }

  return (
    <div className="card lg:w-3/4 mx-auto p-5  bg-base-100 shadow-xl">
      <Helmet>
        <title>Study Online || View Details</title>
      </Helmet>
      <figure>
        <img className="h-96 w-full object-cover " src={photo} alt="Shoes" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{title} </h2>
        <div>
          <p
            className={
              level === "easy"
                ? "badge badge-success"
                : level === "medium"
                ? "badge badge-info"
                : "badge badge-warning"
            }
          >
            {level}
          </p>{" "}
          <p>{description}</p>
        </div>
        <div>
          <p>Created at: {dueDate && assignment.date}</p>
          <p>Creator Email: {user && user.email}</p>
          <p className="font-semibold">Total Marks: {marks}</p>
        </div>
        {/* Open the modal using document.getElementById('ID').showModal() method */}
        <button
          className="btn  bg-stSecondary  text-white hover:bg-stPrimary"
          onClick={() => document.getElementById("my_modal_5").showModal()}
        >
          Take Assignment
        </button>
        <dialog
          id="my_modal_5"
          className="modal modal-bottom px-4 sm:modal-middle"
        >
          <div className="modal-box">
            <form onSubmit={handleSubmit}>
              <div className="text-center ">
                <h3 className="font-bold text-lg my-3">Assignment Pdf Link</h3>
                <textarea
                  type="text"
                  name="pdf"
                  placeholder="Put Your Pdf Link"
                  className="textarea textarea-success w-full "
                  required
                />
                <h3 className="font-bold text-lg my-3">Quick Note</h3>
                <textarea
                  type="text"
                  name="note"
                  placeholder="note something"
                  className="textarea textarea-success w-full "
                  required
                />
                <div className=" my-5">
                  <button
                    type="submit"
                    className="btn   bg-stSecondary  text-white hover:bg-stPrimary"
                  >
                    Take Assignment
                  </button>
                </div>
              </div>
            </form>
            <form className="">
              <div method="dialog">
                <button className="btn bg-red-400 block mx-auto">Cancel</button>
              </div>
            </form>
          </div>
        </dialog>
      </div>
    </div>
  );
};

export default ViewAssignment;
