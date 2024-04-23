import {useDispatch} from "react-redux";
import {useEffect} from "react";
import {profileThunk} from "../services/users-thunks";

const CurrentUser = ({children}) => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(profileThunk());
    }, [dispatch]);
    return(children);
};
export default CurrentUser;