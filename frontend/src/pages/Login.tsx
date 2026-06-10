import { useState } from "react";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        const loginData = {
            email,
            password
        };

        console.log(loginData);
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