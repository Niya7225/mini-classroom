import { useContext } from "react";

import { AuthContext } from "../context/AuthContext";


function Dashboard() {

    const auth = useContext(AuthContext);


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

            </div>

        </div>
    );

}


export default Dashboard;