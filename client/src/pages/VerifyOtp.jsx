import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import api from "../api/api";
import { useAuth } from "../context/AuthContext";

export default function VerifyOtp() {
    const navigate = useNavigate();
    const location = useLocation();

    const { login } = useAuth();

    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        email: "",
        otp: "",
    });

    useEffect(() => {
        if (location.state?.email) {
            setFormData((prev) => ({
                ...prev,
                email: location.state.email,
            }));
        }
    }, [location]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { email, otp } = formData;

        if (!email || !otp) {
            return toast.error("Please fill all fields");
        }

        if (!/^\d{6}$/.test(otp)) {
            return toast.error("OTP must be 6 digits");
        }

        try {
            setLoading(true);

            const res = await api.post("/auth/verify-otp", {
                email,
                otp,
            });

            login(
                {
                    _id: res.data._id,
                    username: res.data.username,
                    email: res.data.email,
                },
                res.data.token
            );

            toast.success("Email Verified Successfully");

            navigate("/dashboard");

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "OTP Verification Failed"
            );

        } finally {

            setLoading(false);

        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">

            <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md">


                <p className="text-gray-500 text-center mb-6">
                    Enter the OTP sent to your email
                </p>

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
                        className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <input
                        type="text"
                        name="otp"
                        placeholder="Enter 6-digit OTP"
                        maxLength={6}
                        value={formData.otp}
                        onChange={handleChange}
                        className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <button
                        disabled={loading}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-3 transition disabled:opacity-60"
                    >
                        {loading ? "Verifying..." : "Verify OTP"}
                    </button>

                </form>

                <div className="mt-6 text-center">

                    <Link
                        to="/signup"
                        className="text-blue-600 hover:underline"
                    >
                        Back to Signup
                    </Link>

                </div>

            </div>

        </div>
    );
}