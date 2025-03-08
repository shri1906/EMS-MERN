import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"

const RoleBaseRoutes = ({children, requiredRole}) => {
    const {user, loading} = useAuth()
    if(loading){
     return <div className="text-center text-lg font-semibold">Loading...</div>
    }
    if(!requiredRole.includes(user.role)){
      return  <Navigate to="/unauthorized" />
    }
    return user ? children : <Navigate to="/login" />;
 
}

export default RoleBaseRoutes