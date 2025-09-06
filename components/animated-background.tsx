"use client"

export function AnimatedBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Floating spheres with blur effect */}
      <div className="absolute top-20 left-20 w-32 h-32 bg-primary/20 rounded-full blur-xl animate-float" />
      <div className="absolute top-40 right-32 w-24 h-24 bg-secondary/30 rounded-full blur-lg animate-float-delayed" />
      <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-accent/15 rounded-full blur-2xl animate-float-slow" />
      <div className="absolute bottom-20 right-20 w-28 h-28 bg-primary/25 rounded-full blur-xl animate-float" />
      <div className="absolute top-1/2 left-1/2 w-36 h-36 bg-secondary/20 rounded-full blur-2xl animate-float-delayed transform -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute top-16 left-1/3 w-20 h-20 bg-accent/25 rounded-full blur-lg animate-float-slow" />
    </div>
  )
}
