export function createAtmosphere(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext('2d', { alpha: true })
  if (!ctx) return () => {}
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const particles = Array.from({ length: 34 }, () => ({
    x: Math.random(), y: Math.random(), r: Math.random() * 1.1 + .25,
    a: Math.random() * .32 + .08, s: Math.random() * .00014 + .00004,
  }))
  let w = 0, h = 0, raf = 0, lastFrame = 0, visible = !document.hidden
  const resize = () => {
    const dpr = Math.min(window.devicePixelRatio || 1, 1.35)
    w = canvas.clientWidth; h = canvas.clientHeight
    canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr)
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
  }
  const draw = (time = 0) => {
    if (!visible) return
    if (time - lastFrame < 32) { raf = requestAnimationFrame(draw); return }
    lastFrame = time
    ctx.clearRect(0, 0, w, h)
    particles.forEach(p => {
      if (!reducedMotion) { p.y -= p.s; if (p.y < -.02) p.y = 1.02 }
      ctx.beginPath(); ctx.arc(p.x * w, p.y * h, p.r, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(190,226,255,${p.a})`; ctx.fill()
    })
    if (!reducedMotion) raf = requestAnimationFrame(draw)
  }
  const onVisibility = () => {
    visible = !document.hidden
    cancelAnimationFrame(raf)
    if (visible) { lastFrame = 0; draw() }
  }
  resize(); draw()
  window.addEventListener('resize', resize, { passive: true })
  document.addEventListener('visibilitychange', onVisibility)
  return () => {
    cancelAnimationFrame(raf)
    window.removeEventListener('resize', resize)
    document.removeEventListener('visibilitychange', onVisibility)
  }
}
