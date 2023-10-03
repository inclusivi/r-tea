'use client';

import { motion } from "framer-motion";

export const AnimateButton = ({
    children, type
}: {
    children: React.ReactNode, 
    type?: string
}) => {
    switch (type) {
        case 'scale':
        default:
            return (
                <motion.div whileHover={{ scale: 1 }} whileTap={{ scale: 0.9 }}>
                    {children}
                </motion.div>
            );
    }
}