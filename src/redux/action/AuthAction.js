import Axios from "axios";
import { Redirect } from "react-router";
const AuthActionType = {
  REGISTER_SUCCESS: "REGISTER_SUCCESS",
  REGISTER_FAIL: "REGISTER_FAIL",
};

const LoginAuthAction = (history, userState) => {
  return async (dispatch) => {
    try {
      const res = await Axios.post("/auth/login", userState);
      const { data } = res;
      dispatch({ type: AuthActionType.REGISTER_SUCCESS, payload: data });
      history.push("/main");
    } catch (e) {
      console.log(e);
      dispatch({ type: AuthActionType.REGISTER_FAIL, payload: {} });
    }
  };
};

export { AuthActionType, LoginAuthAction };
