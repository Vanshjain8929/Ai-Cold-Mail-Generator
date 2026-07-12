import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import api from "../api/api";
import { useAuth } from "../context/AuthContext";

export default function Login() {

    const navigate = useNavigate();

    const { login } = useAuth();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!formData.email || !formData.password) {
            return toast.error("Please fill all fields");
        }

        try {

            setLoading(true);

            const res = await api.post("/auth/login", formData);

            login(
                {
                    _id: res.data._id,
                    username: res.data.username,
                    email: res.data.email,
                },
                res.data.token
            );

            toast.success("Login Successful");

            navigate("/dashboard");

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Login Failed"
            );

        } finally {

            setLoading(false);

        }
    };

    return (

        <div className="min-h-screen flex items-center justify-center bg-gray-100">

            <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-8">

                <h1 className="text-3xl font-bold text-center mb-8">

                    Login

                </h1>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-5"
                >

                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full border rounded-lg p-3"
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full border rounded-lg p-3"
                    />

                    <button
                        disabled={loading}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-3"
                    >

                        {loading ? "Logging in..." : "Login"}

                    </button>

                </form>

                <p className="mt-6 text-center">

                    Don't have an account?

                    <Link
                        to="/signup"
                        className="text-blue-600 ml-2"
                    >
                        Signup
                    </Link>

                </p>

            </div>

        </div>

    );
}