import { useParams, useNavigate } from "react-router-dom";
import { useBlog, useDeleteBlog, useUserDetails } from "../hooks";
import { FullBlog } from "../components/FullBlog";
import Skeleton from "../components/Skeleton";
import { AppBar } from "../components/AppBar";
import Swal from 'sweetalert2';
import { motion } from 'framer-motion';

export const Blog = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { loading, blog } = useBlog({ id: id || "" });
    const { deleteBlog } = useDeleteBlog();
    const { name: userName, loading: userLoading } = useUserDetails(); // Get current user

    const handleDelete = async () => {
        // Show the SweetAlert2 confirmation dialog
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        });
        if (result.isConfirmed) {
            if (id) {
                const success = await deleteBlog(id);
                if (success) {
                    // Show a success message
                    Swal.fire(
                        'Deleted!',
                        'The blog has been deleted.',
                        'success'
                    );
                    navigate('/blogs');
                } else {
                    // Show an error message
                    Swal.fire(
                        'Error!',
                        'There was an error deleting the blog.',
                        'error'
                    );
                }
            }
        }
    };

    if (loading || userLoading) {
        return (
            <div className="bg-gray-100 min-h-screen flex items-center justify-center">
                <div className="max-w-screen-lg w-full">
                    <Skeleton />
                    <Skeleton />
                    <Skeleton />
                </div>
            </div>
        );
    }

    // Check if current user is the author
    const isAuthor = blog?.author?.name === userName;

    return (
        <div className="bg-gray-100 min-h-screen">
            <AppBar />
            <div className="flex flex-col items-center justify-center mt-2 md:mt-4 px-4">
                <motion.div 
                    className="max-w-screen-lg w-full bg-white p-4 md:p-8 rounded-lg shadow-md"
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                >
                    <FullBlog blog={blog} />
                    {isAuthor && (
                        <motion.div 
                            className="flex justify-center mt-4 md:mt-6"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                        >
                            <button
                                onClick={handleDelete}
                                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 md:py-3 md:px-6 my-4 rounded focus:outline-none focus:shadow-outline"
                            >
                                Delete Blog
                            </button>
                        </motion.div>
                    )}
                </motion.div>
            </div>
        </div>
    );
};