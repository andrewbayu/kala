export default function FilmHelix() {
  const N = 18
  const RADIUS = 64
  const FRAME_W = 44
  const FRAME_H = 58
  const HEIGHT_SPREAD = 360

  return (
    <div
      className="relative select-none pointer-events-none"
      style={{
        width: 200,
        height: HEIGHT_SPREAD + 80,
        perspective: '520px',
        perspectiveOrigin: '50% 50%',
      }}
    >
      <div
        style={{
          width: '100%',
          height: '100%',
          transformStyle: 'preserve-3d',
          animation: 'helix-spin 16s linear infinite',
          position: 'relative',
        }}
      >
        {Array.from({ length: N }, (_, i) => {
          const angle = (i / N) * 360
          const yOffset = (i / (N - 1)) * HEIGHT_SPREAD - HEIGHT_SPREAD / 2
          return (
            <div
              key={i}
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                width: FRAME_W,
                height: FRAME_H,
                marginLeft: -FRAME_W / 2,
                marginTop: -FRAME_H / 2,
                transform: `translateY(${yOffset}px) rotateY(${angle}deg) translateZ(${RADIUS}px)`,
                backfaceVisibility: 'hidden',
              }}
            >
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  border: '1px solid rgba(212, 168, 83, 0.5)',
                  background: 'rgba(10, 7, 2, 0.92)',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                {/* Left sprocket holes */}
                <div style={{ position: 'absolute', left: 3, top: 8, width: 4, height: 4, borderRadius: 1, background: 'rgba(212,168,83,0.45)', border: '0.5px solid rgba(212,168,83,0.7)' }} />
                <div style={{ position: 'absolute', left: 3, bottom: 8, width: 4, height: 4, borderRadius: 1, background: 'rgba(212,168,83,0.45)', border: '0.5px solid rgba(212,168,83,0.7)' }} />
                {/* Right sprocket holes */}
                <div style={{ position: 'absolute', right: 3, top: 8, width: 4, height: 4, borderRadius: 1, background: 'rgba(212,168,83,0.45)', border: '0.5px solid rgba(212,168,83,0.7)' }} />
                <div style={{ position: 'absolute', right: 3, bottom: 8, width: 4, height: 4, borderRadius: 1, background: 'rgba(212,168,83,0.45)', border: '0.5px solid rgba(212,168,83,0.7)' }} />
                {/* Inner image area */}
                <div style={{ position: 'absolute', top: 10, bottom: 10, left: 11, right: 11, border: '0.5px solid rgba(212,168,83,0.18)', background: 'rgba(212,168,83,0.025)' }} />
                {/* Top sheen */}
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(160deg, rgba(212,168,83,0.07) 0%, transparent 55%)' }} />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
