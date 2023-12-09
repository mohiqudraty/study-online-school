import { useState } from "react";
import moment from "moment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useLoaderData, useNavigate } from "react-router-dom";
import useAxios from "../../Hooks/useAxios";
import toast from "react-hot-toast";
import { AiOutlineDelete } from "react-icons/ai";
import { BsPencilSquare } from "react-icons/bs";
import useAuth from "../../Hooks/useAuth";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";

const UpdateAssignment = () => {
  const [date, setDate] = useState(new Date());
  const formattedDate = moment(date).toISOString(); // Format to ISO 8601 format
  const instance = useAxios();
  const { user } = useAuth();
  const navigate = useNavigate();
  const assignment = useLoaderData();
  const {
    _id,
    title,
    description,
    marks,
    photo,
    user: creator,
    level,
    dueDate,
  } = assignment || {};

  // update assignment here -----------
  const handleUpdateAssignment = (e) => {
    e.preventDefault();
    const form = e.target;
    const title = form.title.value;
    const photo = form.photo.value;
    const description = form.description.value;
    const marks = form.marks.value;
    const level = form.level.value;
    // const date = form.date.value;
    console.log(title, photo, description, marks, level, dueDate);
    // console.log(authUser, user);
    if (creator?.email !== user?.email) {
      return toast.error(
        "👉You can not Update this assignment. only he/se can update  assignment \n who has created"
      );
    }
    const assignment = {
      title,
      photo,
      description,
      marks,
      level,
      dueDate: formattedDate,
      user: user,
    };
    console.log(assignment);

    instance.put(`/api/v1/all-assignment/${_id}`, assignment).then((res) => {
      console.log(res.data);
      if (res.data.modifiedCount > 0) {
        toast.success("Assignment Update Successful");
        navigate("/all-assignment");
      } else {
        toast.error("Not change Anything");
      }
    });
  };

  // delete assignment here ------------------------
  const handleDelete = () => {
    if (creator?.email !== user?.email) {
      return toast.error(
        "👉You can not Delete this assignment. only he/se can Delete  assignment \n who has created"
      );
    }
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        instance.delete(`/api/v1/all-assignment/${_id}`).then((res) => {
          console.log(res.data);
          if (res.data.deletedCount > 0) {
            Swal.fire({
              title: "Deleted!",
              text: "Your Assignment has been deleted.",
              icon: "success",
            });
            navigate("/all-assignment");
          }
        });
      }
    });
  };

  return (
    <div className="lg:mb-20">
      <Helmet>
        <title>Study Online || Update</title>
      </Helmet>
      <div className="text-center text-3xl md:text-4xl lg:5xl mt-5 ">
        <span className="border-b-4 font-bold text-stBlack">
          Update Assignment
        </span>
      </div>
      <form onSubmit={handleUpdateAssignment}>
        <div className="grid md:grid-cols-2 md:gap-6 my-10 p-5">
          {/* Title */}
          <div className="relative z-0 w-full mb-6 group">
            <input
              defaultValue={title}
              type="text"
              name="title"
              id="title"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-stPrimary peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="title"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-stPrimary peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Assignment Title
            </label>
          </div>
          {/* Photo Url */}
          <div className="relative z-0 w-full mb-6 group">
            <input
              defaultValue={photo}
              type="text"
              name="photo"
              id="photoUrl"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-stPrimary peer"
              placeholder=""
              required
            />
            <label
              htmlFor="photoUrl"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-stPrimary peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Image URL
            </label>
          </div>
          {/* Description */}
          <div className="relative z-0 w-full mb-6 group">
            <input
              defaultValue={description}
              type="text"
              name="description"
              id="description"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-stPrimary peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="description"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-stPrimary peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Description
            </label>
          </div>
          {/* Marks */}
          <div className="relative z-0 w-full mb-6 group">
            <input
              defaultValue={marks}
              type="number"
              name="marks"
              id="marks"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-stPrimary peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="marks"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-stPrimary peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Marks
            </label>
          </div>
          {/* level */}
          <div className="relative z-0 w-full mb-6 group">
            <select
              required
              defaultValue={level}
              name="level"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-stPrimary peer"
              id="level"
            >
              <option value=""></option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
            <label
              htmlFor="level"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-stPrimary peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Level (easy, medium, hard)
            </label>
          </div>
          {/* date  */}
          <div className="relative z-0 w-full mb-6 group">
            <div className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-stPrimary peer">
              <DatePicker
                minDate={new Date()}
                name="date"
                dateFormat="dd/MM/yyyy"
                className="outline-none"
                selected={date}
                onChange={(date) => setDate(date)}
              />
            </div>
            <label
              htmlFor="date"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-stPrimary peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Date
            </label>
          </div>
        </div>
        <div className="px-5 text-center">
          <button
            type="submit"
            className="text-white bg-stSecondary hover:bg-stPrimary focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-stPrimary dark:hover-bg-blue-700 dark:focus-ring-stPrimary"
          >
            <BsPencilSquare className="inline" /> Update Assignment
          </button>
        </div>
      </form>
      <div className="px-5 text-center my-5">
        <button
          onClick={handleDelete}
          className="text-white bg-red-500 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-red-700 dark:hover-bg-blue-700 dark:focus-ring-bg-red-700"
        >
          <AiOutlineDelete className="inline" /> Delete Assignment
        </button>
      </div>
    </div>
  );
};

export default UpdateAssignment;
