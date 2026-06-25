import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

export function BackgroundGradient({ children, className, containerClassName }) {
  return (
    <div className={cn("relative p-[1px] rounded-2xl group", containerClassName)}>
      <motion.div
        className="absolute inset-0 rounded-2xl opacity-60 group-hover:opacity-100 transition duration-500"
        style={{
          background: "linear-gradient(135deg, #0D2B6B, #1E8A3C, #0D2B6B)",
          backgroundSize: "200% 200%",
        }}
        animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
      />
      <div className={cn("relative rounded-2xl bg-white dark:bg-zinc-900", className)}>
        {children}
      </div>
    </div>
  )
}