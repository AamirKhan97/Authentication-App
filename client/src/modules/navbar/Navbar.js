import React, { useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { AUTH_FEATURE_KEY } from "../../redux/auth/auth.reducer";
import { logoutUser } from "../../redux/auth/Auth.actions";

let Navbar = () => {
  let dispatch = useDispatch();

  let navigate = useNavigate();
  
  let location: useLocation();

  let userInfo = useSelector((state) => {
    return state[AUTH_FEATURE_KEY];
  });

  let { isAuthenticated, user } = userInfo;

  // let userInfo = useSelector((state) => {
  //     return state[USER_FEATURE_KEY];
  // })

  useEffect(() => {
    if (!localStorage.token) {
      logoutbtn();
      navigate("/login", replace={from: location });
    }
  }, []);
  // logoutbtn
  let logoutbtn = () => {
    // dispatch(logoutUser(navigate));
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    // navigate("/login", { replace: true });
  };

  let beforeLogin = (
    <React.Fragment>
      <li className="nav-item">
        <Link to="/login" className="nav-link brandLogo">
          Login
        </Link>
      </li>
    </React.Fragment>
  );

  let afterLogin = (
    <React.Fragment>
      <li className="nav-item">
        <Link onClick={logoutbtn} className="nav-link brandLogo">
          Logout
        </Link>
      </li>
    </React.Fragment>
  );

  return (
    <React.Fragment>
      <nav className="navbar navbar-dar bg-teal navbar-expand-sm">
        <div className="container">
          <Link to="/" className="navbar-brand brandLogo">
            <i className="fa fa-code"></i> Authentication App
          </Link>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav ml-auto">
              {isAuthenticated == true && user.isAdmin == true ? (
                <li className="nav-item">
                  <Link to="/createUser" className="nav-link brandLogo">
                    Create
                  </Link>
                </li>
              ) : null}
              {isAuthenticated ? afterLogin : beforeLogin}
            </ul>
          </div>
        </div>
      </nav>
    </React.Fragment>
  );
};

export default Navbar;
