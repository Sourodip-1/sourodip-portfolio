export interface DotPoint {
  x: number;
  y: number;
  r: number;
  color: string;
}

export const TOTAL_DOTS = 220;

/**
 * 0: POSTPIPE - Halftone Right-Angled Triangle
 * Points fan out from top-left (largest, dark navy dots) to the diagonal tip/edges (fine, cyan dots)
 */
function generatePostPipe(count: number): DotPoint[] {
  const points: DotPoint[] = [];
  const rows = 18;
  const cols = 18;
  const startX = -130;
  const startY = -130;
  const span = 260;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const u = c / (cols - 1);
      const v = r / (rows - 1);
      // Triangle condition (hypotenuse from (1,0) to (0,1) with gentle curve)
      if (u + v <= 1.08) {
        const x = startX + u * span;
        const y = startY + v * span;
        const dist = Math.sqrt(u * u + v * v) / Math.SQRT2;
        // Halftone radius: largest at top-left origin (5.8px), tapering down to 1.4px
        const radius = Math.max(1.3, 5.8 * (1 - 0.76 * dist));
        // Blue palette gradation:
        let color = "#0A174E"; // Deepest midnight navy
        if (dist > 0.65) {
          color = "#38BDF8"; // Sky cyan
        } else if (dist > 0.45) {
          color = "#00A3FF"; // Azure
        } else if (dist > 0.22) {
          color = "#0055FF"; // Electric blue
        }
        points.push({ x, y, r: radius, color });
      }
    }
  }

  // Adjust to exactly `count`
  while (points.length < count) {
    const t = points.length / count;
    // Fill along hypotenuse edge
    const u = 1.0 - t;
    const v = t;
    points.push({
      x: startX + u * span + (Math.sin(t * 10) * 4),
      y: startY + v * span + (Math.cos(t * 10) * 4),
      r: 1.8,
      color: "#38BDF8",
    });
  }

  return points.slice(0, count);
}

/**
 * 1: KONTEXT - Hexagonal Network & Concentric Constellation
 * Multiple circular nodes formed by dense clusters, linked by halftone constellation lines
 * Uses shades of blue exclusively per instructions.
 */
function generateKontext(count: number): DotPoint[] {
  const points: DotPoint[] = [];

  // Core node definitions (x, y, baseRadius, primaryColor)
  const nodes = [
    // Center column
    { x: 0, y: -110, r: 6.2, c: "#0038FF" }, // Top accent (vibrant cobalt)
    { x: 0, y: -55, r: 5.6, c: "#0A1128" },  // Upper-mid (dark navy)
    { x: 0, y: 0, r: 6.8, c: "#0055FF" },    // Center hub (bright electric blue)
    { x: 0, y: 55, r: 5.6, c: "#0A1128" },   // Lower-mid (dark navy)
    { x: 0, y: 110, r: 5.8, c: "#38BDF8" },  // Bottom accent (sky cyan)

    // Left wings
    { x: -95, y: -50, r: 5.4, c: "#38BDF8" }, // Outer top left (cyan)
    { x: -50, y: -25, r: 5.2, c: "#0F2156" }, // Inner top left (navy)
    { x: -50, y: 30, r: 5.2, c: "#0F2156" },  // Inner bot left (navy)
    { x: -95, y: 65, r: 5.4, c: "#0A1128" },  // Outer bot left (navy)

    // Right wings
    { x: 95, y: -50, r: 5.6, c: "#00A3FF" },  // Outer top right (ocean blue)
    { x: 50, y: -25, r: 5.2, c: "#0F2156" },  // Inner top right (navy)
    { x: 50, y: 30, r: 5.2, c: "#0F2156" },   // Inner bot right (navy)
    { x: 95, y: 65, r: 5.6, c: "#0038FF" },   // Outer bot right (vibrant blue)
  ];

  // Each node gets a tight dense circular disc of dots (center + ring)
  nodes.forEach((node) => {
    // Center dot
    points.push({ x: node.x, y: node.y, r: node.r, color: node.c });

    // Orbital ring of 10 micro-dots to give it solid, tactile presence
    const ringCount = 10;
    const ringRadius = 11;
    for (let i = 0; i < ringCount; i++) {
      const angle = (i / ringCount) * Math.PI * 2;
      points.push({
        x: node.x + Math.cos(angle) * ringRadius,
        y: node.y + Math.sin(angle) * ringRadius,
        r: Math.max(2.0, node.r * 0.45),
        color: node.c,
      });
    }
  });

  // Connecting constellation spokes between nodes
  const links: [number, number][] = [
    [0, 1], [1, 2], [2, 3], [3, 4],
    [0, 5], [0, 9],
    [5, 6], [6, 2], [2, 10], [10, 9],
    [5, 8], [9, 12],
    [8, 7], [7, 2], [2, 11], [11, 12],
    [8, 4], [12, 4],
  ];

  let linkIdx = 0;
  while (points.length < count) {
    const [fromIdx, toIdx] = links[linkIdx % links.length];
    const n1 = nodes[fromIdx];
    const n2 = nodes[toIdx];
    const t = 0.2 + ((points.length % 5) / 5) * 0.6;
    const px = n1.x + (n2.x - n1.x) * t;
    const py = n1.y + (n2.y - n1.y) * t;
    points.push({
      x: px,
      y: py,
      r: 2.2,
      color: linkIdx % 2 === 0 ? "#7DD3FC" : "#0055FF",
    });
    linkIdx++;
  }

  return points.slice(0, count);
}

/**
 * 2: FLOW - Dual Wavy Swooshes / Fluid Ribbons
 * Halftone dots form twin dynamic S-curve ribbons matching Flow-Logo.svg
 */
function generateFlow(count: number): DotPoint[] {
  const points: DotPoint[] = [];
  const dotsPerWave = Math.floor(count / 2);

  // Helper for generating one fluid wave ribbon
  function addWave(centerY: number, dotTarget: number) {
    const tracks = 5;
    const steps = Math.ceil(dotTarget / tracks);

    for (let s = 0; s < steps; s++) {
      const t = s / (steps - 1); // 0 to 1 along wave
      // S-curve parametric formula
      const baseX = -135 + t * 270;
      const arc = Math.sin(t * Math.PI);
      const sCurve = Math.sin((t - 0.5) * Math.PI);
      const baseY = centerY - sCurve * 42 - arc * 18;

      // Ribbon width expands in the middle and tapers at tips
      const widthSpread = (arc * 36 + 6);

      for (let tr = 0; tr < tracks; tr++) {
        if (points.length >= (centerY < 0 ? dotTarget : count)) break;
        const normTr = (tr / (tracks - 1)) - 0.5; // -0.5 to 0.5
        const px = baseX + normTr * 10;
        const py = baseY + normTr * widthSpread;

        // Size: thickest in center body, fine at edges
        const r = Math.max(1.4, (4.8 * arc) * (1 - Math.abs(normTr) * 0.5) + 1.2);

        // Color gradation:
        let color = "#0052FF";
        if (arc > 0.5 && Math.abs(normTr) < 0.25) {
          color = "#0B1E63"; // Deepest navy core
        } else if (t < 0.25 || t > 0.8) {
          color = "#38BDF8"; // Cyan tapering edges
        } else {
          color = "#0084FF"; // Vibrant mid blue
        }

        points.push({ x: px, y: py, r, color });
      }
    }
  }

  // Upper wave
  addWave(-55, dotsPerWave);
  // Lower wave
  addWave(55, count);

  while (points.length < count) {
    points.push({ x: 0, y: 0, r: 2, color: "#38BDF8" });
  }

  return points.slice(0, count);
}

/**
 * 3: BUFFER - 2x3 Stacked Halftone Letter Matrix:
 * BU
 * FF
 * ER
 */
function generateBuffer(count: number): DotPoint[] {
  const points: DotPoint[] = [];

  // 5x7 dot matrix grids for glyphs B, U, F, E, R
  const GLYPHS: Record<string, string[]> = {
    B: [
      "####.",
      "#...#",
      "#...#",
      "####.",
      "#...#",
      "#...#",
      "####.",
    ],
    U: [
      "#...#",
      "#...#",
      "#...#",
      "#...#",
      "#...#",
      "#...#",
      ".###.",
    ],
    F: [
      "#####",
      "#....",
      "#....",
      "####.",
      "#....",
      "#....",
      "#....",
    ],
    E: [
      "#####",
      "#....",
      "#....",
      "####.",
      "#....",
      "#....",
      "#####",
    ],
    R: [
      "####.",
      "#...#",
      "#...#",
      "####.",
      "#.#..",
      "#..#.",
      "#...#",
    ],
  };

  // 6 letters layout: 2 columns x 3 rows
  const layout = [
    { char: "B", x: -110, y: -115 },
    { char: "U", x: 10, y: -115 },
    { char: "F", x: -110, y: -35 },
    { char: "F", x: 10, y: -35 },
    { char: "E", x: -110, y: 45 },
    { char: "R", x: 10, y: 45 },
  ];

  const colSpacing = 16;
  const rowSpacing = 11;

  // Primary glyph dots
  layout.forEach(({ char, x: startX, y: startY }) => {
    const grid = GLYPHS[char];
    if (!grid) return;

    for (let r = 0; r < grid.length; r++) {
      for (let c = 0; c < grid[r].length; c++) {
        if (grid[r][c] === "#") {
          const px = startX + c * colSpacing;
          const py = startY + r * rowSpacing;

          // Halftone radius and colors
          const isLeft = startX < 0;
          const rSize = isLeft ? 3.8 : 3.4;
          const color = isLeft
            ? c === 0 ? "#0A196F" : "#0055FF"
            : c >= 3 ? "#38BDF8" : "#0072FF";

          points.push({ x: px, y: py, r: rSize, color });
        }
      }
    }
  });

  // Dimensional Halftone 3D / Shadow dots to reach exact total count
  const baseCount = points.length;
  let shadowIdx = 0;
  while (points.length < count) {
    const parent = points[shadowIdx % baseCount];
    // Offset shadow dot
    points.push({
      x: parent.x + 4.5,
      y: parent.y + 4.5,
      r: Math.max(1.3, parent.r * 0.65),
      color: "#93C5FD", // Lighter tint
    });
    shadowIdx++;
  }

  return points.slice(0, count);
}

// Pre-computed datasets
const PRECOMPUTED_LOGOS: DotPoint[][] = [
  generatePostPipe(TOTAL_DOTS),
  generateKontext(TOTAL_DOTS),
  generateFlow(TOTAL_DOTS),
  generateBuffer(TOTAL_DOTS),
];

export function getLogoDots(index: number): DotPoint[] {
  const safeIdx = Math.max(0, Math.min(PRECOMPUTED_LOGOS.length - 1, Math.floor(index)));
  return PRECOMPUTED_LOGOS[safeIdx];
}
