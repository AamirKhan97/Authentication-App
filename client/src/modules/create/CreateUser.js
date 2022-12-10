import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { createUser } from "../../redux/users/users.action";

const CreateUser = () => {
  let navigate = useNavigate();

  let dispatch = useDispatch();

  let [user, setUser] = useState({
    name: "",
    email: "",
    avatar: "",
    contact: "",
    password: "",
  });

  //  Hnadle Change
  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };
  // For changing image into Base64
    let changeImg = (e) => {
      let selectedImg = e.target.files[0];
      let reader = new FileReader();
      reader.readAsDataURL(selectedImg);
      reader.addEventListener("load", () => {
        if (reader.result) {
          setUser({
            ...user,
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
    console.log(user, "user")
    dispatch(createUser(user, navigate))
  };
  return (
    <React.Fragment>
      <pre>{JSON.stringify(user)}</pre>
      <section className="mt-3 animated jello">
        <div className="container">
          <div className="row ">
            <div className="col-md-5 m-auto">
              <div className="card">
                <div className="card-header bg-dark text-white">
                  <h4>
                    {" "}
                    <i className="fa fa-sign-in-alt"></i>Create User
                  </h4>
                </div>
                <div className="card-body">
                  <form onSubmit={submitLogin}>
                    <div className="form-group">
                      <input
                        name="name"
                        // value={user.name}
                        onChange={handleChange}
                        type="text"
                        className="form-control"
                        placeholder="Name"
                      />
                    </div>
                    <div className="form-group">
                      <input
                        name="email"
                        // value={user.email}
                        onChange={handleChange}
                        type="email"
                        className="form-control"
                        placeholder="Email"
                      />
                    </div>
                    <div className="form-group">
                      <input
                        onChange={changeImg}
                        type="file"
                        className="form-control"
                        placeholder="Avatar"
                      />
                    </div>
                    <div className="form-group">
                      <input
                        name="contact"
                        onChange={handleChange}
                        type="text"
                        className="form-control"
                        placeholder="Contact"
                      />
                    </div>
                    <div className="form-group">
                      <input
                        name="password"
                        // value={user.password}
                        onChange={handleChange}
                        type="password"
                        className="form-control"
                        placeholder="Email"
                      />
                    </div>
                    <input
                      type="submit"
                      className="btn btn-sm btn-dark"
                      value="Create"
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

export default CreateUser;
