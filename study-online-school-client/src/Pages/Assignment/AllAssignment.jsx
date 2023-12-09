import CardForAllAss from "./CardForAllAss";
// import useAxios from "../../Hooks/useAxios";
import { useEffect, useState } from "react";
import Loader from "../../Components/Loader/Loader";
import toast from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../Hooks/useAxios";
import { Helmet } from "react-helmet-async";
const AllAssignment = () => {
  const instance = useAxios();
  const [level, setLevel] = useState("Assignment difficulty");

  const [assignmentsWithLevel, setAssignmentsWithLevel] = useState([]);

  // all assignment fetch by level------------
  const urlWithQuery = `/api/v1/all-assignment?level=${level}`;
  useEffect(() => {
    instance.get(urlWithQuery).then((res) => {
      setAssignmentsWithLevel(res?.data);
    });
  }, [instance, urlWithQuery, level]);

  // start fetch all assignment-----------
  const url = "/api/v1/all-assignment";
  const {
    data: assignments,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["all-assignment"],
    queryFn: async () => {
      const response = await instance.get(url);
      const data = await response?.data;
      return data;
    },
    retry: 3,
  });
  // end fetch all assignment-------------
  if (isLoading) return <Loader></Loader>;
  if (isError) return toast.error(error?.message);

  return (
    <div>
      <Helmet>
        <title>Study Online | All Assignment</title>
      </Helmet>
      <div className="text-center text-3xl md:text-4xl lg:5xl mt-5">
        <span className="border-b-4 font-bold text-stBlack">
          All Assignment
        </span>
      </div>
      {/* assignment difficulty Level  */}
      <div className=" w-52 text-center mx-auto mt-5 md:ml-auto md:pr-5">
        <label
          htmlFor="countries"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Sort By Level
        </label>
        <select
          onChange={(e) => setLevel(e.target.value)}
          id="countries"
          className=" cursor-pointer  focus:ring-stPrimary     dark:focus:ring-green-800-500 dark:focus:border-green-900-500 bg-green-50 border border-stGray text-stBlack dark:text-green-400 placeholder-green-700 dark:placeholder-green-500 text-sm rounded-lg focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-green-500"
        >
          <option disabled selected>
            Assignment difficulty
          </option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>
      {/* all assignment card  */}
      <div className="grid md:grid-cols-2  gap-10 px-10 my-10">
        {assignmentsWithLevel?.length
          ? assignmentsWithLevel?.map((assignment) => (
              <CardForAllAss
                key={assignment._id}
                assignment={assignment}
              ></CardForAllAss>
            ))
          : assignments?.map((assignment) => (
              <CardForAllAss
                key={assignment._id}
                assignment={assignment}
              ></CardForAllAss>
            ))}
      </div>
    </div>
  );
};

export default AllAssignment;
