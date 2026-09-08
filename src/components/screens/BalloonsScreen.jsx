"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Heart, RotateCcw } from "lucide-react"

// MOVED OUTSIDE: This prevents the balloons from unmounting and remounting on every click!
const BalloonComponent = ({ balloon }) => (
  <motion.div
    className="relative flex items-center justify-center will-change-transform"
    initial={{ y: "100vh", scale: 0.3, opacity: 0 }}
    animate={{
      y: 0,
      scale: 1,
      opacity: 1,
      rotate: [-5, 5, -5],
    }}
    transition={{
      y: { delay: 1.2, duration: 2, ease: "easeOut" },
      scale: { duration: 1.5, ease: "backOut" },
      opacity: { duration: 1 },
      rotate: {
        duration: 3.5,
        repeat: Infinity,
        ease: "easeInOut",
      },
    }}
  >
    <div className="relative">
      {/* string */}
      <svg
        className="absolute top-[87.6%] left-1/2"
        width="2"
        height="100"
        viewBox="0 0 2 110"
      >
        <path
          d="M1 0 Q 3 30, 1 60 T 1 110"
          stroke="rgba(255, 255, 255, 0.15)"
          strokeWidth="1.5"
          fill="none"
        />
      </svg>

      {/* balloon circle */}
      <div className="relative">
        <motion.div
          className="relative w-24 h-24 md:w-32 md:h-32 flex items-center justify-center"
          whileHover={{ scale: 1.05 }}
        >
          <Heart
            className={`absolute inset-0 w-full h-full ${balloon.color} stroke-inherit`}
          />
          <span className="text-white font-bold text-2xl md:text-3xl z-10">
            {balloon.text}
          </span>
        </motion.div>
      </div>
    </div>
  </motion.div>
)

export default function BalloonsScreen({ onNext, onRestart }) {
  const [floatingHearts, setFloatingHearts] = useState([])

  const balloons = [
    { text: "I", color: "fill-pink-500/50" },
    { text: "Love", color: "fill-rose-500/50" },
    { text: "You", color: "fill-purple-500/50" },
    { text: "Rashmi", color: "fill-fuchsia-500/50" },
  ]

  const handleLoveClick = () => {
    // Generate 60 random hearts with completely unique IDs for multiple clicks
    const newHearts = Array.from({ length: 60 }).map(() => ({
      id: crypto.randomUUID ? crypto.randomUUID() : Date.now() + Math.random(),
      left: Math.random() * 100, // random horizontal position 0-100vw
      size: Math.random() * 1.5 + 0.5, // random scale 0.5x to 2x
      duration: Math.random() * 2 + 1.5, // 1.5s to 3.5s float duration
      delay: Math.random() * 0.3, // slight delay for a burst effect
      color: ["fill-pink-500", "fill-rose-500", "fill-red-500", "fill-purple-500"][
        Math.floor(Math.random() * 4)
      ]
    }))

    // Append new hearts so multiple clicks stack
    setFloatingHearts((prev) => [...prev, ...newHearts])

    // Cleanup these specific hearts from the DOM after their animation completes (~4 seconds)
    setTimeout(() => {
      setFloatingHearts((prev) =>
        prev.filter((heart) => !newHearts.some((nh) => nh.id === heart.id))
      )
    }, 4000)
  }

  return (
    <>
      <motion.div
        className="min-h-screen flex flex-col items-center justify-center px-4 py-6 relative z-10 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
      >
        {/* Heading & text */}
        <motion.div
          className="text-center max-w-2xl mx-auto mt-8"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          <h1 className="text-3xl md:text-4xl text-pink-200 leading-tight font-semibold ">
            Muuuuuuaaaaaaaaaaaahhh{" "}
            <span className="text-pink-400 font-bold">👀💋💋💋💋💋💋</span>
          </h1>
          <motion.p
            className="text-pink-300/80 text-lg mt-4 italic"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          ></motion.p>
        </motion.div>

        {/* Balloons container */}
        <div className="flex flex-col items-center gap-8 md:gap-12 mt-10 h-auto">
          {/* Top Row: I, Love, You */}
          <div className="flex gap-4 md:gap-8 justify-center">
            {balloons.slice(0, 3).map((balloon, index) => (
              <BalloonComponent key={index} balloon={balloon} />
            ))}
          </div>
          {/* Bottom Row: R (Centered) */}
          <div className="flex justify-center">
            <BalloonComponent balloon={balloons[3]} />
          </div>
        </div>

        {/* Buttons container */}
        <motion.div
          className="text-center mt-12 flex flex-col items-center z-20"
          initial={{ y: 50, scale: 0.8, opacity: 0 }}
          animate={{ y: 0, scale: 1, opacity: 1 }}
          transition={{
            delay: 3.5,
            type: "spring",
            stiffness: 200,
            damping: 20,
          }}
        >
          <motion.p
            className="text-pink-300/80 text-sm mb-6"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Uuuummmmmmmmmmmmmaaaaaaaaaaaaaaahhhhhhhhh👀💋💋💋💋💋💋
          </motion.p>

          {/* Endless Hearts Button */}
          <motion.button
            onClick={handleLoveClick}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-pink-500 via-pink-600 to-red-500 hover:from-pink-600 hover:via-pink-700 hover:to-red-600 text-white px-8 py-4 text-lg font-semibold rounded-full transition-all duration-300 hover:scale-105 shadow-2xl flex items-center justify-center cursor-pointer mb-6"
          >
            <Heart className="w-5 h-5 mr-2 fill-current" />
            Love You 
          </motion.button>

          {/* Repeat / Main Menu Button */}
          <motion.button
            onClick={() => {
              
                window.location.reload();
              
            }}
            className="flex items-center justify-center text-pink-300 hover:text-pink-100 transition-colors text-sm underline opacity-80 hover:opacity-100 cursor-pointer"
           >
            <RotateCcw className="w-4 h-4 mr-2" />
            Repeat from Start
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Render the floating hearts burst */}
      <AnimatePresence>
        {floatingHearts.map((heart) => (
          <motion.div
            key={heart.id}
            className="fixed pointer-events-none z-50 bottom-0"
            style={{ left: `${heart.left}vw` }}
            initial={{ y: "100%", scale: heart.size, opacity: 1 }}
            animate={{ y: "-120vh", opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: heart.duration,
              delay: heart.delay,
              ease: "easeOut",
            }}
          >
            <Heart className={`w-8 h-8 ${heart.color} text-transparent`} />
          </motion.div>
        ))}
      </AnimatePresence>
    </>
  )
}