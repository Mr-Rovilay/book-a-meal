import { useContext } from "react";
import { UserContext } from "../router/Router";

const useAuth = () => {
  let { userAuth } = useContext(UserContext);
  return userAuth;
};

export default useAuth;
