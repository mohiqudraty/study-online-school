import { useEffect, useState } from "react";
import useAxios from "../../Hooks/useAxios";

import useAuth from "../../Hooks/useAuth";
import MyTable from "./MyTable";
import { Helmet } from "react-helmet-async";

const MyAssignment = () => {
  const { user } = useAuth();
  const instance = useAxios();
  const [myAssignment, setMyAssignment] = useState([]);

  const url = `/api/v1/my-assignment?email=${user.email}`;
  useEffect(() => {
    instance.get(url).then((res) => {
      // console.log(res.data);
      setMyAssignment(res.data);
    });
  }, [url, instance]);

  return (
    <div className="relative overflow-x-auto container mx-auto my-8 min-h-[40vh] shadow-md sm:rounded-lg">
      <Helmet>
        <title>Study Online || My Assignment</title>
      </Helmet>
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Title
            </th>
            <th scope="col" className="px-6 py-3">
              Marks
            </th>
            <th scope="col" className="px-6 py-3">
              Examiner
            </th>

            <th scope="col" className="px-6 py-3">
              Status
            </th>
            <th scope="col" className="px-6 py-3">
              Give mark
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {myAssignment?.map((ass) => (
            <MyTable
              myAssignment={myAssignment}
              setMyAssignment={setMyAssignment}
              key={ass._id}
              ass={ass}
            ></MyTable>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyAssignment;
