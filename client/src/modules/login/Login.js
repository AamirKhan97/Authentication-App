import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from '../../redux/auth/Auth.actions';

let Login = () => {

    let dispatch = useDispatch();

    let navigate = useNavigate();

    let [user, setUser] = useState({
        email: '',
        password: '',
    });

        //  Hnadle Change
    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name] : e.target.value
        })
    }

    // For submiting form data
    let submitLogin = (e) => {
        e.preventDefault();
        console.log(user)
        dispatch(loginUser(user, navigate))   
    }
    return (
        <React.Fragment>
            <section className='mt-3 animated jello'>
                <div className="container">
                    <div className="row ">
                        <div className="col-md-5 m-auto">
                            <div className="card">
                                <div className="card-header bg-dark text-white">
                                    <h4> <i className='fa fa-sign-in-alt'></i>Login Here</h4>
                                </div>
                                <div className="card-body">
                                    <form onSubmit={submitLogin}>
                                        <div className='form-group'>
                                            <input
                                                name='email'
                                                value={user.email}
                                                onChange={handleChange}
                                                type="email"  className='form-control' placeholder='Email' />
                                        </div>
                                        <div className='form-group'>
                                            <input
                                                name='password'
                                                value={user.password}
                                                onChange={handleChange}
                                                type="password" className='form-control' placeholder='Email' />
                                        </div>
                                        <input type="submit" className='btn btn-dark font-weight-bold btn-sm text-white' value="Login" />
                                    </form>
                                    <small className='font-weight-bold'>Don't Have An Account ?
                                        <Link to="/users/register"> Register</Link>
                                    </small>
                                </div>
                                {/* <div className="card-footer text-center bg-primary">
                                    <img src={logo} width='120' height="40" alt="" />
                                </div> */}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </React.Fragment>

    )
}

export default Login;