import axios from "axios";
// import { useEffect } from "react";
// import useAuth from "./useAuth";
// import { useNavigate } from "react-router-dom";

const instance = axios.create({
  baseURL: "https://study-online-school-server.vercel.app",
  withCredentials: true,
});

const useAxios = () => {
  // const { logoutUser } = useAuth();
  // const navigate = useNavigate();
  // useEffect(() => {
  //   instance.interceptors?.response.use(
  //     (res) => {
  //       return res;
  //     },
  //     (error) => {
  //       console.log("error from inter", error.response);
  //       if (error.response?.status === 401 || error.response?.status === 403) {
  //         logoutUser()
  //           .then(() => {
  //             navigate("/login");
  //           })
  //           .catch((error) => console.log(error?.message));
  //       }
  //     }
  //   );
  // }, [logoutUser, navigate]);

  return instance;
};

export default useAxios;
