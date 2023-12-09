import { Link, useNavigate } from "react-router-dom";
import useAxios from "../../Hooks/useAxios";
import toast from "react-hot-toast";
import useAuth from "../../Hooks/useAuth";

const TableOfSubmitted = ({ ass }) => {
  const { user: examiner } = useAuth();
  const navigate = useNavigate();
  const instance = useAxios();
  const { _id, pdf, note, user, email, status, title, marks } = ass || {};
  console.log(ass);

  const handleGiveMark = (e) => {
    e.preventDefault();
    const form = e.target;
    const feedback = form.feedback.value;
    const getMark = form.getMark.value;

    // const date = form.date.value;
    console.log(feedback, getMark);

    const markAndStatus = {
      feedback,
      getMark,
      examiner: examiner,
      status: "success",
    };
    console.log(markAndStatus);

    instance
      .put(`/api/v1/submit-assignment/${_id}`, markAndStatus)
      .then((res) => {
        console.log(res.data);
        navigate("/submitted-assignment");
        if (res.data.modifiedCount > 0) {
          toast.success("Assignment Marking Successful");
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
        <td className="px-6 py-4">{marks}</td>
        <td className="px-6 py-4">{user && user.displayName}</td>
        <td className="px-6 py-4 ">
          <span className="py-1 px-2 rounded-lg text-white bg-orange-600">
            ⏳ {status}
          </span>
        </td>
        <td className="px-6 py-4">
          {/* Open the modal using document.getElementById('ID').showModal() method */}
          {examiner.email === email ? (
            <button
              title="You cannot give mark of your submitted assignment"
              className="py-1 px-2  rounded-md text-white hover:bg-stPrimary bg-stSecondary"
            >
              Submitted
            </button>
          ) : (
            <button
              className="py-1 px-2  rounded-md text-white hover:bg-stPrimary bg-stSecondary"
              onClick={() => document.getElementById("my_modal_5").showModal()}
            >
              ✔ Give Mark
            </button>
          )}
          <dialog
            id="my_modal_5"
            className="modal modal-bottom px-4 sm:modal-middle"
          >
            <div className="modal-box">
              <form onSubmit={handleGiveMark}>
                <div className="text-center ">
                  <h3 className="font-bold text-lg my-3">
                    Assignment Pdf / Doc
                  </h3>
                  <Link className="link text-stPrimary" to={pdf}>
                    Preview File
                  </Link>

                  <h3 className="font-bold text-lg my-3"> Examinee Note</h3>
                  <textarea
                    defaultValue={note}
                    type="text"
                    name="note"
                    className="textarea textarea-success w-full "
                    readOnly
                  />
                  <h3 className="font-bold text-lg my-3">Feedback</h3>
                  <textarea
                    type="text"
                    name="feedback"
                    placeholder="Give Assignment Feedback"
                    className="textarea textarea-success w-full "
                    required
                  />
                  <h3 className="font-bold text-lg my-3">Mark</h3>
                  <input
                    className="input input-success mt-3"
                    type="number"
                    name="getMark"
                    placeholder={`Give Mark Out of - ${marks}`}
                  />
                  <div className=" my-5">
                    <button
                      type="submit"
                      className="btn   bg-stSecondary  text-white hover:bg-stPrimary"
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </form>
              <form className="">
                <div>
                  <button className="btn bg-red-400 block mx-auto">
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </dialog>
        </td>
      </tr>
    </>
  );
};

export default TableOfSubmitted;
