import { CREATE_USER_FAILURE, CREATE_USER_REQUEST, CREATE_USER_SUCCESS, DELETE_SINGLE_USER_FAIL, DELETE_SINGLE_USER_REQ, DELETE_SINGLE_USER_SUCC, GET_ALL_USERS_FAIL, GET_ALL_USERS_REQ, GET_ALL_USERS_SUCC, GET_SINGLE_USER_FAIL, GET_SINGLE_USER_REQ, GET_SINGLE_USER_SUCC, UPDATE_FORM_DATA, UPDATE_SINGLE_USER_FAIL, UPDATE_SINGLE_USER_REQ, UPDATE_SINGLE_USER_SUCC } from "./users.action";

export const USERS_FEATURE_KEY = 'users';

let initialState = {
    loading : false,
    allUsers: [],
    selectedUser: {},
    errorMsg : ''
}

export const usersReducer = (state = initialState, action) => {
    let { type, payload } = action;
    switch (type) {
        case CREATE_USER_REQUEST:
            return {
                ...state,
                loading : true
            }
        case CREATE_USER_SUCCESS:
            return {
                ...state,
                loading: false
            }
        case CREATE_USER_FAILURE:
            return {
                ...state,
                loading: false,
                errorMsg : payload
            }
        case GET_ALL_USERS_REQ:
            return {
                ...state,
            }
        case GET_ALL_USERS_SUCC:
            return {
                ...state,
                loading: false,
                allUsers : payload
            }
        case GET_ALL_USERS_FAIL:
            return {
                ...state,
                loading: false,
                allUsers: [],
                errorMsg : payload
            }
        case GET_SINGLE_USER_REQ:
            return {
                ...state,
                loading : true
            }
        case GET_SINGLE_USER_SUCC:
            return {
                ...state,
                loading: false,
                selectedUser : payload
            }
        case GET_SINGLE_USER_FAIL:
            return {
                ...state,
                loading: false,
                errorMsg : payload
            }
        case UPDATE_SINGLE_USER_REQ:
            return {
                ...state,
                loading : true
            }
        case UPDATE_SINGLE_USER_SUCC:
            return {
                ...state,
                loading : false
            }
        case UPDATE_SINGLE_USER_FAIL:
            return {
                ...state,
                loading: false,
                errorMsg : payload
            }
        case DELETE_SINGLE_USER_REQ:
            return {
                ...state,
                loading: true
            }
        case DELETE_SINGLE_USER_SUCC:
            return {
                ...state,
                loading : false
            }
        case DELETE_SINGLE_USER_FAIL:
            return {
                ...state,
                errorMsg : payload
            }
        default : return state
    }
}