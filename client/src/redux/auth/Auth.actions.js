import Axios from "axios";
import * as userutil from "../../util/setAuthToken";
import * as userAuth from "../../util/authUtil";

// LOGIN USER
export const LOGIN_USER_REQUEST = 'LOGIN_USER_REQUEST';
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const LOGIN_USER_FAILURE = 'LOGIN_USER_FAILURE';

//  GET USER DATEILS
export const GET_USER_INFO_REQUEST = 'GET_USER_INFO_REQUEST';
export const GET_USER_INFO_SUCCESS = 'GET_USER_INFO_SUCCESS';
export const GET_USER_INFO_FAILURE = 'GET_USER_INFO_FAILURE';

// LOGOUT USER
export const LOGOUT_USER = 'LOGOUT_USER'


export const loginUser = (user, navigate) => {
    return async (dispatch) => {
        try {
            dispatch({ type: LOGIN_USER_REQUEST });
            let dataUrl = "http://127.0.0.1:5000/user/login";
            let response = await Axios.post(dataUrl, user);
            dispatch({ type: LOGIN_USER_SUCCESS, payload: response.data });
            dispatch(fetchLoginUserDet());
            navigate('/', { replace: true });
            alert("Login Succesfull")
        }
        catch (error) {
            dispatch({ type: LOGIN_USER_FAILURE, payload: error });
        }
    }
};

// Get logged i user details
export const fetchLoginUserDet = () => {
    return async (dispatch) => {
        try {
            if (userAuth.isLoggedIn()) {
                let token = userAuth.getToken();
                userutil.setAuthToken(token)
            }
            dispatch({ type: GET_USER_INFO_REQUEST });
            let dataUrl = `http://127.0.0.1:5000/user/me`;
            let response = await Axios.get(dataUrl);
            dispatch({ type: GET_USER_INFO_SUCCESS, payload: response.data })
        }
        catch (error) {
            console.error(error);
            dispatch({ type: GET_USER_INFO_FAILURE, payload: { error: error } });
        }
    }
};

export const logoutUser = (navigate) => {
    return async (dispatch) => {
      try {
          dispatch({ type: LOGOUT_USER });
          alert("You have Been Logout")
        navigate('/login', {replace : true});
      }
      catch (error) {
        console.log(error)
      }
    }
}