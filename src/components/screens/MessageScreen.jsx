"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import GradientButton from "../GradientButton"; // Make sure this is used if needed, or remove if unused
import { ArrowRight } from "lucide-react";

export default function MessageScreen({ onNext }) {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [showCursor, setShowCursor] = useState(true)

    // Split the text into separate paragraphs so we can style them differently
    const p1 = "Happy Birthday, Meri Biwi! You deserve all the happiness, love, and smiles in the world today and always. You have this special way of making everything around you brighter, your smile, your kindness, and the way you make people feel truly cared for. I hope your day is filled with laughter, surprises, and moments that make your heart happy. You're truly one of a kind, and I just want you to know how special you are. Keep being the amazing person you are, spreading joy wherever you go. Wishing you endless happiness, success, and all the sweet things life has to offer. 💗 Keep being the amazing person you are, spreading joy wherever you go. Wishing you endless happiness,"

    const p2 = "I Love u bhot bhot bhot bhot bhot saaaaaaarrrraaaaaaa 👀💋💋💋💋☺️"

    const p3 = "Muuuuuuuuaaaaaaaaaahhhh Meri Biwi 👀💋💋💋💋"

    const totalLength = p1.length + p2.length + p3.length

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => {
                if (prev < totalLength) {
                    return prev + 1
                } else {
                    clearInterval(timer)
                    setShowCursor(false)
                    return prev
                }
            })
        }, 30)

        return () => clearInterval(timer)
    }, [totalLength])

    // Reusable cursor component to keep the code clean
    const BlinkingCursor = () => (
        <motion.span
            className="inline-block w-0.5 h-4 md:h-5 bg-purple-600 ml-1 align-middle"
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 0.8, repeat: Infinity }}
        />
    )

    return (
        <div className="px-4 md:px-6 py-10 text-center">
            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-3xl md:text-5xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-fuchsia-400 to-purple-400 drop-shadow mb-6 leading-tight"
            >
                A Special Message 💕
            </motion.h2>

            {/* Changed to flex-col and items-center to stack the box and button vertically */}
            <div className="mx-auto relative w-full max-w-3xl flex flex-col items-center">

                {/* Text Box */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="h-auto max-w-xl w-full bg-gradient-to-br from-pink-200 via-pink-100 to-pink-50 rounded-2xl shadow-lg p-4 md:p-6 overflow-y-auto max-h-[600px]"
                >

                    {/* Paragraph 1: Left Aligned */}
                    <div className="text-left text-[#301733] text-base md:text-lg leading-relaxed mb-6">
                        {p1.slice(0, currentIndex)}
                        {showCursor && currentIndex <= p1.length && <BlinkingCursor />}
                    </div>

                    {/* Paragraph 2: Center Aligned */}
                    {currentIndex > p1.length && (
                        <div className="text-center text-[#301733] text-base md:text-lg leading-relaxed mb-6">
                            {p2.slice(0, currentIndex - p1.length)}
                            {showCursor && currentIndex > p1.length && currentIndex <= p1.length + p2.length && <BlinkingCursor />}
                        </div>
                    )}

                    {/* Paragraph 3: Center Aligned */}
                    {currentIndex > p1.length + p2.length && (
                        <div className="text-center text-[#301733] text-base md:text-lg leading-relaxed">
                            {p3.slice(0, currentIndex - p1.length - p2.length)}
                            {showCursor && currentIndex > p1.length + p2.length && <BlinkingCursor />}
                        </div>
                    )}
                </motion.div>

                {/* Continue Button - Moved outside the text box */}
                {currentIndex >= totalLength && (
                    <motion.div
                        className="relative z-20 mt-8"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ type: "spring", stiffness: 200 }}
                    >
                        <button
                            onClick={onNext}
                            className="bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 hover:from-pink-500 hover:via-purple-500 hover:to-indigo-500 text-white text-lg sm:text-xl px-6 sm:px-8 py-3 sm:py-4 rounded-full shadow-xl border-2 border-white/70 transition-all duration-300 hover:scale-[103%]"
                        >
                            <motion.div
                                className="flex items-center justify-center space-x-2"
                                whileHover={{ x: 5, transition: { type: "spring", stiffness: 300 } }}
                            >
                                <span>Continue</span>
                                <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6" />
                            </motion.div>
                        </button>
                    </motion.div>
                )}

            </div>
        </div>
    )
}