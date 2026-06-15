import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../api/axios";
import { AuthContext } from "../context/AuthContext";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const auth = useContext(AuthContext);
    const navigate = useNavigate();

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        const response = await api.post("/auth/login", { email, password });

        auth?.login(response.data.access_token);
        navigate("/dashboard");
    }

    return (
        <div className="h-screen flex justify-center items-center">
            <form onSubmit={handleSubmit} className="border p-8 rounded-xl shadow">
                <h1 className="text-2xl font-bold mb-5">Login</h1>

                <input
                    className="border p-2 block my-3"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    className="border p-2 block my-3"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button className="bg-blue-500 text-white px-4 py-2 rounded">
                    Login
                </button>
            </form>
        </div>
    );
}

export default Login;