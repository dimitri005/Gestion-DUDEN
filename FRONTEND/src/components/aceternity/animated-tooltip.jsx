import { cn } from "@/lib/utils"
import { motion, useTransform, AnimatePresence, useMotionValue, useSpring } from "framer-motion"
import { useState } from "react"

export function AnimatedTooltip({ items, className }) {
  const [hoveredIndex, setHoveredIndex] = useState(null)
  const springConfig = { stiffness: 100, damping: 5 }
  const x = useMotionValue(0)
  const rotate  = useSpring(useTransform(x, [-100, 100], [-45, 45]), springConfig)
  const translateX = useSpring(useTransform(x, [-100, 100], [-50, 50]), springConfig)

  return (
    <div className={cn("flex flex-row items-center justify-center gap-2", className)}>
      {items.map((item) => (
        <div
          key={item.id}
          className="relative group"
          onMouseEnter={() => setHoveredIndex(item.id)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence>
            {hoveredIndex === item.id && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.6 }}
                animate={{ opacity: 1, y: 0,  scale: 1,
                  transition: { type: "spring", stiffness: 260, damping: 10 }
                }}
                exit={{ opacity: 0, y: 20, scale: 0.6 }}
                style={{ rotate, translateX }}
                className="absolute -top-14 left-1/2 -translate-x-1/2 z-50
                  flex flex-col items-center justify-center
                  rounded-xl bg-white shadow-xl px-4 py-2
                  border border-gray-100 whitespace-nowrap"
              >
                <p className="text-xs font-bold" style={{ color: "#0D2B6B" }}>{item.name}</p>
                <p className="text-xs text-gray-400">{item.role}</p>
              </motion.div>
            )}
          </AnimatePresence>
          <img
            src={item.image}
            alt={item.name}
            className="w-10 h-10 rounded-full object-cover border-2 border-white
              group-hover:z-30 group-hover:scale-105 transition-transform duration-200
              relative cursor-pointer"
            style={{ borderColor: "#0D2B6B" }}
          />
        </div>
      ))}
    </div>
  )
}