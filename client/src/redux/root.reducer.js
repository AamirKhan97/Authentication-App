import { combineReducers } from "redux";
import { authReducer, AUTH_FEATURE_KEY } from "./auth/auth.reducer";
import { usersReducer, USERS_FEATURE_KEY } from "./users/users.reducer";


let rootReducer = combineReducers({
  [AUTH_FEATURE_KEY]: authReducer,
  [USERS_FEATURE_KEY] : usersReducer
});
export { rootReducer };
