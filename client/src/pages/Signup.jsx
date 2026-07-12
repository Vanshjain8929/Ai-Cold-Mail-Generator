import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import api from "../api/api";

export default function Signup() {

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        const { username, email, password } = formData;

        // Validation
        if (!username || !email || !password) {
            return toast.error("Please fill all fields");
        }

        if (username.length < 2) {
            return toast.error("Username must be at least 2 characters");
        }

        if (password.length < 6) {
            return toast.error("Password must be at least 6 characters");
        }

        try {

            setLoading(true);

            const res = await api.post("/auth/register", formData);

            toast.success(res.data.message);

            navigate("/verify-otp", {
                state: {
                    userId: res.data.userId,
                    email: res.data.email,
                },
            });

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Registration Failed"
            );

        } finally {

            setLoading(false);

        }
    };

    return (

        <div className="min-h-screen flex items-center justify-center bg-gray-100">

            <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-8">

                <h1 className="text-3xl font-bold text-center mb-8">
                    Create Account
                </h1>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-5"
                >

                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        value={formData.username}
                        onChange={handleChange}
                        className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <button
                        disabled={loading}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-3 transition disabled:opacity-60"
                    >
                        {loading ? "Creating Account..." : "Sign Up"}
                    </button>

                </form>

                <p className="mt-6 text-center text-gray-600">

                    Already have an account?

                    <Link
                        to="/login"
                        className="text-blue-600 ml-2 hover:underline"
                    >
                        Login
                    </Link>

                </p>

            </div>

        </div>

    );
}