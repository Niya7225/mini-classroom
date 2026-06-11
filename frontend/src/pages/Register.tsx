import { useState } from "react";

function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("student");

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        const userData = {
            name,
            email,
            password,
            role
        };

        console.log(userData);
    }

    return (
        <div className="h-screen flex justify-center items-center">
            <form onSubmit={handleSubmit} className="border p-8 rounded-xl shadow">
                <h1 className="text-2xl font-bold mb-5">Register</h1>

                <input
                    className="border p-2 block my-3"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

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

                <select
                    className="border p-2 block my-3"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                >
                    <option value="student">Student</option>
                    <option value="teacher">Teacher</option>
                </select>

                <button className="bg-blue-500 text-white px-4 py-2 rounded">
                    Register
                </button>
            </form>
        </div>
    );
}

export default Register;