import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";


function Dashboard() {

    const auth = useContext(AuthContext);
    const navigate = useNavigate();

    function handleLogout() {
    auth?.logout();
    navigate("/login");
}


    return (
        
        <div className="h-screen flex justify-center items-center">

            <div className="border p-8 rounded-xl shadow">

                <h1 className="text-2xl font-bold">
                    Welcome {auth?.user?.name}
                </h1>


                <p className="mt-3">
                    Email: {auth?.user?.email}
                </p>


                <p>
                    Role: {auth?.user?.role}
                </p>

                <button
                    onClick={handleLogout}
                    className="mt-5 bg-red-500 text-white px-4 py-2 rounded"
                >
                    Logout
                </button>

            </div>

        </div>
    );

}


export default Dashboard;