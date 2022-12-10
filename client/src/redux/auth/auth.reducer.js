import {
  GET_USER_INFO_FAILURE,
  GET_USER_INFO_REQUEST,
  GET_USER_INFO_SUCCESS,
  LOGIN_USER_FAILURE,
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGOUT_USER,
} from "./Auth.actions";

export const AUTH_FEATURE_KEY = "Auth";

let initialState = {
  loading: false,
  user: {},
  token: "",
  isAuthenticated: false,
  errorMsg: "",
};

export const authReducer = (state = initialState, action) => {
  let { type, payload } = action;
  switch (type) {
    // Login user
    case LOGIN_USER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case LOGIN_USER_SUCCESS:
      localStorage.setItem("token", payload.token);
      return {
        ...state,
        loading: false,
        token: payload.token,
        isAuthenticated: true,
      };
    case LOGIN_USER_FAILURE:
      localStorage.removeItem("token");
      return {
        ...state,
        loading: false,
        token: "",
        isAuthenticated: false,
        errorMsg: payload,
      };
    // Get user info
    case GET_USER_INFO_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_USER_INFO_SUCCESS:
      localStorage.setItem("user", JSON.stringify(payload));
      return {
        loading: false,
        user: payload,
        isAuthenticated: true,
      };
    case GET_USER_INFO_FAILURE:
      localStorage.removeItem("user");
      return {
        loading: false,
        user: {},
        isAuthenticated: false,
        errorMsg: payload.error,
      };
    case LOGOUT_USER:
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      return {
        ...state,
        loading: false,
        token: "",
        user: {},
        isAuthenticated: false,
      };
    default:
      return state;
  }
};
