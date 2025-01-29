import { Link } from "react-router-dom";

interface BlogCardProps {
    authorName: string;
    title: string;
    content: string;
    createdAt: Date;
    id: string;
}

export const BlogCard = ({
    id,
    authorName,
    title,
    content,
    createdAt
}: BlogCardProps) => {
    // Format date function
    const formatDate = (date: Date) => {
        return new Intl.DateTimeFormat('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        }).format(date);
    };

    // Function to strip HTML tags from content
    const stripHtmlTags = (html: string) => {
        const doc = new DOMParser().parseFromString(html, 'text/html');
        return doc.body.textContent || '';
    };

    // Process content
    const plainTextContent = stripHtmlTags(content);
    const truncatedContent = plainTextContent.slice(0, 100) + 
        (plainTextContent.length > 100 ? "..." : "");

    return (
        <Link to={`/blog/${id}`} className="no-underline">
            <div className="p-3 md:p-4 border-b border-slate-200 md:border-slate-400 pb-4 w-full max-w-screen-md cursor-pointer hover:bg-slate-50 transition-colors">
                {/* Author Info Row */}
                <div className="flex items-center flex-wrap gap-2">
                    <Avatar name={authorName} size="small" />
                    <div className="font-extralight text-xs md:text-sm text-slate-800">
                        {authorName}
                    </div>
                    <Circle />
                    <div className="font-thin text-xs md:text-sm text-slate-500">
                        {formatDate(createdAt)}
                    </div>
                </div>

                {/* Title */}
                <div className="text-lg md:text-xl font-semibold pt-2">
                    {title}
                </div>

                {/* Content Preview */}
                <div className="text-sm md:text-md font-thin pt-1 text-slate-700">
                    {truncatedContent}
                </div>

                {/* Read Time */}
                <div className="text-slate-400 text-xs sm:text-sm font-thin pt-3 md:pt-4">
                    {`${Math.ceil(plainTextContent.length / 400)} minute(s) read`}
                </div>
            </div>
        </Link>
    );
};

function Circle() {
    return <div className="h-1 w-1 mx-1 md:mx-2 rounded-full bg-slate-400"></div>;
}

interface AvatarProps {
    name: string;
    size: "small" | "big";
}

export function Avatar({ name, size = "small" }: AvatarProps) {
    const displayName = name.trim() || 'Anonymous';
    const avatarSize = size === "small" 
        ? "w-5 h-5 text-xs md:w-6 md:h-6" 
        : "w-8 h-8 text-sm md:w-10 md:h-10";

    return (
        <div className={`inline-flex items-center justify-center overflow-hidden bg-gray-200 rounded-full ${avatarSize}`}>
            <span className={`font-medium text-gray-600 ${size === "small" ? 'text-xs' : 'text-sm md:text-md'}`}>
                {displayName[0].toUpperCase()}
            </span>
        </div>
    );
}