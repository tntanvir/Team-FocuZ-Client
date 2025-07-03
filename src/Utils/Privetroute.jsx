import { Navigate } from "react-router-dom";

const Privetroute = ({ children }) => {
    const isAuthenticated = sessionStorage.getItem("access");

    return isAuthenticated ? children : <Navigate to="/signin" replace />;
};

export default Privetroute;