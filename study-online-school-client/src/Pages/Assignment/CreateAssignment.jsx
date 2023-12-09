import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useAuth from "../../Hooks/useAuth";
import Loader from "../../Components/Loader/Loader";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { Helmet } from "react-helmet-async";

const CreateAssignment = () => {
  const [date, setDate] = useState(new Date());
  const formattedDate = moment(date).toISOString(); // Format to ISO 8601 format
  const { user } = useAuth();
  const navigate = useNavigate();

  const queryClient = useQueryClient();
  const {
    mutate: createAssignment,
    isError,
    error,
    isLoading,
  } = useMutation({
    mutationFn: (assignment) => {
      return axios.post(
        "https://study-online-school-server.vercel.app/api/v1/all-assignment",
        assignment
      );
    },
    onSuccess: () => {
      toast.success("Assignment Creation Successful");
      queryClient.invalidateQueries("createAssignment");
      navigate("/all-assignment");
    },
    onError: (error) => {
      // An error happened!
      toast.error(error.message);
    },
  });

  const handleCreateAssignment = (e) => {
    e.preventDefault();
    const form = e.target;
    const title = form.title.value;
    const photo = form.photo.value;
    const description = form.description.value;
    const marks = form.marks.value;
    const level = form.level.value;

    const assignment = {
      title,
      photo,
      description,
      marks,
      level,
      dueDate: formattedDate,
      user,
    };
    console.log(assignment);
    createAssignment(assignment);
  };

  if (isLoading) {
    <Loader></Loader>;
  }

  if (isError) {
    toast.error(error.message);
  }

  return (
    <div className="lg:mb-20">
      <Helmet>
        <title>Study Online || Create Assignment</title>
      </Helmet>
      <div className="text-center text-3xl md:text-4xl lg:5xl mt-5 ">
        <span className="border-b-4 font-bold text-stBlack">
          Create an Assignment
        </span>
      </div>
      <form onSubmit={handleCreateAssignment}>
        <div className="grid md:grid-cols-2 md:gap-6 my-10 p-5">
          {/* Title */}
          <div className="relative z-0 w-full mb-6 group">
            <input
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
        <div className="text-center px-5">
          <button
            type="submit"
            className="text-white bg-stSecondary hover:bg-stPrimary focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-stPrimary dark:hover-bg-blue-700 dark:focus-ring-stPrimary"
          >
            Create Assignment
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateAssignment;
