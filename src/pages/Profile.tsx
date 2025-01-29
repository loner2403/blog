import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppBar } from "../components/AppBar";
import { BlogCard } from "../components/BlogCard";
import Swal from 'sweetalert2';
import { useUserDetails, useUpdateBio } from "../hooks"; // Keep the necessary hooks
import {  FaSave, FaBlog } from "react-icons/fa";
import { ProfileSkeleton } from "../components/Skeleton";
import { useUserBlogs } from "../hooks"; // Use the new user blogs hook
import { Blog } from "../hooks"; // Import the Blog interface

export const Profile = () => {
    const navigate = useNavigate();
    const { name, bio,  loading: userDetailsLoading } = useUserDetails(); // Keep user details hook
    const { blogs, loading: blogsLoading, error } = useUserBlogs(); // Fetch user blogs using the new hook
    const [currentBio, setCurrentBio] = useState(bio || "");
    const { updateBio } = useUpdateBio();

    const handleSaveBio = async () => {
        if (name) {
            const success = await updateBio(currentBio);
            if (success) {
                Swal.fire({
                    title: 'Success!',
                    text: 'Your bio has been updated.',
                    icon: 'success',
                });
            } else {
                Swal.fire({
                    title: 'Error!',
                    text: 'There was an error updating your bio.',
                    icon: 'error',
                });
            }
        }
    };

    if (userDetailsLoading || blogsLoading) {
        return (
            <div>
                <AppBar />
                <div>
                    <ProfileSkeleton />
                    <ProfileSkeleton />
                    <ProfileSkeleton />
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div>
                <AppBar />
                <div className="text-center py-12">
                    <h3 className="text-xl text-gray-500 font-medium">
                        {error}
                    </h3>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
            <AppBar />
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
                {/* Profile Card */}
                <div className="bg-white rounded-xl md:rounded-3xl shadow-lg p-4 md:p-8 mb-6 md:mb-8">
                    <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
                        {/* Avatar */}
                        <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-gradient-to-r from-green-200 to-green-700 flex items-center justify-center">
                            <span className="text-3xl md:text-4xl text-white font-bold">
                                {name ? name[0].toUpperCase() : 'U'}
                            </span>
                        </div>
                        
                        {/* Bio Section */}
                        <div className="flex-1 w-full">
                            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
                                {name}
                            </h1>
                            <div className="relative">
                                <textarea
                                    value={currentBio}
                                    onChange={(e) => setCurrentBio(e.target.value)}
                                    placeholder="Tell your story..."
                                    className="w-full p-3 md:p-4 text-sm md:text-base text-gray-600 border-2 border-gray-200 rounded-lg md:rounded-xl resize-none 
                                    focus:border-blue-500 focus:ring-2 focus:ring-blue-200 hover:border-gray-300"
                                    rows={4}
                                />
                                <button
                                    onClick={handleSaveBio}
                                    className="mt-3 md:mt-0 md:absolute md:bottom-4 md:right-4 w-full md:w-auto bg-gradient-to-r from-green-200 to-green-700 text-white 
                                    px-4 py-2 md:px-6 md:py-2 text-sm md:text-base rounded-lg font-semibold flex items-center justify-center gap-2 
                                    shadow-lg hover:shadow-xl transition-all duration-300"
                                >
                                    <FaSave className="text-base" />
                                    Save Bio
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stories Section */}
                <div className="bg-white rounded-xl md:rounded-3xl shadow-lg p-4 md:p-8">
                    <div className="flex items-center gap-2 md:gap-3 mb-4 md:mb-8">
                        <FaBlog className="text-xl md:text-2xl text-green-600" />
                        <h2 className="text-xl md:text-2xl font-bold text-gray-800">Your Stories</h2>
                    </div>
                    
                    {blogs.length > 0 ? (
                        <div className="grid gap-4 md:gap-6">
                            {blogs.map((blog: Blog) => (
                                <BlogCard 
                                    key={blog.id}
                                    id={blog.id}
                                    authorName={blog.author.name || "Anonymous"}
                                    title={blog.title}
                                    content={blog.content}
                                    createdAt={blog.createdAt}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-8 md:py-12">
                            <div className="text-gray-400 text-4xl md:text-6xl mb-3 md:mb-4">📝</div>
                            <h3 className="text-lg md:text-xl text-gray-500 font-medium">
                                No stories published yet
                            </h3>
                            <button
                                onClick={() => navigate('/publish')}
                                className="mt-4 w-full md:w-auto bg-blue-500 text-white px-4 py-2 md:px-6 md:py-2 rounded-lg font-medium
                                hover:bg-blue-600 transition-colors duration-300"
                            >
                                Write Your First Story
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
