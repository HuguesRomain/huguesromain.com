// ASCII black hole, ported from app studio/ascii-black-hole/index.html.
// Same model, one character cell at a time. Keep these constants as is.
const R0 = 0.29;
const R_IN = 1.5 * R0;
const R_OUT = 5.3 * R0;
const INC = 0.13;
const TILT = 0.05;
export const FLASH = 9.0;
const TAU = Math.PI * 2;

const STOPS = [0, 0.1, 0.26, 0.5, 0.78, 1.0];
const COLS = [
  [96, 10, 6],
  [196, 32, 12],
  [255, 106, 24],
  [255, 184, 82],
  [255, 244, 222],
  [255, 244, 222],
];
const STAR = [196, 208, 255];
const DUST = [120, 70, 50];
const FILL = [".,:;'`-~^_\"'", "+=!ri<>|lc~/", "xzunvaoes*?{", "#&8%$@B0WMQN"];
const TANGENT = "-\\|/";
const FONT = 'Menlo, "SF Mono", Consolas, "DejaVu Sans Mono", monospace';

const clamp = (x: number, a: number, b: number) => (x < a ? a : x > b ? b : x);
const smooth = (x: number) => {
  x = clamp(x, 0, 1);
  return x * x * (3 - 2 * x);
};
const hash2 = (c: number, r: number, s = 0) => {
  const h = Math.sin(c * 127.1 + r * 311.7 + s * 74.7) * 43758.5453;
  return h - Math.floor(h);
};
const spin = (t: number) => 0.85 * t;
const ripple = (a: number, b: number, c: number) =>
  Math.sin(a + 1.7 * Math.sin(b * 0.7 + c)) * 0.6 +
  0.4 * Math.sin(b - a * 0.5 + c * 1.3);

// disk emission at polar coords -> [heat, phase]
function gas(ang: number, rho: number, w: number): [number, number] {
  const rr = Math.max(rho, R_IN * 0.8);
  const omega = 1.5 * Math.pow(R_IN / rr, 1.5);
  const phase = ang - omega * w;
  const q = rr / R0;
  let temp =
    0.78 * Math.exp(-(rr - R_IN) / (0.95 * R0)) +
    0.42 * Math.exp(-(rr - R_IN) / (2.6 * R0));
  temp *= smooth((rho - R_IN * 0.93) / (0.22 * R0));
  temp *= 1 - smooth((rho - R_OUT * 0.7) / (R_OUT * 0.3));
  const s1 = Math.sin(q * 9.0 + 1.6 * Math.sin(2 * phase + q * 1.3));
  const s2 = Math.sin(5 * phase - q * 3.1) * Math.sin(q * 17.0 + 3 * phase);
  const s3 = Math.sin(11 * phase + q * 5.0 + Math.sin(q * 2.0));
  const flow = 0.62 + 0.24 * s1 + 0.16 * s2 + 0.08 * s3;
  const beam = 1 - 0.28 * Math.cos(ang);
  return [1.35 * temp * flow * beam, phase];
}

function lensedHalo(r: number, ang: number, w: number) {
  const a = ang - TILT;
  const top = 0.5 - 0.5 * Math.sin(a);
  const side = Math.pow(Math.abs(Math.cos(a)), 10);
  const out = Math.max(r - 1.1 * R0, 0);
  const width = 0.16 * R0 + 0.95 * R0 * Math.pow(top, 1.6) + 0.45 * R0 * side;
  const inner = Math.min(r - 1.06 * R0, 0) / (0.05 * R0);
  const ow = out / width;
  const band = Math.exp(-ow * ow) * Math.exp(-inner * inner);
  if (band < 1e-3) return 0;
  const rho =
    (1 - side) * (R_IN + Math.max(r - R0, 0) * (2.2 - 0.9 * top)) +
    side * Math.max(r, R_IN);
  return (
    1.15 * band * gas(a, rho, w)[0] * (0.55 + 0.75 * top) * (1 - 0.2 * Math.cos(a))
  );
}

function heatColor(h: number) {
  h = clamp(h, 0, 1);
  let i = 0;
  while (i < STOPS.length - 2 && h > STOPS[i + 1]) i++;
  const f = (h - STOPS[i]) / (STOPS[i + 1] - STOPS[i]);
  const a = COLS[i];
  const b = COLS[i + 1];
  return [a[0] + (b[0] - a[0]) * f, a[1] + (b[1] - a[1]) * f, a[2] + (b[2] - a[2]) * f];
}

interface Cell {
  X: number;
  Y: number;
  rnd: number;
  hsh: number;
  dust: number;
  c: number;
  r: number;
}

export interface RendererOptions {
  /** Small and transparent: no space background, stars or bloom; glyphs glow orange on any page colour. */
  mono?: { fontPx: number };
}

export function createRenderer(cv: HTMLCanvasElement, opts: RendererOptions = {}) {
  const mono = opts.mono;
  const ctx = cv.getContext("2d");
  const buf = document.createElement("canvas");
  const bx = buf.getContext("2d");
  if (!ctx || !bx) return null;

  let W = 0;
  let H = 0;
  let dpr = 1;
  let fontPx = 10;
  let cw = 6;
  let ch = 12;
  let cols = 1;
  let rows = 1;
  let aspect = 0.5;
  let cells: Cell[] = [];
  let mips: HTMLCanvasElement[] = [];
  let blooms: [HTMLCanvasElement, number][] = [];

  function layout(width: number, height: number) {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = Math.max(1, width);
    H = Math.max(1, height);
    for (const c of [cv, buf]) {
      c.width = Math.round(W * dpr);
      c.height = Math.round(H * dpr);
    }
    // mip chain: each level is half the previous one, so the downscale really averages
    mips = [];
    for (let s = 2; s <= 64; s *= 2) {
      const b = document.createElement("canvas");
      b.width = Math.max(1, Math.round(cv.width / s));
      b.height = Math.max(1, Math.round(cv.height / s));
      mips.push(b);
    }
    blooms = [
      [mips[2], 0.4],
      [mips[4], 0.65],
      [mips[5], 0.45],
    ];
    fontPx = mono ? mono.fontPx : clamp(Math.round(Math.min(H / 62, W / 120)), 7, 15);
    bx!.font = `${fontPx}px ${FONT}`;
    cw = bx!.measureText("M").width;
    ch = Math.round(fontPx * 1.18);
    cols = Math.floor(W / cw);
    rows = Math.floor(H / ch);
    aspect = cw / ch;
    const fit = Math.max(1, 1.75 / ((cols / rows) * aspect)); // narrow: zoom out so the disk fits
    cells = [];
    for (let r = 0; r < rows; r++)
      for (let c = 0; c < cols; c++)
        cells.push({
          X: ((c - cols / 2 + 0.5) / (rows / 2)) * aspect * fit,
          Y: ((r - rows / 2 + 0.5) / (rows / 2)) * fit,
          rnd: hash2(c, r),
          hsh: Math.floor(hash2(c, r, 3) * 12),
          dust: hash2(c, r, 7),
          c,
          r,
        });
  }

  function draw(t: number) {
    const cam = smooth(smooth((t - FLASH + 0.3) / 2.6));
    const zoom = 1 + 0.3 * cam;
    const inc = INC + 0.07 * cam;
    const px = (2 / rows / zoom) * Math.max(1, 1.75 / ((cols / rows) * aspect));
    const w = spin(t);
    const fl = (t - FLASH) / 0.22;
    const flash = Math.exp(-fl * fl);
    const ringK = smooth((t - 0.3) / 2.2);
    const ringW = Math.max(0.05 * R0, 0.55 * px);
    const diskOn = smooth((t - 5.0) / 2.8);
    const auraK = smooth((t - 2.2) / 1.8) * (1 - 0.65 * diskOn);
    const breathe = 0.85 + 0.15 * Math.sin(t * 2.4);
    const span = R0 + diskOn * (R_OUT * 1.1 - R0);
    const lit = 0.5 + 0.5 * smooth((t - FLASH + 0.3) / 0.4);
    const diskK = smooth((t - 4.8) / 0.6) * lit;
    const haloK = smooth((t - 5.6) / 2.2) * (0.6 + 0.4 * lit);
    const ringGain = 0.95 + 0.25 * smooth((t - 5) / 2);
    const shockFront = R0 + (t - FLASH) * 0.75;
    const shockW = Math.max(0.03, 1.2 * px);
    const shockK = t > FLASH ? Math.exp(-(t - FLASH) / 0.6) * 0.95 : 0;
    const ct = Math.cos(TILT);
    const st = Math.sin(TILT);

    bx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    if (mono) {
      bx!.clearRect(0, 0, W, H);
      bx!.shadowBlur = 5;
    } else {
      bx!.fillStyle = "#000";
      bx!.fillRect(0, 0, W, H);
    }
    bx!.font = `${fontPx}px ${FONT}`;
    bx!.textBaseline = "top";
    const ox = (W - cols * cw) / 2;
    const oy = (H - rows * ch) / 2 + (ch - fontPx) / 2;

    for (const k of cells) {
      const X = k.X / zoom;
      const Y = (k.Y + 0.03 * cam) / zoom;
      const r = Math.hypot(X, Y);
      const ang = Math.atan2(Y, X);
      const inside = r < R0 * 0.98;
      let heat = 0;
      let chr = " ";
      let col: number[];
      let lum: number;

      // 1. the ring draws itself
      const around = ((((ang + Math.PI / 2) % TAU) + TAU) % TAU) / TAU;
      const dr = (r - 1.04 * R0) / ringW;
      let ring = Math.exp(-dr * dr) * smooth((ringK * 1.08 - around) / 0.08);
      const hd = (around - ringK * 1.04) / 0.025;
      const dr2 = dr / 2.5;
      ring = Math.max(
        ring,
        1.4 * Math.exp(-hd * hd) * (1 - ringK) * Math.exp(-dr2 * dr2),
      );

      // 2. the breathing glow, settling into the disk's rings
      let aura = 0;
      if (auraK > 0.001) {
        let puff = 0.5 + 0.5 * ripple(2 * ang, ((5 * r) / R0) * 0.24 - 0.45 * t, 0.35 * t);
        if (diskOn > 0)
          puff =
            puff * (1 - diskOn) +
            gas(ang - TILT, R_IN + Math.max(r - R0, 0) * 2.6, w)[0] * diskOn;
        const reach = 0.42 * R0 * (0.7 + 0.6 * puff) * breathe;
        aura =
          auraK *
          Math.exp(-Math.pow(Math.max(r - R0, 0) / reach, 1.6)) *
          (0.6 + 0.4 * puff);
      }

      // 3. disk + lensed halo
      const u = X * ct + Y * st;
      const v = -X * st + Y * ct;
      let disk = 0;
      let phase = 0;
      if (diskK > 0.001) {
        const rho = Math.hypot(u, v / inc);
        if (rho < R_OUT * 1.05) {
          const g = gas(Math.atan2(v / inc, u), rho, w);
          disk = g[0] * smooth((span - Math.abs(u)) / (0.6 * R0)) * diskK;
          phase = g[1];
        }
      }
      const halo = haloK > 0.001 ? lensedHalo(r, ang, w) * haloK : 0;
      let shock = 0;
      if (shockK > 0.001) {
        const s = (r - shockFront) / shockW;
        shock = Math.exp(-s * s) * shockK;
      }

      let soft =
        1 -
        (1 - clamp(aura * 0.55, 0, 1)) * (1 - clamp(halo, 0, 1)) * (1 - clamp(disk, 0, 1));
      soft = Math.max(soft, disk, halo);
      heat = Math.max(ring * ringGain, soft, shock);
      heat =
        heat * (1 + 1.3 * flash) +
        flash * 0.9 * Math.exp(-Math.max(r - R0, 0) / (1.2 * R0));
      if (inside) heat = v > 0 && disk > 0.06 ? disk : 0; // the shadow hides what is behind it

      if (heat > 0.07) {
        const level = clamp(Math.floor(heat * 3.6), 0, 3);
        const fp = disk > halo ? phase : ang - w * 0.8;
        const idx = ((Math.floor(k.hsh + fp * 2 + (r / R0) * 6) % 12) + 12) % 12;
        chr = FILL[level][idx];
        if (ring > aura * 0.8 && ring > disk && ring > halo && ring > 0.3) {
          const th =
            ((Math.atan2(Math.cos(ang), -Math.sin(ang)) % Math.PI) + Math.PI) % Math.PI;
          chr = TANGENT[Math.round(th / (Math.PI / 4)) % 4];
        }
        col = heatColor(heat);
        lum =
          clamp(0.42 + 0.85 * heat, 0, 1.25) *
          (0.35 + 0.65 * smooth((heat - 0.07) / 0.15));
      } else if (mono) {
        continue;
      } else if (!inside && k.rnd < 0.0028) {
        // stars
        chr = k.rnd < 0.0005 ? "+" : k.rnd < 0.0012 ? "*" : ".";
        col = STAR;
        lum = 0.55 + 0.35 * Math.sin(0.8 * t + k.rnd * 9000);
      } else if (!inside && k.dust < 0.01) {
        // dust
        chr = k.dust < 0.003 ? "," : ".";
        col = DUST;
        lum = 0.22 + 0.1 * Math.sin(0.5 * t + k.dust * 3000);
      } else continue;

      if (mono) {
        // stay in the red-to-amber part of the palette: white-hot would vanish on a light page
        const [r, g, b] = heatColor(0.2 + 0.45 * clamp(heat, 0, 1));
        bx!.fillStyle = bx!.shadowColor = `rgb(${r | 0},${g | 0},${b | 0})`;
        bx!.globalAlpha = clamp(0.35 + lum, 0.5, 1);
        bx!.fillText(chr, ox + k.c * cw, oy + k.r * ch);
        continue;
      }
      const R = Math.min(255, col[0] * lum) | 0;
      const G = Math.min(255, col[1] * lum) | 0;
      const B = Math.min(255, col[2] * lum) | 0;
      bx!.fillStyle = `rgb(${R},${G},${B})`;
      bx!.fillText(chr, ox + k.c * cw, oy + k.r * ch);
    }

    if (mono) {
      bx!.globalAlpha = 1;
      ctx!.setTransform(1, 0, 0, 1, 0, 0);
      ctx!.clearRect(0, 0, cv.width, cv.height);
      ctx!.drawImage(buf, 0, 0);
      return;
    }

    // bloom: blurred copies added on top
    // (downscale + smooth upscale works everywhere, unlike ctx.filter)
    ctx!.setTransform(1, 0, 0, 1, 0, 0);
    ctx!.globalCompositeOperation = "source-over";
    ctx!.globalAlpha = 1;
    ctx!.drawImage(buf, 0, 0);
    ctx!.globalCompositeOperation = "lighter";
    ctx!.imageSmoothingEnabled = true;
    ctx!.imageSmoothingQuality = "high";
    let src: HTMLCanvasElement = buf;
    for (const b of mips) {
      const g = b.getContext("2d");
      if (!g) continue;
      g.imageSmoothingEnabled = true;
      g.imageSmoothingQuality = "high";
      g.clearRect(0, 0, b.width, b.height);
      g.drawImage(src, 0, 0, b.width, b.height);
      src = b;
    }
    for (const [b, a] of blooms) {
      ctx!.globalAlpha = a;
      ctx!.drawImage(b, 0, 0, cv.width, cv.height);
    }
    ctx!.globalAlpha = 1;
    ctx!.globalCompositeOperation = "source-over";
  }

  return { layout, draw };
}

