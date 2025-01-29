import { motion, AnimatePresence } from "framer-motion";
import { AppBar } from "../components/AppBar";
import { BlogCard } from "../components/BlogCard";
import { BlogCardSkeleton } from "../components/Skeleton";
import { useBlogs } from "../hooks";
import { useState } from "react";

export const Blogs = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");
    const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");

    const { loading, blogs, pagination } = useBlogs(currentPage);

    // Filter blogs based on search query (title or content)
    const filteredBlogs = blogs.filter((blog) => {
        const searchLower = searchQuery.toLowerCase();
        return (
            blog.title.toLowerCase().includes(searchLower) ||
            blog.content.toLowerCase().includes(searchLower)
        );
    });

    // Sort blogs by createdAt
    const sortedBlogs = filteredBlogs.sort((a, b) => {
        const dateA = new Date(a.createdAt).getTime();
        const dateB = new Date(b.createdAt).getTime();
        return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
    });
    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -20 },
    };

    if (loading) {
        return (
            <div>
                <AppBar />
                <div className="flex items-center justify-center">
                    <motion.div
                        initial={{ opacity: 0.5 }}
                        animate={{ opacity: 1 }}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                        className="w-full max-w-4xl px-4"
                    >
                        <BlogCardSkeleton />
                        <BlogCardSkeleton />
                        <BlogCardSkeleton />
                        <BlogCardSkeleton />
                    </motion.div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <AppBar />
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="flex justify-center"
            >
                <div className="max-w-4xl w-full px-4 md:px-6">
                    {/* Search and Sort Controls - Responsive Stack */}
                    <motion.div
                        className="flex flex-col md:flex-row gap-3 md:gap-4 mb-6 md:mb-8 mt-4 md:mt-8"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                    >
                        <motion.input
                            type="text"
                            placeholder="Search blogs..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full p-2 md:p-3 border border-gray-200 rounded-lg md:rounded-xl bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-300 text-sm md:text-base"
                            whileHover={{ scale: 1.01 }}
                            whileFocus={{ scale: 1.02 }}
                        />
                        <motion.select
                            value={sortOrder}
                            onChange={(e) => setSortOrder(e.target.value as "newest" | "oldest")}
                            className="w-full md:w-auto p-2 md:p-3 border border-gray-200 rounded-lg md:rounded-xl bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-300 text-sm md:text-base"
                            whileHover={{ scale: 1.02 }}
                        >
                            <option value="newest">Newest</option>
                            <option value="oldest">Oldest</option>
                        </motion.select>
                    </motion.div>


                    {/* Blog List */}
                    <AnimatePresence mode="wait">
                        {sortedBlogs.length > 0 ? (
                            <motion.div
                                variants={containerVariants}
                                initial="hidden"
                                animate="show"
                                className="space-y-4 md:space-y-6"
                            >
                                {sortedBlogs.map((blog) => (
                                    <motion.div
                                        key={blog.id}
                                        variants={cardVariants}
                                        layout
                                        transition={{ duration: 0.3 }}
                                    >
                                        <BlogCard
                                            id={blog.id}
                                            authorName={blog.author.name || "Anonymous"}
                                            title={blog.title}
                                            content={blog.content}
                                            createdAt={blog.createdAt}
                                        />
                                    </motion.div>
                                ))}
                            </motion.div>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-center text-gray-500 py-8"
                            >
                                No blogs found matching your search.
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Pagination Controls */}
                    <motion.div
                        className="flex flex-col-reverse md:flex-row items-center justify-between gap-3 my-8 md:my-12"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                    >
                        <span className="text-sm md:text-base text-gray-600">
                            Page {currentPage} of {pagination?.totalPages || 1}
                        </span>
                        
                        <div className="flex gap-2 md:gap-4">
                            <motion.button
                                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                disabled={currentPage === 1}
                                className={`px-4 md:px-6 py-2 text-sm md:text-base rounded-lg md:rounded-xl ${
                                    currentPage === 1
                                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                }`}
                                whileHover={currentPage !== 1 ? { scale: 1.05 } : {}}
                                whileTap={currentPage !== 1 ? { scale: 0.95 } : {}}
                            >
                                Previous
                            </motion.button>
                            
                            <motion.button
                                onClick={() => setCurrentPage(p => p + 1)}
                                disabled={!pagination?.hasNext}
                                className={`px-4 md:px-6 py-2 text-sm md:text-base rounded-lg md:rounded-xl ${
                                    !pagination?.hasNext
                                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                }`}
                                whileHover={pagination?.hasNext ? { scale: 1.05 } : {}}
                                whileTap={pagination?.hasNext ? { scale: 0.95 } : {}}
                            >
                                Next
                            </motion.button>
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
};