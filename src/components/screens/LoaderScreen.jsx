"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export default function LoaderScreen({ onDone }) {
    const [count, setCount] = useState(3)
    const [floatingHearts, setFloatingHearts] = useState([])

    // Generate random floating hearts that drift continuously across the screen
    useEffect(() => {
        const hearts = Array.from({ length: 25 }).map((_, i) => {
            // Pick a random starting point
            const startX = Math.random() * 100
            const startY = Math.random() * 100
            
            return {
                id: i,
                size: 15 + Math.random() * 25, // Between 15px and 40px
                duration: 15 + Math.random() * 25, // Slow, peaceful drift (15s - 40s)
                opacity: 0.2 + Math.random() * 0.4, // Subtle randomized opacity
                // Generate 4 keyframes for x and y to create a wandering path
                // The last value is the same as the first to create a seamless infinite loop
                x: [
                    `${startX}vw`,
                    `${Math.random() * 100}vw`,
                    `${Math.random() * 100}vw`,
                    `${startX}vw`
                ],
                y: [
                    `${startY}vh`,
                    `${Math.random() * 100}vh`,
                    `${Math.random() * 100}vh`,
                    `${startY}vh`
                ],
                rotate: [0, 120, 240, 360]
            }
        })
        setFloatingHearts(hearts)
    }, [])

    useEffect(() => {
        const t = setInterval(() => {
            setCount((c) => {
                if (c <= 1) {
                    clearInterval(t)
                    setTimeout(() => onDone?.(), 420)
                    return 0
                }
                return c - 1
            })
        }, 900)
        return () => clearInterval(t)
    }, [onDone])

    return (
        <div className="w-full min-h-screen grid place-items-center relative overflow-hidden bg-transparent">
            {/* Continuous Drifting Background Hearts */}
            <div className="absolute inset-0 pointer-events-none z-0">
                {floatingHearts.map((heart) => (
                    <motion.div
                        key={heart.id}
                        className="absolute text-pink-500"
                        style={{ 
                            width: heart.size, 
                            height: heart.size,
                            opacity: heart.opacity 
                        }}
                        initial={{ x: heart.x[0], y: heart.y[0] }}
                        animate={{ 
                            x: heart.x,
                            y: heart.y,
                            rotate: heart.rotate
                        }}
                        transition={{
                            duration: heart.duration,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                    >
                        <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full drop-shadow-sm">
                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                        </svg>
                    </motion.div>
                ))}
            </div>

            {/* Main Foreground Content */}
            <div className="z-10 flex flex-col items-center justify-center">
                <div className="relative w-64 h-64 flex items-center justify-center">
                    <div className="spinner">
                        <div className="spinner1"></div>
                    </div>

                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                        {/* Main Pulsing Glowing Heart */}
                        <motion.div
                            animate={{ scale: [1, 1.06, 1] }}
                            transition={{ duration: 0.9, repeat: Infinity, ease: "easeInOut" }}
                            className="relative w-52 h-52 drop-shadow-[0_0_40px_rgba(217,70,239,0.3)] flex items-center justify-center"
                        >
                            <svg viewBox="0 0 24 24" className="w-full h-full drop-shadow-xl">
                                <defs>
                                    <linearGradient id="premiumHeart" x1="0%" y1="0%" x2="100%" y2="100%">
                                        <stop offset="0%" stopColor="#d41bc5ff" />
                                        <stop offset="50%" stopColor="#c8094cff" />
                                        <stop offset="100%" stopColor="#de0c0cff" />
                                    </linearGradient>
                                    
                                    {/* Inner shadow to give the heart a 3D embedded ring look */}
                                    <filter id="inner-shadow">
                                        <feOffset dx="0" dy="1"/>
                                        <feGaussianBlur stdDeviation="0.5" result="offset-blur"/>
                                        <feComposite operator="out" in="SourceGraphic" in2="offset-blur" result="inverse"/>
                                        <feFlood floodColor="black" floodOpacity="0.7" result="color"/>
                                        <feComposite operator="in" in="color" in2="inverse" result="shadow"/>
                                        <feComposite operator="over" in="shadow" in2="SourceGraphic"/>
                                    </filter>
                                </defs>

                                {/* Outer Glow Path */}
                                <path
                                    d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                                    fill="none"
                                    stroke="url(#premiumHeart)"
                                    strokeWidth="2.5"
                                    className="opacity-40"
                                />
                                {/* Main Thick 3D Path */}
                                <path
                                    d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                                    fill="url(#premiumHeart)"
                                    fillOpacity="0.1"
                                    stroke="url(#premiumHeart)"
                                    strokeWidth="1.2"
                                    filter="url(#inner-shadow)"
                                />
                            </svg>

                            {/* Countdown Number */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[55%]">
                                <motion.div
                                    key={count}
                                    initial={{ scale: 0.3, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    className="text-7xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white via-pink-200 to-purple-400 drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]"
                                >
                                    {count > 0 ? count : ""}
                                </motion.div>
                            </div>
                        </motion.div>
                    </div>
                </div>
                
                <motion.h1
                    className="text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-fuchsia-400 mt-14 text-center py-1.5"
                    animate={{ opacity: [0.8, 1, 0.8] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                    Crafting special moment... ✨
                </motion.h1>
                <motion.p
                    className="text-purple-300 text-lg mt-4"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                >
                    For someone very special... 👀💋
                </motion.p>
            </div>
        </div>
    )
}