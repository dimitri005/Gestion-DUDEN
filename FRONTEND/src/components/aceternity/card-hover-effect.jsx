import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"

export function HoverEffect({ items, className }) {
  const [hoveredIndex, setHoveredIndex] = useState(null)

  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2", className)}>
      {items.map((item, idx) => (
        <div
          key={idx}
          className="relative group block p-2 h-full w-full"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
                className="absolute inset-0 h-full w-full block rounded-2xl"
                style={{ background: "rgba(13,43,107,0.08)" }}
                layoutId="hoverBackground"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { duration: 0.15 } }}
                exit={{ opacity: 0, transition: { duration: 0.15, delay: 0.2 } }}
              />
            )}
          </AnimatePresence>
          <div className={cn(
            "rounded-2xl h-full w-full p-4 overflow-hidden relative z-20",
            "bg-white border border-gray-100 shadow-sm",
            "group-hover:border-blue-200 transition-all duration-300"
          )}>
            <div className="relative z-50 p-2">
              {item.icon && (
                <div className="mb-3 text-2xl">{item.icon}</div>
              )}
              <h3 className="font-bold text-base mb-1" style={{ color: "#0D2B6B" }}>
                {item.title}
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                {item.description}
              </p>
              {item.badge && (
                <span className="inline-block mt-3 px-2 py-1 text-xs font-semibold rounded-full"
                  style={{ background: "#1E8A3C20", color: "#1E8A3C" }}>
                  {item.badge}
                </span>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}