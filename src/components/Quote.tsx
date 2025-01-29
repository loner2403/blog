import { motion } from "framer-motion";

export const Quote = () => {
    return (
        <div className="bg-gray-700 h-screen flex justify-center items-center">
            <motion.div
                className="max-w-lg p-6 bg-white rounded-lg shadow-lg"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
            >
                <div className="text-3xl font-bold text-gray-800">
                    "The customer service I received was exceptional. The support team went above and beyond to address my concerns."
                </div>
                <div className="text-left text-xl font-semibold mt-4 text-gray-900">
                    Julie Winfield
                </div>
                <div className="text-left text-md font-light text-gray-500">
                    CEO | Acme Corp
                </div>
            </motion.div>
        </div>
    );
};