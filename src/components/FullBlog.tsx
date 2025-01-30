import { Blog } from "../hooks";
import { Avatar } from "./BlogCard";
import { formatDate } from "../utils/formatDate";
import { useAuthorDetails } from "../hooks"; // Use the new hook



export const FullBlog = ({ blog }: { blog: Blog }) => {
    

    // Get author details using blog's author ID
    const { loading, author } = useAuthorDetails(blog.author.id);
    // Fallback content while loading or if no bio exists
    const authorBio = loading 
        ? "Loading bio..." 
        : author?.bio || "";

        return (
            <div className="px-4 md:px-4 w-full max-w-screen-xl mx-auto pt-5 md:pt-12">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                    {/* Main Content Column */}
                    <div className="md:col-span-8 lg:col-span-9">
                        <div className="text-3xl md:text-4xl font-extrabold break-words">
                            {blog.title}
                        </div>
                        <div className="text-slate-500 pt-2 text-sm md:text-base">
                            Posted on {formatDate(blog.createdAt)}
                        </div>
                        <div 
                            className="pt-4 blog-content break-words overflow-x-hidden"
                            dangerouslySetInnerHTML={{ __html: blog.content }} 
                        />
                    </div>
    
                    {/* Author Info Column */}
                    <div className="md:col-span-4 lg:col-span-3">
                        <div className="bg-slate-50 p-4 md:p-6 rounded-lg border border-slate-200">
                            <div className="text-slate-600 text-lg mb-4">
                                Author
                            </div>
                            <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0">
                                <div className="md:pr-4">
                                    <Avatar size="big" name={blog.author.name || "Anonymous"} />
                                </div>
                                <div className="text-center md:text-left">
                                    <div className="text-xl font-semibold break-words">
                                        {blog.author.name || "Anonymous"}
                                    </div>
                                    <div className="pt-2 text-slate-500 text-sm md:text-base">
                                        {authorBio}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

// Default prop value
FullBlog.defaultProps = {
    blog: {
        content: "",
        title: "",
        id: "",
        author: {
            name: "Anonymous",
            id: ""
        },
        createdAt: new Date()
    }
};