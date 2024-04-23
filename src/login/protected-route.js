import {Navigate} from "react-router-dom";
import {useSelector} from "react-redux";

const ProtectedRoute = ({children}) => {
    const {currentUser} = useSelector(state => state.users);
    if (currentUser) {
        return(children);
    } else {
        return(<Navigate to={'/login'}/>);
    }
};
export default ProtectedRoute;