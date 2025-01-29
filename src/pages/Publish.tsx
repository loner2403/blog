import { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { AppBar } from "../components/AppBar";
import axios from 'axios';
import { BACKEND_URL } from '../config';
import { useNavigate } from 'react-router-dom';
import { BlogCardSkeleton } from '../components/Skeleton'; // Import your skeleton component
import { motion } from 'framer-motion';

// Define modules and formats for ReactQuill
const modules = {
    toolbar: [
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        ['link', 'image'],
        [{ 'font': [] }],
        [{ 'align': [] }],
        ['code-block'],
        ['clean']
    ]
};

const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike',
    'list', 'bullet',
    'link', 'image',
    'font',
    'align',
    'code-block'
];

const TextEditor = ({ content, setContent }: { content: string, setContent: (value: string) => void }) => {
    return (
        <motion.div className="editor-container mt-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <ReactQuill
                theme="snow"
                value={content}
                onChange={setContent}
                modules={modules}
                formats={formats}
                className="h-full"
            />
        </motion.div>
    );
};

export const Publish = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [isPublishing, setIsPublishing] = useState(false);
    const navigate = useNavigate();

    const handlePublish = async () => {
        if (!title.trim() || !content.trim()) {
            alert("Please provide both title and content");
            return;
        }
        setIsPublishing(true);
        try {
            const response = await axios.post(`${BACKEND_URL}/api/v1/blog`, {
                title,
                content
            }, {
                headers: {
                    Authorization: localStorage.getItem("token")
                }
            });
            navigate(`/blog/${response.data.id}`);
        } catch (error) {
            console.error('Error publishing blog post:', error);
            alert('Failed to publish blog post. Please try again.');
        } finally {
            setIsPublishing(false);
        }
    };

    if (isPublishing) {
        return (
            <div className="bg-gray-100 min-h-screen flex items-center justify-center">
                <AppBar />
                <div className="max-w-screen-lg w-full">
                    <BlogCardSkeleton />
                    <BlogCardSkeleton />
                    <BlogCardSkeleton />
                </div>
            </div>
        );
    }

    return (
        <div >
            <AppBar />
            <div className='flex item-center justify-center mt-4'>
            <motion.div
                className="max-w-screen-lg w-full bg-white p-8 rounded-lg shadow-md mt-4 " // Add margin top here
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
            >
                <div className="flex flex-col space-y-4">
                    <input
                        type="text"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        disabled={isPublishing}
                    />
                    <TextEditor content={content} setContent={setContent} />
                    <button
                        onClick={handlePublish}
                        disabled={isPublishing}
                        className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isPublishing ? 'Publishing...' : 'Publish'}
                    </button>
                </div>
            </motion.div>
            </div>
        </div>
    );
};
