import Axios from "axios";

// Create user
export const CREATE_USER_REQUEST = 'CREATE_USER_REQUEST';
export const CREATE_USER_SUCCESS = 'CREATE_USER_SUCCESS';
export const CREATE_USER_FAILURE = 'CREATE_USER_FAILURE';

// Get all users
export const GET_ALL_USERS_REQ = 'GET_ALL_USERS_REQ';
export const GET_ALL_USERS_SUCC = 'GET_ALL_USERS_SUCC';
export const GET_ALL_USERS_FAIL = 'GET_ALL_USERS_FAIL';

// GET Single user
export const GET_SINGLE_USER_REQ = 'GET_SINGLE_USER_REQ';
export const GET_SINGLE_USER_SUCC = 'GET_SINGLE_USER_SUCC';
export const GET_SINGLE_USER_FAIL = 'GET_SINGLE_USER_FAIL';

// Edit single user
export const UPDATE_SINGLE_USER_REQ = 'UPDATE_SINGLE_USER_REQ';
export const UPDATE_SINGLE_USER_SUCC = 'UPDATE_SINGLE_USER_SUCC';
export const UPDATE_SINGLE_USER_FAIL = 'UPDATE_SINGLE_USER_FAIL';
export const UPDATE_FORM_DATA = 'UPDATE_FORM_DATA';

// Delete a user
export const DELETE_SINGLE_USER_REQ = 'DELETE_SINGLE_USER_REQ';
export const DELETE_SINGLE_USER_SUCC = 'DELETE_SINGLE_USER_SUCC';
export const DELETE_SINGLE_USER_FAIL = 'DELETE_SINGLE_USER_FAIL';


export const createUser = (user, navigate) => {
    return async (dispatch) => {
        try {
            dispatch({ type: CREATE_USER_REQUEST });
            let dataUrl = 'http://127.0.0.1:5000/users/upload';
            let response = await Axios.post(dataUrl, user);
            dispatch({ type: CREATE_USER_SUCCESS, payload: response.data });
            navigate('/', { replace: true });
            alert("User Created Sucesfully")
        }
        catch (error) {
            dispatch({ type: CREATE_USER_FAILURE, payload: error });
        }
    }
};

export const getAllUsers = () => {
    return async (dispatch) => {
        try {
            dispatch({ type: GET_ALL_USERS_REQ });
            let dataUrl = "http://127.0.0.1:5000/users/all";
            let response = await Axios.get(dataUrl);
            dispatch({ type: GET_ALL_USERS_SUCC, payload: response.data })
        }
        catch (error) {
            dispatch({ type: GET_ALL_USERS_FAIL, payload: error });
        }
    }
};

export const getSingleuser = (userId) => {
    return async (dispatch) => {
        try {
            dispatch({ type: GET_SINGLE_USER_REQ });
            let dataUrl = `http://127.0.0.1:5000/users/user/${userId}`;
            let response = await Axios.get(dataUrl);
            dispatch({ type: GET_SINGLE_USER_SUCC, payload: response.data });
        }
        catch (error) {
            dispatch({ type: GET_SINGLE_USER_FAIL, payload: error });
        }
    }
}


export const editUser = (userId, selectedProduct, navigate) => {
    return async (dispatch) => {
        try {
            dispatch({ type: UPDATE_SINGLE_USER_REQ });
            let dataUrl = `http://127.0.0.1:5000/users/edit/${userId}`
            let response = await Axios.put(dataUrl, selectedProduct);
            dispatch({ type: UPDATE_SINGLE_USER_SUCC, payload: response.data });
            dispatch(getAllUsers());
            alert("User Edited Success");
            navigate('/', { replace: true })
        }
        catch (error) {
            dispatch({ type: UPDATE_SINGLE_USER_FAIL, payload: error })
        }
    }
};

export const deleteUser = (userId) => {
    return async (dispatch) => {
        try {
            dispatch({ type: DELETE_SINGLE_USER_REQ });
            let dataUrl = `http://127.0.0.1:5000/users/delete/${userId}`;
            let response = await Axios.delete(dataUrl);
            dispatch({ type: DELETE_SINGLE_USER_SUCC, payload: response.data });
            dispatch(getAllUsers());
            alert( "Selected User Deleted Success" );
        }
        catch (error) {
            dispatch({ type: DELETE_SINGLE_USER_FAIL, payload: error });
        }
    }
}