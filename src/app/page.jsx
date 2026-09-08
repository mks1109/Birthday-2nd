"use client"

import { useState, useEffect, useRef } from "react" 
import { AnimatePresence, motion } from "framer-motion"

import LoaderScreen from "@/components/screens/LoaderScreen"
import IntroScreen from "@/components/screens/IntroScreen"
import CakeScreen from "@/components/screens/CakeScreen"
import PhotosScreen from "@/components/screens/PhotosScreen"
import MessageScreen from "@/components/screens/MessageScreen"
import Countdown from "@/components/Countdown"
import CuteLoader from "@/components/screens/CuteLoader"
import BalloonsScreen from "@/components/screens/BalloonsScreen"

export default function HomePage() {
  const [currentScreen, setCurrentScreen] = useState(0)

  // 🎶 Music setup for TWO tracks
  const audioRef1 = useRef(null)
  const audioRef2 = useRef(null)

  useEffect(() => {
    // First Song (Intro -> Cake)
    audioRef1.current = new Audio("/music/birthday.mp3") 
    audioRef1.current.loop = false
    audioRef1.current.volume = 0.7

    // Second Song (Photos -> End)
    // Make sure to replace this path with your actual second audio file!
    audioRef2.current = new Audio("/music/second-song.mp3") 
    audioRef2.current.loop = false
    audioRef2.current.volume = 0.7
  }, [])

  const playFirstMusic = () => {
    if (audioRef1.current) {
      audioRef1.current.play().catch((err) => {
        console.warn("Autoplay blocked, waiting for user gesture:", err)
      })
    }
  }

  // Function to switch from song 1 to song 2
  const switchMusic = () => {
    if (audioRef1.current) {
      audioRef1.current.pause() // Stop the first song
    }
    if (audioRef2.current) {
      audioRef2.current.play().catch((err) => {
        console.warn("Autoplay blocked, waiting for user gesture:", err)
      })
    }
  }

  const birthdayDate = new Date("2026-09-08T00:00:00")
  const [isBirthdayOver, setisBirthdayOver] = useState(new Date().getTime() >= birthdayDate.getTime())

  const screens = [
    <LoaderScreen key="loader" onDone={() => setCurrentScreen(1)} />,
    
    !isBirthdayOver
      ? <Countdown key="countdown" onComplete={() => setisBirthdayOver(true)} birthdayDate={birthdayDate} />
      : <IntroScreen key="intro" onNext={() => setCurrentScreen(2)} onMusicStart={playFirstMusic} />,

    // When moving from Cake to Photos (Index 2 to 3), trigger the music switch
    <CakeScreen key="cake" onNext={() => {
      setCurrentScreen(3)
      switchMusic() 
    }} />,
    
    <PhotosScreen key="photos" onNext={() => setCurrentScreen(4)} />,
    <MessageScreen key="message" onNext={() => setCurrentScreen(5)} />,
    <CuteLoader key="loader1" onComplete={() => setCurrentScreen(6)} />,
    <BalloonsScreen key="balloons" onNext={() => setCurrentScreen(7)} />,
  ]

  return (
    <main className="min-h-screen bg-gradient-to-tr from-rose-950/40 via-black to-rose-950/40 overflow-hidden relative">

      <div className="relative z-10 flex min-h-screen items-center justify-center p-4 md:p-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentScreen}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1, transition: { duration: 1 } }}
            exit={{ opacity: 0, transition: { duration: 0.8 } }}
            transition={{ duration: 0.8 }}
            className={`w-full ${currentScreen === 4 ? "max-w-7xl" : "max-w-3xl md:max-w-4xl"}`}
          >
            {screens[currentScreen]}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Watermark */}
      <motion.div
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{
          duration: 1,
          delay: 1,
        }}
        className="fixed bottom-4 right-4 text-sm text-white/40 pointer-events-none z-50 font-light">
      </motion.div>
    </main>
  )
}