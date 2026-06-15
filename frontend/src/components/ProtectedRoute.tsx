import { useContext } from "react";
import { Navigate } from "react-router-dom";

import { AuthContext } from "../context/AuthContext";


function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const auth = useContext(AuthContext);


    if (!auth?.token) {
        return <Navigate to="/login" />;
    }


    return children;
}


export default ProtectedRoute;