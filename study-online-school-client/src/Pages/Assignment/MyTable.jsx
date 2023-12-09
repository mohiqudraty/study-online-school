import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { AiOutlineDelete } from "react-icons/ai";
import useAxios from "../../Hooks/useAxios";
import Swal from "sweetalert2";

const MyTable = ({ ass, myAssignment, setMyAssignment }) => {
  const instance = useAxios();

  const { _id, pdf, note, status, title, marks, examiner, feedback, getMark } =
    ass || {};
  //   console.log(Object.keys(ass).join(","));

  // delete assignment here ------------------------
  const handleDelete = () => {
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
        instance.delete(`/api/v1/delete-assignment?id=${_id}`).then((res) => {
          console.log(res.data);
          if (res.data.deletedCount > 0) {
            Swal.fire({
              title: "Deleted!",
              text: "Your Assignment has been deleted.",
              icon: "success",
            });
            // navigate("/all-assignment");
            const remaining = myAssignment.filter((ass) => ass._id !== _id);
            setMyAssignment(remaining);
          }
        });
      }
    });
  };

  return (
    <>
      <tr className="border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
        <th
          scope="row"
          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
        >
          {title}
        </th>
        <td className="px-6 py-4">
          {getMark ? getMark : "0"} / {marks}
        </td>
        <td className="px-6 py-4">{examiner && examiner.displayName}</td>
        <td className="px-6 py-4 ">
          <span
            className={
              status === "pending"
                ? "py-1 px-2 rounded-lg text-white bg-orange-600"
                : "py-1 px-2 rounded-lg text-white bg-green-600"
            }
          >
            <span>{status === "pending" ? "⏳" : "✔"}</span> {status}
          </span>
        </td>
        <td className="px-6 py-4">
          {/* Open the modal using document.getElementById('ID').showModal() method */}
          {status === "pending" ? (
            <button
              onClick={() => toast("Please Wait For Getting Mark")}
              className="py-1 px-2  rounded-md text-white hover:bg-amber-400 hover:text-black bg-amber-600"
            >
              Not Marked
            </button>
          ) : (
            <button
              className={
                "py-1 px-2  rounded-md text-white hover:bg-stPrimary bg-stSecondary"
              }
              onClick={() => document.getElementById("my_modal_5").showModal()}
            >
              View Result
            </button>
          )}
          <dialog
            id="my_modal_5"
            className="modal modal-bottom px-4 sm:modal-middle"
          >
            <div className="modal-box">
              <form>
                <div className="text-center ">
                  <h3 className="font-bold text-lg my-3">
                    Your Assignment Pdf / Doc
                  </h3>
                  <Link className="link text-stPrimary" to={pdf}>
                    Preview File
                  </Link>

                  <h3 className="font-bold text-lg my-3"> Your Note</h3>
                  <textarea
                    defaultValue={note}
                    type="text"
                    name="note"
                    className="textarea textarea-success w-full "
                    readOnly
                  />
                  <h3 className="font-bold text-lg my-3">Examiner Feedback</h3>
                  <textarea
                    type="text"
                    name="feedback"
                    defaultValue={feedback}
                    className="textarea textarea-success w-full "
                    readOnly
                  />
                  <h3 className="font-bold text-lg my-3">Mark</h3>
                  <input
                    className="input input-success mt-3"
                    type="number"
                    name="getMark"
                    placeholder={`Your Got ${getMark} Out of ${marks}`}
                    readOnly
                  />
                </div>
              </form>
              <form>
                <button className="btn bg-red-400 block mx-auto mt-4">
                  Close
                </button>
              </form>
            </div>
          </dialog>
        </td>
        <td className="px-6 py-4">
          <button
            onClick={handleDelete}
            className="py-1 px-2 flex  items-center justify-center rounded-md text-white hover:bg-red-800  bg-red-600"
          >
            <AiOutlineDelete className="w-10 -h-10 " /> Delete
          </button>
        </td>
      </tr>
    </>
  );
};

export default MyTable;
