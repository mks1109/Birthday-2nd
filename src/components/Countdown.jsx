"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Gift, Heart, Cake } from "lucide-react"

export default function Countdown({ birthdayDate, onComplete }) {
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    })

    useEffect(() => {
        if (!birthdayDate) return

        const updateCountdown = () => {
            const now = new Date().getTime()
            const target = new Date(birthdayDate).getTime()
            const distance = target - now

            if (distance <= 0) {
                setTimeLeft({
                    days: 0,
                    hours: 0,
                    minutes: 0,
                    seconds: 0,
                })

                onComplete?.()
                return true
            }

            setTimeLeft({
                days: Math.floor(distance / (1000 * 60 * 60 * 24)),
                hours: Math.floor(
                    (distance % (1000 * 60 * 60 * 24)) /
                        (1000 * 60 * 60)
                ),
                minutes: Math.floor(
                    (distance % (1000 * 60 * 60)) / (1000 * 60)
                ),
                seconds: Math.floor((distance % (1000 * 60)) / 1000),
            })

            return false
        }

        const completed = updateCountdown()

        if (completed) return

        const timer = setInterval(() => {
            const completed = updateCountdown()

            if (completed) {
                clearInterval(timer)
            }
        }, 1000)

        return () => clearInterval(timer)
    }, [birthdayDate, onComplete])

    const timeUnits = [
        {
            label: "Days",
            value: timeLeft.days,
            color: "from-pink-400 to-rose-500",
            shadow: "rgba(244, 63, 94, 0.5)",
        },
        {
            label: "Hours",
            value: timeLeft.hours,
            color: "from-purple-400 to-pink-500",
            shadow: "rgba(217, 70, 239, 0.5)",
        },
        {
            label: "Minutes",
            value: timeLeft.minutes,
            color: "from-indigo-400 to-purple-500",
            shadow: "rgba(168, 85, 247, 0.5)",
        },
        {
            label: "Seconds",
            value: timeLeft.seconds,
            color: "from-blue-400 to-indigo-500",
            shadow: "rgba(99, 102, 241, 0.5)",
        },
    ]

    const heartShapeMask = "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z'/%3E%3C/svg%3E\")"

    return (
        <motion.div
            className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.8 }}
        >
            {/* Header */}
            <motion.div
                className="text-center mb-12"
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
            >
                <motion.div
                    className="mb-6"
                    animate={{
                        scale: [1, 1.15, 1, 1.15, 1],
                        rotate: [0, 5, -5, 0],
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                >
                    <Cake 
                        className="w-16 h-16 text-pink-400 mx-auto drop-shadow-[0_0_15px_rgba(236,72,153,0.8)]" 
                    />
                </motion.div>

                <motion.h1
                    className="text-4xl md:text-6xl py-1 md:py-2 font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 mb-4"
                    style={{
                        filter: "drop-shadow(0 0 25px rgba(236, 72, 153, 0.3))",
                    }}
                >
                    For My Beautiful Soulmate
                </motion.h1>

                <p className="text-sm md:text-base text-gray-400 italic">
                    Time moves so slowly when I'm waiting to celebrate you.
                </p>
            </motion.div>

            {/* Countdown */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 max-w-4xl w-full place-items-center">
                {timeUnits.map((unit, index) => (
                    <motion.div
                        key={unit.label}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{
                            delay: 0.5 + index * 0.1,
                            type: "spring",
                            stiffness: 200,
                        }}
                    >
                        {/* Shadow Wrapper */}
                        <div 
                            style={{ filter: `drop-shadow(0 0 25px ${unit.shadow})` }}
                            className="relative w-36 h-36 md:w-48 md:h-48"
                        >
                            {/* Pulsing Heart Shape */}
                            <motion.div
                                animate={{ scale: [1, 1.05, 1] }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                    delay: index * 0.2
                                }}
                                className={`w-full h-full bg-gradient-to-br ${unit.color} flex flex-col items-center justify-center pb-4 md:pb-6`}
                                style={{
                                    WebkitMaskImage: heartShapeMask,
                                    WebkitMaskSize: "contain",
                                    WebkitMaskRepeat: "no-repeat",
                                    WebkitMaskPosition: "center",
                                    maskImage: heartShapeMask,
                                    maskSize: "contain",
                                    maskRepeat: "no-repeat",
                                    maskPosition: "center",
                                }}
                            >
                                <motion.div
                                    key={unit.value}
                                    className="text-3xl md:text-5xl font-bold text-white mt-4 drop-shadow-md"
                                    initial={{ scale: 1.2, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    {unit.value.toString().padStart(2, "0")}
                                </motion.div>

                                <div className="text-white/90 text-xs md:text-sm font-medium uppercase tracking-widest mt-1">
                                    {unit.label}
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Footer */}
            <motion.div
                className="mt-16 text-center flex flex-col items-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
            >
                <Gift className="w-6 h-6 text-purple-400 mb-3" />
                
                <p className="text-gray-400 text-sm flex items-center gap-2">
                    Your magical moment is almost here... 💖 
                </p>
            </motion.div>
        </motion.div>
    )
}