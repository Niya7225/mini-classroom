import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function StudentSettings() {
    const auth = useContext(AuthContext);

    return (
        <div>
            <h1 className="text-2xl font-bold">
                Settings
            </h1>

            <div className="border rounded-xl p-6 mt-6 shadow">
                <p>
                    <strong>Name:</strong>{" "}
                    {auth?.user?.name}
                </p>

                <p className="mt-3">
                    <strong>Email:</strong>{" "}
                    {auth?.user?.email}
                </p>

                <p className="mt-3">
                    <strong>Role:</strong>{" "}
                    {auth?.user?.role}
                </p>
            </div>
        </div>
    );
}

export default StudentSettings;