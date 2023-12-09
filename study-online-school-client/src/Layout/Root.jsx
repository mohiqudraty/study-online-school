import { Outlet } from "react-router-dom";
import Header from "../Common/Header";
import Footer from "../Common/Footer";
import useAuth from "../Hooks/useAuth";
import Loader from "../Components/Loader/Loader";

const Root = () => {
  const { loading } = useAuth();

  if (loading) {
    return <Loader></Loader>;
  }

  return (
    <div className="font-poppins">
      <Header></Header>
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  );
};

export default Root;
