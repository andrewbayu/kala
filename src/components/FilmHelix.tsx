export default function FilmHelix({ size = 1 }: { size?: number }) {
  const N = Math.round(18 * Math.sqrt(size))
  const RADIUS = Math.round(64 * size)
  const FRAME_W = Math.round(44 * size)
  const FRAME_H = Math.round(58 * size)
  const HEIGHT_SPREAD = Math.round(360 * size)

  return (
    <div
      className="relative select-none pointer-events-none"
      style={{
        width: Math.round(200 * size),
        height: HEIGHT_SPREAD + Math.round(80 * size),
        perspective: Math.round(520 * size),
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
                <div style={{ position: 'absolute', left: 3, top: 8, width: Math.max(3,Math.round(4*size)), height: Math.max(3,Math.round(4*size)), borderRadius: 1, background: 'rgba(212,168,83,0.45)', border: '0.5px solid rgba(212,168,83,0.7)' }} />
                <div style={{ position: 'absolute', left: 3, bottom: 8, width: Math.max(3,Math.round(4*size)), height: Math.max(3,Math.round(4*size)), borderRadius: 1, background: 'rgba(212,168,83,0.45)', border: '0.5px solid rgba(212,168,83,0.7)' }} />
                <div style={{ position: 'absolute', right: 3, top: 8, width: Math.max(3,Math.round(4*size)), height: Math.max(3,Math.round(4*size)), borderRadius: 1, background: 'rgba(212,168,83,0.45)', border: '0.5px solid rgba(212,168,83,0.7)' }} />
                <div style={{ position: 'absolute', right: 3, bottom: 8, width: Math.max(3,Math.round(4*size)), height: Math.max(3,Math.round(4*size)), borderRadius: 1, background: 'rgba(212,168,83,0.45)', border: '0.5px solid rgba(212,168,83,0.7)' }} />
                <div style={{ position: 'absolute', top: Math.round(10*size), bottom: Math.round(10*size), left: Math.round(11*size), right: Math.round(11*size), border: '0.5px solid rgba(212,168,83,0.18)', background: 'rgba(212,168,83,0.025)' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(160deg, rgba(212,168,83,0.07) 0%, transparent 55%)' }} />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
