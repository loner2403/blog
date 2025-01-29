import { Link, useNavigate } from "react-router-dom";
import { Avatar } from "./BlogCard";
import { useUserDetails } from "../hooks";
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

export const AppBar = () => {
    const { loading, name } = useUserDetails(); // Fetch bio as well if needed
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/signin");
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Animation variants for dropdown
    const dropdownVariants = {
        hidden: { opacity: 0, y: -10 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.2 } },
    };

    return (
        <div className="border-b flex justify-between px-10 py-2 bg-white shadow-md relative">
            <Link to={'/blogs'} className="flex flex-col justify-center cursor-pointer text-gray-800 font-semibold">
                Medium
            </Link>

            <div className="flex items-center gap-4 relative" ref={dropdownRef}>
                <Link to={'/publish'}>
                    <button
                        type="button"
                        className="text-white bg-green-700 hover:bg-green-800 focus:outline-none font-medium rounded-full text-sm px-5 py-2.5 text-center"
                    >
                        New
                    </button>
                </Link>

                <div 
                    className="cursor-pointer relative"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <Avatar size="big" name={loading ? '...' : name || 'Anonymous'} />
                    
                    {isOpen && (
                        <motion.div
                            variants={dropdownVariants}
                            initial="hidden"
                            animate="visible"
                            exit="hidden"
                            className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-10"
                        >
                            <Link to="/profile" className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-left">
                                My Profile
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-left"
                            >
                                Logout
                            </button>
                        </motion.div>
                    )}
                </div>
            </div>
        </div>
    );
};
