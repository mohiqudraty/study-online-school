import useAuth from "../Hooks/useAuth";
import { Navigate, useLocation } from "react-router-dom";
import Loader from "../Components/Loader/Loader";

const PrivetRoute = ({ children }) => {
  const { loading, user } = useAuth();
  const location = useLocation();

  // if loading then execute this loading -----
  if (loading) {
    return <Loader></Loader>;
  }

  // if user have then return the children ----
  if (user?.email) {
    return children;
  }

  //  if user not logged in then navigate to login page ----------
  return <Navigate to={"/login"} state={location.pathname} replace></Navigate>;
};

export default PrivetRoute;
