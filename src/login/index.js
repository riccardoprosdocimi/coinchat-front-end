import React, {useState} from "react";
import {Link, Navigate, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {loginThunk} from "../services/users-thunks";

const Login = () => {
    const {currentUser, loading} = useSelector(state => state.users);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [usernameError, setUsernameError] = useState(null);
    const [passwordError, setPasswordError] = useState(null);
    const [credentialsError, setCredentialsError] = useState(null);
    const changeUsername = event => {
        const newUsername = event.target.value;
        setUsername(newUsername);
    };
    const changePassword = event => {
        const newPassword = event.target.value;
        setPassword(newPassword);
    };
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleLoginBtn = () => {
        if (username === '') {
            setPasswordError(null);
            setUsernameError('Please enter a valid username');
        } else if (password === '') {
            setUsernameError(null);
            setPasswordError('Please enter a valid password');
        } else {
            const loginUser = {handle: username, password};
            dispatch(loginThunk(loginUser));
            if (currentUser) {
                setUsernameError(null);
                setPasswordError(null);
                setCredentialsError(null);
                navigate('/profile');
            } else {
                setUsernameError(null);
                setPasswordError(null);
                setCredentialsError('Invalid credentials');
            }
        }
    };

    if (currentUser) {
        return(<Navigate to={'/profile'}/>);
    } else {
        return(
            <div className="d-flex flex-column min-vh-100 justify-content-center align-items-center">
                <div className="card wd-bg-color"
                     style={{maxWidth: "30rem"}}>
                    <div className="card-header text-center wd-header-bg-color">
                        <Link to="/"
                              className="wd-brand wd-brand-font">
                            CoinChat
                        </Link>
                    </div>
                    {
                        credentialsError && !loading &&
                        <div className="alert alert-danger">
                            {credentialsError}
                        </div>
                    }
                    <div className="card-body">
                        <h3 className="card-title fw-bolder">
                            Sign in to CoinChat
                        </h3>
                        <form className="row gy-2 gx-3">
                            <label htmlFor="login-fields-username"
                                   className="col-form-label col-form-label-lg mb-0 pb-0">
                                Username
                            </label>
                            <div className="input-group">
                                <div className="input-group-text">
                                    @
                                </div>
                                <input type="text"
                                       className="form-control form-control-lg"
                                       id="login-fields-username"
                                       placeholder="Your username"
                                       title="Please enter your username here"
                                       value={username}
                                       onChange={changeUsername}/>
                            </div>
                            {
                                usernameError &&
                                <div className="alert alert-danger mt-1 mb-1">
                                    {usernameError}
                                </div>
                            }
                            <div>
                                <label htmlFor="login-fields-password"
                                       className="col-form-label col-form-label-lg mb-0 pb-0">
                                    Password
                                </label>
                                <input type="password"
                                       className="form-control form-control-lg"
                                       id="login-fields-password"
                                       placeholder="Password"
                                       title="Please enter your password here"
                                       value={password}
                                       onChange={changePassword}/>
                            </div>
                        </form>
                        {
                            passwordError &&
                            <div className="alert alert-danger mt-1 mb-1">
                                {passwordError}
                            </div>
                        }
                        <div>
                            <div className="d-flex justify-content-center">
                                <button type="button"
                                        className="btn wd-btn-style rounded-pill mt-2 w-75 wd-font"
                                        onClick={handleLoginBtn}>
                                    Login
                                </button>
                            </div>
                            <div className="d-flex justify-content-center">
                                <Link to="/register"
                                      type="button"
                                      className="btn btn-sm btn-secondary rounded-pill mt-2 w-75 wd-font"
                                      style={{color: "white"}}>
                                    Create account
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

export default Login;