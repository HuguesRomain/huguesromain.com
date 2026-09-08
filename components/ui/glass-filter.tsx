const DEFAULT_SCALE = 110;
const EDGE_SCALE_RATIO = 1.5;

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
            baseFrequency="0.002 0.007"
            numOctaves="2"
            seed="17"
            result="noise"
          />
          <feComponentTransfer in="noise" result="adjusted">
            <feFuncR type="gamma" amplitude="1" exponent="6" offset="0.5" />
            <feFuncG type="gamma" amplitude="1" exponent="6" offset="0.5" />
          </feComponentTransfer>
          <feGaussianBlur in="adjusted" stdDeviation="4" result="soft" />
          <feDisplacementMap
            id="glass-distortion-map"
            in="SourceGraphic"
            in2="soft"
            scale={scale}
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
        <filter
          id="glass-distortion-edge"
          x="-30%"
          y="-30%"
          width="160%"
          height="160%"
          colorInterpolationFilters="sRGB"
        >
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.003 0.009"
            numOctaves="2"
            seed="17"
            result="noise"
          />
          <feComponentTransfer in="noise" result="adjusted">
            <feFuncR type="gamma" amplitude="1" exponent="6" offset="0.5" />
            <feFuncG type="gamma" amplitude="1" exponent="6" offset="0.5" />
          </feComponentTransfer>
          <feGaussianBlur in="adjusted" stdDeviation="3.5" result="soft" />
          <feDisplacementMap
            id="glass-distortion-edge-map"
            in="SourceGraphic"
            in2="soft"
            scale={Math.round(scale * EDGE_SCALE_RATIO)}
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </defs>
    </svg>
  );
}
