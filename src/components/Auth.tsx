import { motion } from "framer-motion";
import {  FiArrowRight } from "react-icons/fi";
import { SignupInput } from "@harshal03/medium_blog-common1";
import axios from "axios";
import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../config";

export const Auth = ({ type }: { type: "signup" | "signin" }) => {
    const navigate = useNavigate();
    const [postInputs, setPostInputs] = useState<SignupInput>({
        name: "",
        email: "",
        password: "",
    });
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    async function sendRequest() {
        setIsLoading(true);
        try {
            const response = await axios.post(
                `${BACKEND_URL}/api/v1/user/${type === "signup" ? "signup" : "signin"}`,
                postInputs
            );
            const jwt = response.data.jwt;
            if (!jwt) {
                throw new Error("JWT not found in response");
            }
            localStorage.setItem("token", jwt);
            navigate("/blogs");
        } catch (e: any) {
            console.error("Error during request:", e);
            alert(e.response?.data?.error || "An error occurred while signing up");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 border border-gray-200"
            >
                <div className="space-y-6">
                    <div className="text-center">
                        <motion.h1
                            initial={{ scale: 0.95 }}
                            animate={{ scale: 1 }}
                            className="text-4xl font-bold text-gray-800 mb-2"
                        >
                            {type === "signup" ? "Welcome Aboard" : "Welcome Back"}
                        </motion.h1>
                        <p className="text-gray-600">
                            {type === "signin" ? "Don't have an account?" : "Already have an account?"}
                            <Link
                                to={type === "signin" ? "/signup" : "/signin"}
                                className="ml-2 font-semibold text-gray-700 hover:text-gray-900 transition-colors"
                            >
                                {type === "signin" ? "Sign up" : "Sign in"}
                            </Link>
                        </p>
                    </div>

                    <div className="space-y-4">
                        {type === "signup" && (
                            <LabelledInput
                                key="username"
                                label="Username"
                                placeholder="Enter your username"
                                onChange={(e) => setPostInputs({ ...postInputs, name: e.target.value })}
                                icon="user"
                            />
                        )}

                        <LabelledInput
                            key="email"
                            label="Email"
                            placeholder="m@example.com"
                            onChange={(e) => setPostInputs({ ...postInputs, email: e.target.value })}
                            icon="email"
                        />

                        <LabelledInput
                            key="password"
                            label="Password"
                            type={showPassword ? "text" : "password"}
                            placeholder="••••••••"
                            onChange={(e) => setPostInputs({ ...postInputs, password: e.target.value })}
                            icon="lock"
                            onToggleVisibility={() => setShowPassword(!showPassword)}
                            showPassword={showPassword}
                        />

                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={sendRequest}
                            disabled={isLoading}
                            className="w-full bg-gray-800 text-white py-3 px-6 rounded-lg font-semibold 
                            hover:bg-gray-700 transition-all duration-200 flex items-center justify-center gap-2"
                        >
                            {isLoading ? (
                                <motion.div
                                    key="spinner"
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 1, repeat: Infinity }}
                                    className="h-5 w-5 border-2 border-white/50 border-t-white rounded-full"
                                />
                            ) : (
                                <>
                                    {type === "signup" ? "Get Started" : "Continue"}
                                    <FiArrowRight className="text-lg" />
                                </>
                            )}
                        </motion.button>

                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300"></div>
                            </div>
                            
                        </div>

                        
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

interface LabelledInputType {
    label: string;
    placeholder: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    type?: string;
    icon?: "user" | "email" | "lock";
    onToggleVisibility?: () => void;
    showPassword?: boolean;
}

function LabelledInput({ label, placeholder, onChange, type = "text", onToggleVisibility, showPassword }: LabelledInputType) {
    return (
        <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-1"
        >
            <label className="text-sm font-medium text-gray-700">{label}</label>
            <div className="relative">
                <input
                    onChange={onChange}
                    type={type}
                    placeholder={placeholder}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg 
                    focus:ring-2 focus:ring-gray-500 focus:border-gray-500 outline-none 
                    transition-all placeholder:text-gray-400"
                />
                {type === "password" && (
                    <button
                        type="button"
                        onClick={onToggleVisibility}
                        className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        {showPassword ? "🔒" : "👁️"}
                    </button>
                )}
            </div>
        </motion.div>
    );
}
