import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";
import DOMPurify from 'dompurify';

export interface Blog {
    content: string;
    title: string;
    id: string;
    author: {
        name: string;
        id:string;
    };
    createdAt: Date;
}

export const useBlog = ({ id }: { id: string }) => {
    const [loading, setLoading] = useState(true);
    const [blog, setBlog] = useState<Blog | undefined>(undefined);
    const [authorId, setAuthorId] = useState<string | null>(null);

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const response = await axios.get(`${BACKEND_URL}/api/v1/blog/${id}`, {
                    headers: {
                        Authorization: localStorage.getItem("token")
                    }
                });

                const fetchedBlog = response.data.blog;
                const sanitizedContent = DOMPurify.sanitize(fetchedBlog.content);

                setBlog({
                    ...fetchedBlog,
                    content: sanitizedContent
                });

                // Set the extracted authorId
                setAuthorId(fetchedBlog.author.id);
                setLoading(false);
            } catch (error) {
                console.error('Failed to fetch blog:', error);
                setBlog(undefined);
                setAuthorId(null);
                setLoading(false);
            }
        };

        if (id) {
            fetchBlog();
        } else {
            setLoading(false);
        }
    }, [id]);

    return {
        loading,
        blog,
        authorId, // Return the authorId
    };
};


export const useBlogs = (page: number = 1, limit: number = 10) => {
    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [pagination, setPagination] = useState<{
        total: number;
        page: number;
        limit: number;
        totalPages: number;
        hasNext: boolean;
    }>({
        total: 0,
        page: 1,
        limit: 10,
        totalPages: 0,
        hasNext: false
    });

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await axios.get(`${BACKEND_URL}/api/v1/blog/bulk`, {
                    headers: {
                        Authorization: localStorage.getItem("token")
                    },
                    params: {
                        page,
                        limit
                    }
                });

                // Convert string dates to Date objects
                const blogsWithDates = response.data.blogs.map((blog: any) => ({
                    ...blog,
                    createdAt: new Date(blog.createdAt) // Convert string to Date
                }));
                
                setBlogs(blogsWithDates);
                setPagination(response.data.pagination);
                setLoading(false);
            } catch (error) {
                console.error('Failed to fetch blogs:', error);
                setBlogs([]);
                setLoading(false);
            }
        };

        fetchBlogs();
    }, [page, limit]);

    return {
        loading,
        blogs,
        pagination
    };
};

// Add this to your hooks file (where useBlog and useBlogs are)
export const useUserDetails = () => {
    const [loading, setLoading] = useState(true);
    const [id, setId] = useState<string | null>(null);
    const [name, setName] = useState<string | null>(null);
    const [bio, setBio] = useState<string | null>(null);

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const response = await axios.get(`${BACKEND_URL}/api/v1/user/details`, {
                    headers: {
                        Authorization: localStorage.getItem("token"),
                    },
                });

                setId(response.data.id);  // Store the user ID
                setName(response.data.name);
                setBio(response.data.bio);
            } catch (error) {
                console.error("Failed to fetch user details:", error);
                setId(null);
                setName(null);
                setBio(null);
            } finally {
                setLoading(false);
            }
        };

        fetchDetails();
    }, []);

    return { loading, id, name, bio };
};


export const useDeleteBlog = () => {
    const deleteBlog = async (id: string) => {
        try {
            await axios.delete(`${BACKEND_URL}/api/v1/blog/${id}`, {
                headers: {
                    Authorization: localStorage.getItem("token")
                }
            });
            return true;
        } catch (error) {
            console.error('Delete failed:', error);
            return false;
        }
    };

    return { deleteBlog };
};

export const useUpdateBio = () => {
    const updateBio = async (newBio: string) => {
        try {
            await axios.put(`${BACKEND_URL}/api/v1/user/bio`, { bio: newBio }, {
                headers: {
                    Authorization: localStorage.getItem("token"),
                    'Content-Type': 'application/json'
                }
            });
            return true;
        } catch (error) {
            console.error('Failed to update bio:', error);
            return false;
        }
    };

    return { updateBio };
};

// New hook for fetching any user's details
export const useAuthorDetails = (userId: string) => {
    const [loading, setLoading] = useState(true);
    const [author, setAuthor] = useState<{ name: string; bio: string } | null>(null);

    useEffect(() => {
        const fetchAuthorDetails = async () => {
            try {
                const response = await axios.get(
                    `${BACKEND_URL}/api/v1/user/${userId}/details`
                );
                setAuthor(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Failed to fetch author details:', error);
                setAuthor(null);
                setLoading(false);
            }
        };

        fetchAuthorDetails();
    }, [userId]);

    return { loading, author };
};

export const useUserBlogs = () => {
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUserBlogs = async () => {
            try {
                const response = await axios.get(`${BACKEND_URL}/api/v1/blog/bulk1`, {
                    headers: {
                        Authorization: localStorage.getItem("token")
                    }
                });

                if (!response.data.blogs) {
                    setError('Failed to fetch blogs');
                    setBlogs([]);
                } else {
                    // Convert string dates to Date objects
                    const blogsWithDates = response.data.blogs.map((blog: any) => ({
                        ...blog,
                        createdAt: new Date(blog.createdAt) // Convert string to Date
                    }));
                    setBlogs(blogsWithDates);
                    setError(null);
                }
            } catch (err) {
                console.error("Error fetching user blogs:", err);
                setError('Network error, failed to fetch blogs');
                setBlogs([]);
            } finally {
                setLoading(false);
            }
        };

        fetchUserBlogs();
    }, []);

    return { blogs, loading, error };
};

