import axios from "axios";
import { AuthActionType } from "../action/AuthAction";

const authState = {
  isLoggedIn: false,
  user: {
    access_token: "",
    token_type: "",
    expires_in: 0,
  },
};

const getAuthState = () => {
  const auth = localStorage.getItem("auth");
  try {
    const parsedObj = JSON.parse(auth);
    const { expires_at, access_token } = parsedObj.user;
    if (new Date(expires_at) > new Date()) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;
      return parsedObj;
    }
    return authState;
  } catch (e) {
    return authState;
  }
};

const newAuth = getAuthState();

const authReducer = (state = newAuth, action) => {
  switch (action.type) {
    case AuthActionType.REGISTER_SUCCESS:
      const newAuthState = {
        isLoggedIn: true,
        user: action.payload,
      };
      localStorage.setItem("auth", JSON.stringify(newAuthState));
      return newAuthState;
    case AuthActionType.REGISTER_FAIL:
      return state;
    default:
      return state;
  }
};

console.log(getAuthState());
export default authReducer;
