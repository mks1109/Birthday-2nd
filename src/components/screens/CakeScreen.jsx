"use client"

import { useState, useMemo } from "react"
import { AnimatePresence, motion } from "framer-motion"
import confetti from "canvas-confetti"
import GradientButton from "../GradientButton"
import { ArrowRight, Flame, WandSparkles } from "lucide-react"

const confettiColors = ["#FF3CAC", "#F687B3", "#D8B4FE", "#C084FC", "#F472B6"];

// Persistent background glitters component
function PersistentGlitters({ count = 80 }) {
  const particles = useMemo(() => {
    return Array.from({ length: count }, (_, i) => {
      const colors = ["#F472B6", "#FFD700", "#FBCFE8", "#D8B4FE"];
      return {
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        opacity: Math.random() * 0.6 + 0.2,
        animationDelay: Math.random() * 5,
        animationDuration: Math.random() * 4 + 3,
      };
    });
  }, [count]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: particle.color,
            filter: `drop-shadow(0 0 3px ${particle.color})`,
          }}
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0, particle.opacity, 0],
            y: [`${particle.y}%`, `${particle.y - 5}%`],
          }}
          transition={{
            duration: particle.animationDuration,
            delay: particle.animationDelay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

function PremiumStrawberryCake({ lit, decorated }) {
  return (
    <div className="flex flex-col items-center relative z-10">
      <style>{`
        .premium-cake-wrapper { position: relative; width: 250px; height: 260px; margin: 0 auto; margin-top: 20px; }
        
        .cake-plate { position: absolute; bottom: -10px; left: 50%; transform: translateX(-50%); width: 280px; height: 40px; background: #f8fafc; border-radius: 50%; box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1), inset 0 -4px 10px rgba(0,0,0,0.05); border-bottom: 6px solid #cbd5e1; z-index: 1; }
        
        .cake-tier { position: absolute; left: 50%; transform: translateX(-50%); background: linear-gradient(to right, #fbcfe8, #f472b6, #fbcfe8); box-shadow: inset 0 -5px 15px rgba(190, 24, 93, 0.3), inset 0 5px 10px rgba(255, 255, 255, 0.5); border-radius: 10px; }
        
        /* Z-indexes inverted so bottom overlaps middle, and middle overlaps top */
        .tier-bottom { bottom: 15px; width: 220px; height: 85px; z-index: 4; background: linear-gradient(to right, #fce7f3, #f9a8d4, #fce7f3); }
        .tier-middle { bottom: 90px; width: 170px; height: 75px; z-index: 3; background: linear-gradient(to right, #fbcfe8, #f472b6, #fbcfe8); }
        .tier-top { bottom: 155px; width: 120px; height: 65px; z-index: 2; background: linear-gradient(to right, #f9a8d4, #ec4899, #f9a8d4); }
        
        /* Strawberry Sauce Drips */
        .drip-container { position: absolute; width: 100%; height: 100%; top: 0; left: 0; z-index: 5; pointer-events: none; }
        .drip { position: absolute; top: -5px; background: #be185d; border-radius: 0 0 10px 10px; }
        .d1 { left: 10%; width: 15%; height: 35px; }
        .d2 { left: 35%; width: 12%; height: 45px; }
        .d3 { left: 60%; width: 18%; height: 25px; }
        .d4 { left: 85%; width: 10%; height: 40px; }

        /* Strawberries on top fixed to sit exactly on the top tier */
        .strawberries { position: absolute; bottom: 218px; left: 50%; transform: translateX(-50%); width: 100px; height: 30px; z-index: 6; display: flex; justify-content: space-evenly; align-items: flex-end; }
        .strawberry { width: 22px; height: 26px; background: #e11d48; border-radius: 50% 50% 10% 10%; position: relative; box-shadow: inset -3px -3px 5px rgba(0,0,0,0.2); }
        .strawberry::after { content: ''; position: absolute; top: -4px; left: 50%; transform: translateX(-50%); width: 12px; height: 8px; background: #16a34a; border-radius: 50%; }

        /* Pink Candle & Flame fixed to sit exactly on top tier */
        .pink-candle { position: absolute; bottom: 220px; left: 50%; transform: translateX(-50%); width: 12px; height: 45px; background: repeating-linear-gradient(45deg, #fff, #fff 4px, #db2777 4px, #db2777 8px); border-radius: 3px; z-index: 5; box-shadow: 2px 2px 4px rgba(0,0,0,0.1); }
        
        .flame { position: absolute; top: -32px; left: 50%; margin-left: -8px; width: 16px; height: 26px; background: radial-gradient(ellipse at bottom, #fde047 0%, #f59e0b 60%, transparent 100%); border-radius: 50% 50% 20% 20%; box-shadow: 0 0 15px #fbbf24, 0 0 30px #f59e0b; animation: flicker 0.4s infinite alternate; }
        
        /* Icing Text on Cake */
        .cake-icing-text { position: absolute; bottom: 25px; width: 100%; text-align: center; font-family: 'Brush Script MT', 'Comic Sans MS', cursive; color: #9d174d; font-size: 24px; font-weight: bold; z-index: 10; transform: rotate(-2deg); text-shadow: 1px 1px 0px rgba(255,255,255,0.6); pointer-events: none; }

        @keyframes flicker {
          0% { transform: scale(1) rotate(-2deg); opacity: 0.9; }
          100% { transform: scale(1.1) rotate(2deg); opacity: 1; }
        }
      `}</style>

      <div className="premium-cake-wrapper scale-[0.85] md:scale-100">
        <div className="cake-plate"></div>

        {/* Tiers */}
        <div className="cake-tier tier-bottom">
          {decorated && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
              <div className="drip-container"><div className="drip d1"></div><div className="drip d2"></div><div className="drip d3"></div><div className="drip d4"></div></div>
              <div className="cake-icing-text">Rashmi</div>
            </motion.div>
          )}
        </div>
        <div className="cake-tier tier-middle">
          {decorated && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.2 }}>
              <div className="drip-container"><div className="drip d1" style={{ height: '25px' }}></div><div className="drip d2" style={{ left: '40%', height: '35px' }}></div><div className="drip d4" style={{ left: '75%', height: '20px' }}></div></div>
              <div className="cake-icing-text ">Happy Birthday</div>
            </motion.div>

          )}
        </div>
        <div className="cake-tier tier-top">
          {decorated && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.4 }}>
              <div className="drip-container"><div className="drip d1" style={{ height: '20px' }}></div><div className="drip d3" style={{ left: '50%', height: '30px' }}></div></div>
            </motion.div>
          )}
        </div>

        {/* Strawberries on Top */}
        {decorated && (
          <motion.div
            className="strawberries"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            {/* <div className="strawberry" style={{ transform: 'rotate(-15deg)' }}></div>
            <div className="strawberry" style={{ transform: 'scale(1.1) translateY(-2px)' }}></div>
            <div className="strawberry" style={{ transform: 'rotate(15deg)' }}></div> */}
          </motion.div>
        )}

        {/* Striped Candle */}
        {decorated && (
          <motion.div
            className="pink-candle"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
          >
            {lit && (
              <motion.div
                initial={{ opacity: 0, scaleY: 0.2, y: 10 }}
                animate={{ opacity: 1, scaleY: 1, y: 0 }}
                transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1.0] }}
                className="flame"
              ></motion.div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default function CakeScreen({ onNext, onDecorate }) {
  const [decorated, setDecorated] = useState(false)
  const [lit, setLit] = useState(false)

  const decorate = () => {
    if (decorated) return
    setDecorated(true)
    setTimeout(() => {
      onDecorate?.()
    }, 500);
  }

  const lightCandle = () => {
    if (lit) return
    setLit(true)
    setTimeout(() => burst(), 500);
    setTimeout(() => burst(), 1000);
  }

  const burst = () => {
    confetti({
      particleCount: 140,
      spread: 90,
      origin: { y: 0.6 },
      colors: confettiColors,
    })
  }

  return (
    <div className="px-4 md:px-6 py-10 text-center relative min-h-screen flex flex-col justify-between overflow-hidden">

      <PersistentGlitters />

      <motion.div
        className="fixed top-16 md:top-20 left-0 w-full text-center text-[26px] md:text-3xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-rose-400 drop-shadow-sm leading-tight px-4 z-20"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
      </motion.div>

      <div className="relative flex flex-col items-center mt-56 md:mt-64 mb-40 z-10 w-full">
        <div className="relative">

          {/* Main Greeting positioned just above the candle */}
          {lit && (
            <motion.div
              className="absolute left-1/2 -translate-x-1/2 w-[90vw] md:w-max text-center text-[36px] md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 drop-shadow leading-tight z-30"
              style={{
                bottom: "100%",
                marginBottom: "40px",
                filter: "drop-shadow(0 0 15px rgba(255,105,180,0.5))"
              }}
              initial={{ opacity: 0, scale: 0.5, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", type: "spring", delay: 1.5 }}
            >
              Happy Birthday, Jaaneman! 💋
              <motion.p
                className="text-purple-300 text-lg mt-4"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                Muuuuuuuuuuaaaaaaaaaaahh... 👀💋💋💋
              </motion.p>
            </motion.div>

          )}

          <PremiumStrawberryCake lit={lit} decorated={decorated} />
        </div>

        {/* Button Controls */}
        <div className="fixed bottom-12 left-0 w-full flex justify-center px-4 z-20">
          <AnimatePresence mode="wait">
            {!decorated ? (
              <motion.div
                key="decorate"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.5 } }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <GradientButton onClick={decorate}>
                  <WandSparkles size={20} />
                  Decorate!💕
                </GradientButton>
              </motion.div>
            ) : !lit ? (
              <motion.div
                key="light"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1, transition: { duration: 0.5, delay: 1.5 } }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <GradientButton onClick={lightCandle}>
                  <Flame size={20} />
                  Light the Candle ✨
                </GradientButton>
              </motion.div>
            ) : (
              <motion.div
                key="next"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1, transition: { duration: 0.5, delay: 2 } }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <GradientButton onClick={onNext}>
                  Next
                  <ArrowRight size={20} className="mt-0.5" />
                </GradientButton>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div >
  )
}