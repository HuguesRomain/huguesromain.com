const DEFAULT_SCALE = 55;

export function GlassFilter({ scale = DEFAULT_SCALE }: { scale?: number }) {
  return (
    <svg aria-hidden className="pointer-events-none absolute h-0 w-0 overflow-hidden">
      <defs>
        <filter
          id="glass-distortion"
          x="-20%"
          y="-20%"
          width="140%"
          height="140%"
          colorInterpolationFilters="sRGB"
        >
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.001 0.005"
            numOctaves="1"
            seed="17"
            result="noise"
          />
          <feComponentTransfer in="noise" result="adjusted">
            <feFuncR type="gamma" amplitude="1" exponent="10" offset="0.5" />
          </feComponentTransfer>
          <feGaussianBlur in="adjusted" stdDeviation="3" result="soft" />
          <feDisplacementMap
            id="glass-distortion-map"
            in="SourceGraphic"
            in2="soft"
            scale={scale}
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </defs>
    </svg>
  );
}
