import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
function Register() {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("student");

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        setError("");
        setLoading(true);

        const userData = {
            name,
            email,
            password,
            role
        };

        try {
            await api.post("/auth/register", userData);
            navigate("/login");
        }catch (err) {
            if (axios.isAxiosError(err)) {
                setError(err.response?.data?.detail || "Registration failed");
            } else {
                setError("Registration failed");
            }
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="h-screen flex justify-center items-center">
            <form onSubmit={handleSubmit} className="border p-8 rounded-xl shadow">
                <h1 className="text-2xl font-bold mb-5">Register</h1>

                {error && (
                    <p className="text-red-500 mb-3">{error}</p>
                )}

                <input
                    className="border p-2 block my-3"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />

                <input
                    className="border p-2 block my-3"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <input
                    className="border p-2 block my-3"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    minLength={8}
                    required
                />

                <select
                    className="border p-2 block my-3"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                >
                    <option value="student">Student</option>
                    <option value="teacher">Teacher</option>
                </select>

                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-blue-300"
                    disabled={loading}
                >
                    {loading ? "Registering..." : "Register"}
                </button>
            </form>
        </div>
    );
}

export default Register;