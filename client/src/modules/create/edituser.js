import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  editUser,
  getSingleuser,
  updateFormData,
} from "../../redux/users/users.action";
import { USERS_FEATURE_KEY } from "../../redux/users/users.reducer";

const EditUser = () => {
  let [userId, setUserId] = useState(useParams().id);
  // usseffect for singlle user data ftch
  useEffect(() => {
    console.log(">>>>>>>>>>", userId);
    dispatch(getSingleuser(userId));
  }, []);

  let userInfo = useSelector((state) => {
    return state[USERS_FEATURE_KEY];
  });
  let { selectedUser } = userInfo;

  let [singleUser, setSingleUser] = useState({
    name: "",
    email: "",
    avatar: "",
    contact: "",
    password: "",
  });

  let navigate = useNavigate();

  let dispatch = useDispatch();

  //   let changeInput = (e) => {
  //     setSingleUser({
  //       ...singleUser,
  //       [e.target.name]: e.target.value,
  //     });
  //   };

  // For changing image into Base64
  let changeImg = (e) => {
    let selectedImg = e.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(selectedImg);
    reader.addEventListener("load", () => {
      if (reader.result) {
        setSingleUser({
          ...singleUser,
          avatar: reader.result,
        });
      } else {
        alert("Something went wrong");
      }
    });
  };

  // For submiting form data
  let submitLogin = (e) => {
    e.preventDefault();
    dispatch(editUser(userId, singleUser, navigate));
  };
  return (
    <React.Fragment>
      <pre>{JSON.stringify(userInfo.selectedUser)}</pre>
      <pre>{JSON.stringify(singleUser)}</pre>
      <section className="mt-3 animated jello">
        <div className="container">
          <div className="row ">
            <div className="col-md-5 m-auto">
              <div className="card">
                <div className="card-header bg-secondary text-white">
                  <h4>
                    {" "}
                    <i className="fa fa-sign-in-alt"></i>Edit User
                  </h4>
                </div>
                <div className="card-body">
                  <form onSubmit={submitLogin}>
                    <div className="form-group">
                      <input
                        name="name"
                        onChange={(e) => e.target.value}
                        type="text"
                        className="form-control"
                        placeholder="Name"
                      />
                    </div>
                    <div className="form-group">
                      <input
                        name="email"
                        onChange={(e) => e.target.value}
                        type="email"
                        className="form-control"
                        placeholder="Email"
                      />
                    </div>
                    <div className="form-group">
                      <input
                        onChange={(e) => e.target.value}
                        type="file"
                        className="form-control"
                      />
                      {singleUser.avatar && (
                        <img
                          src={singleUser.avatar}
                          width="30"
                          height="30"
                          className="mt-3"
                          alt=""
                        />
                      )}
                    </div>
                    <div className="form-group">
                      <input
                        name="contact"
                        onChange={(e) => e.target.value}
                        type="text"
                        className="form-control"
                        placeholder="contact"
                      />
                    </div>
                    <div className="form-group">
                      <input
                        name="password"
                        onChange={(e) => e.target.value}
                        type="password"
                        className="form-control"
                        placeholder="password"
                      />
                    </div>
                    <input
                      type="submit"
                      className="btn btn-sm btn-secondary"
                      value="Edit"
                    />
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};

export default EditUser;
