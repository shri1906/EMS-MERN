import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";

const PrivateRoutes = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) {
    return <div>Loading...</div>;
  }
  return user ? children : <Navigate to="/login" />;
};

// PropTypes validation for children
PrivateRoutes.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PrivateRoutes;
