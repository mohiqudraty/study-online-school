import { useEffect, useState } from "react";
import useAxios from "../../Hooks/useAxios";
import TableOfSubmitted from "./TableOfSubmitted";
import { Helmet } from "react-helmet-async";

const Submitted = () => {
  const instance = useAxios();

  const [pendingAss, SetPendingAss] = useState([]);

  const url = "/api/v1/submit-assignment?status=pending";
  useEffect(() => {
    instance.get(url).then((res) => {
      // console.log(res.data);
      SetPendingAss(res.data);
    });
  }, [url, instance]);

  return (
    <div className="relative overflow-x-auto container mx-auto min-h-[40vh] my-8 shadow-md sm:rounded-lg">
      <Helmet>
        <title>Study Online || Submitted Assignment</title>
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
              Examinee name
            </th>

            <th scope="col" className="px-6 py-3">
              Status
            </th>
            <th scope="col" className="px-6 py-3">
              Give mark
            </th>
          </tr>
        </thead>
        <tbody>
          {pendingAss?.map((ass) => (
            <TableOfSubmitted key={ass._id} ass={ass}></TableOfSubmitted>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Submitted;
