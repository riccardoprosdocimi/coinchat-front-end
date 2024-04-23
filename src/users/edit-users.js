import {useDispatch, useSelector} from "react-redux";
import React, {useEffect, useState} from "react";
import {deleteUserThunk, findAllUsersThunk} from "../services/users-thunks";
import {useNavigate} from "react-router-dom";

const EditUsers = () => {
    const {currentUser, users, loading} = useSelector(state => state.users);
    const [error, setError] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        dispatch(findAllUsersThunk());
    }, [dispatch]);
    const createUserHandler = () => {
        navigate('/edit-users/create-user');
    };
    const deleteUserHandler = uid => {
        if (uid === currentUser._id) {
            setError('You cannot delete the current user');
        } else {
            setError(null)
            dispatch(deleteUserThunk(uid));
        }
    };

    if (currentUser.role !== 'ADMIN') {
        navigate('/');
    } else {
        return(
            <>
                {
                    loading &&
                    <h1>
                        Loading Users...
                    </h1>
                }
                {
                    !loading &&
                    <h1 className="text-center mt-2">
                        {users.length} Users
                    </h1>
                }
                {
                    error &&
                    <div className="alert alert-danger">
                        {error}
                    </div>
                }
                <div className="row">
                    <div className="col">
                        <button className="btn wd-btn-style float-end me-4"
                                onClick={() => createUserHandler()}>
                            Add
                        </button>
                    </div>
                </div>
                <ul className="list-group mt-2">
                    {
                        loading &&
                        <li className="list-group-item">
                            loading...
                        </li>
                    }
                    {
                        users.map(
                            user =>
                                <li className="list-group-item"
                                    key={user._id}>
                                    First name: {user.firstName}&emsp;
                                    Last name: {user.lastName}&emsp;
                                    Username: @{user.handle}&emsp;
                                    Email: {user.email}
                                    <button onClick={() => deleteUserHandler(user._id)}
                                            className="btn btn-danger float-end">
                                        Delete
                                    </button>
                                </li>
                        )
                    }
                </ul>
            </>
        );
    }
};
export default EditUsers;