import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"
import PropTypes from "prop-types";


const RoleBaseRoutes = ({children, requiredRole}) => {
    const {user, loading} = useAuth()
    if(loading){
     <div>Loading...</div>
    }
    if(!requiredRole.includes(user.role)){
        <Navigate to="/unauthorized" />
    }
    return user ? children : <Navigate to="/login" />;
 
}
// PropTypes validation for children
RoleBaseRoutes.propTypes = {
  children: PropTypes.node.isRequired,
  requiredRole: PropTypes.node.isRequired
};

export default RoleBaseRoutes