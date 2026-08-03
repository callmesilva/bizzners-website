import * as THREE from "three";

/**
 * "Trade command center" globe: graticule sphere, glowing hub cities,
 * animated trade arcs radiating from Panamá, star field, atmosphere rim.
 * Imperative three.js (no react-three-fiber) to keep the wild chunk lean.
 */

export interface GlobeOptions {
  /** lite = capped DPR + fewer stars (mobile) */
  quality: "full" | "lite";
  /** false = render a single styled frame and stop (reduced motion) */
  animate: boolean;
}

export interface GlobeHandle {
  destroy(): void;
}

/** lat/lng of trade hubs; Panamá first (arc origin) */
const HUBS: Array<[number, number]> = [
  [8.98, -79.52], // Panamá — origin
  [25.76, -80.19], // Miami
  [40.71, -74.0], // New York
  [34.05, -118.24], // Los Angeles
  [29.76, -95.37], // Houston
  [49.28, -123.12], // Vancouver
  [19.43, -99.13], // Mexico City
  [17.97, -76.79], // Kingston
  [4.71, -74.07], // Bogotá
  [-23.55, -46.63], // São Paulo
  [-34.6, -58.38], // Buenos Aires
  [-33.45, -70.66], // Santiago
  [51.5, -0.12], // London
  [51.92, 4.48], // Rotterdam
  [53.55, 9.99], // Hamburg
  [40.42, -3.7], // Madrid
  [6.52, 3.37], // Lagos
  [-33.92, 18.42], // Cape Town
  [25.2, 55.27], // Dubai
  [19.08, 72.88], // Mumbai
  [1.35, 103.82], // Singapore
  [22.32, 114.17], // Hong Kong
  [31.23, 121.47], // Shanghai
  [35.68, 139.65], // Tokyo
  [37.57, 126.98], // Seoul
  [-33.87, 151.21], // Sydney
];

/** indexes into HUBS that get an animated arc from Panamá */
const ARC_TARGETS = [1, 2, 3, 6, 8, 9, 10, 12, 13, 16, 18, 20, 22, 23, 25];

const BLUE = new THREE.Color("#4a7fe0");
const ELECTRIC = new THREE.Color("#8fb3ff");
const RED = new THREE.Color("#ff3d55");

function latLngToVec3(lat: number, lng: number, r: number) {
  const phi = ((90 - lat) * Math.PI) / 180;
  const theta = ((lng + 180) * Math.PI) / 180;
  return new THREE.Vector3(
    -r * Math.sin(phi) * Math.cos(theta),
    r * Math.cos(phi),
    r * Math.sin(phi) * Math.sin(theta),
  );
}

function softDotTexture() {
  const c = document.createElement("canvas");
  c.width = c.height = 64;
  const g = c.getContext("2d")!;
  const grad = g.createRadialGradient(32, 32, 0, 32, 32, 32);
  grad.addColorStop(0, "rgba(255,255,255,1)");
  grad.addColorStop(0.35, "rgba(255,255,255,0.8)");
  grad.addColorStop(1, "rgba(255,255,255,0)");
  g.fillStyle = grad;
  g.fillRect(0, 0, 64, 64);
  return new THREE.CanvasTexture(c);
}

function buildGraticule(radius: number) {
  const positions: number[] = [];
  const push = (a: THREE.Vector3, b: THREE.Vector3) => {
    positions.push(a.x, a.y, a.z, b.x, b.y, b.z);
  };
  const seg = 90;
  // parallels
  for (let lat = -75; lat <= 75; lat += 15) {
    for (let i = 0; i < seg; i++) {
      const l1 = (i / seg) * 360 - 180;
      const l2 = ((i + 1) / seg) * 360 - 180;
      push(latLngToVec3(lat, l1, radius), latLngToVec3(lat, l2, radius));
    }
  }
  // meridians
  for (let lng = -180; lng < 180; lng += 15) {
    for (let i = 0; i < seg / 2; i++) {
      const la1 = (i / (seg / 2)) * 180 - 90;
      const la2 = ((i + 1) / (seg / 2)) * 180 - 90;
      push(latLngToVec3(la1, lng, radius), latLngToVec3(la2, lng, radius));
    }
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  return geo;
}

const ATMOSPHERE_VERT = /* glsl */ `
  varying vec3 vNormal;
  void main() {
    vNormal = normalize(normalMatrix * normal);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const ATMOSPHERE_FRAG = /* glsl */ `
  varying vec3 vNormal;
  uniform vec3 uColor;
  void main() {
    float rim = pow(0.72 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 3.0);
    gl_FragColor = vec4(uColor, 1.0) * rim;
  }
`;

export function createGlobe(canvas: HTMLCanvasElement, opts: GlobeOptions): GlobeHandle {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, opts.quality === "full" ? 2 : 1.5));

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(36, 1, 0.1, 40);
  camera.position.set(0, 0.12, opts.quality === "full" ? 4.15 : 4.7);

  const globe = new THREE.Group();
  globe.rotation.x = 0.26;
  // desktop: park the sphere right-of-center so copy owns the left half
  globe.position.x = opts.quality === "full" ? 1.02 : 0;
  scene.add(globe);
  camera.lookAt(0, 0, 0);

  const disposables: Array<{ dispose(): void }> = [];
  const track = <T extends { dispose(): void }>(d: T): T => {
    disposables.push(d);
    return d;
  };

  // core sphere (occludes far side)
  const core = new THREE.Mesh(
    track(new THREE.SphereGeometry(0.985, 56, 56)),
    track(new THREE.MeshBasicMaterial({ color: "#060b23" })),
  );
  globe.add(core);

  // graticule
  const grat = new THREE.LineSegments(
    track(buildGraticule(1)),
    track(
      new THREE.LineBasicMaterial({ color: "#27418f", transparent: true, opacity: 0.4 }),
    ),
  );
  globe.add(grat);

  // atmosphere rim
  const atmosphere = new THREE.Mesh(
    track(new THREE.SphereGeometry(1.13, 56, 56)),
    track(
      new THREE.ShaderMaterial({
        vertexShader: ATMOSPHERE_VERT,
        fragmentShader: ATMOSPHERE_FRAG,
        uniforms: { uColor: { value: BLUE } },
        blending: THREE.AdditiveBlending,
        side: THREE.BackSide,
        transparent: true,
        depthWrite: false,
      }),
    ),
  );
  globe.add(atmosphere);

  const dotTex = track(softDotTexture());

  // hub cities
  {
    const pos: number[] = [];
    const col: number[] = [];
    HUBS.forEach(([lat, lng], i) => {
      const v = latLngToVec3(lat, lng, 1.006);
      pos.push(v.x, v.y, v.z);
      const c = i === 0 ? RED : ELECTRIC;
      col.push(c.r, c.g, c.b);
    });
    const geo = track(new THREE.BufferGeometry());
    geo.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
    geo.setAttribute("color", new THREE.Float32BufferAttribute(col, 3));
    const hubs = new THREE.Points(
      geo,
      track(
        new THREE.PointsMaterial({
          size: 0.05,
          map: dotTex,
          vertexColors: true,
          transparent: true,
          depthWrite: false,
          blending: THREE.AdditiveBlending,
        }),
      ),
    );
    globe.add(hubs);
  }

  // Panamá pulse ring
  const pulse = new THREE.Sprite(
    track(
      new THREE.SpriteMaterial({
        map: dotTex,
        color: RED,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    ),
  );
  pulse.position.copy(latLngToVec3(HUBS[0][0], HUBS[0][1], 1.012));
  pulse.scale.setScalar(0.09);
  globe.add(pulse);

  // trade arcs + traveling heads
  const origin = latLngToVec3(HUBS[0][0], HUBS[0][1], 1.002);
  const curves: THREE.QuadraticBezierCurve3[] = [];
  const arcLines: Array<{ line: THREE.Line; total: number; delay: number }> = [];
  ARC_TARGETS.forEach((idx, i) => {
    const [lat, lng] = HUBS[idx];
    const end = latLngToVec3(lat, lng, 1.002);
    const dist = origin.distanceTo(end);
    const mid = origin
      .clone()
      .add(end)
      .multiplyScalar(0.5)
      .normalize()
      .multiplyScalar(1 + dist * 0.34);
    const curve = new THREE.QuadraticBezierCurve3(origin.clone(), mid, end);
    curves.push(curve);
    const pts = curve.getPoints(72);
    const geo = track(new THREE.BufferGeometry().setFromPoints(pts));
    geo.setDrawRange(0, 0);
    const line = new THREE.Line(
      geo,
      track(
        new THREE.LineBasicMaterial({
          color: i % 4 === 0 ? "#ff3d55" : "#5d87ff",
          transparent: true,
          opacity: 0.42,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        }),
      ),
    );
    globe.add(line);
    arcLines.push({ line, total: 73, delay: 0.35 + i * 0.14 });
  });

  // traveling heads (one point per arc)
  const headGeo = track(new THREE.BufferGeometry());
  {
    const pos = new Float32Array(curves.length * 3);
    const col: number[] = [];
    curves.forEach((_, i) => {
      const c = i % 4 === 0 ? RED : new THREE.Color("#cfe0ff");
      col.push(c.r, c.g, c.b);
    });
    headGeo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    headGeo.setAttribute("color", new THREE.Float32BufferAttribute(col, 3));
  }
  const heads = new THREE.Points(
    headGeo,
    track(
      new THREE.PointsMaterial({
        size: 0.045,
        map: dotTex,
        vertexColors: true,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    ),
  );
  globe.add(heads);

  // star field
  {
    const count = opts.quality === "full" ? 650 : 320;
    const pos: number[] = [];
    for (let i = 0; i < count; i++) {
      const r = 6 + Math.random() * 5;
      const t = Math.random() * Math.PI * 2;
      const p = Math.acos(2 * Math.random() - 1);
      pos.push(r * Math.sin(p) * Math.cos(t), r * Math.cos(p), r * Math.sin(p) * Math.sin(t));
    }
    const geo = track(new THREE.BufferGeometry());
    geo.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
    const stars = new THREE.Points(
      geo,
      track(
        new THREE.PointsMaterial({
          size: 0.02,
          map: dotTex,
          color: "#9db4ff",
          transparent: true,
          opacity: 0.55,
          depthWrite: false,
          sizeAttenuation: true,
        }),
      ),
    );
    scene.add(stars);
  }

  // sizing
  const setSize = () => {
    const w = canvas.clientWidth || 1;
    const h = canvas.clientHeight || 1;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  };
  setSize();
  const ro = new ResizeObserver(() => {
    setSize();
    if (!running) renderer.render(scene, camera);
  });
  ro.observe(canvas);

  // pointer parallax
  let px = 0;
  let py = 0;
  const onPointer = (e: PointerEvent) => {
    px = (e.clientX / window.innerWidth) * 2 - 1;
    py = (e.clientY / window.innerHeight) * 2 - 1;
  };
  if (opts.animate) window.addEventListener("pointermove", onPointer, { passive: true });

  // render loop — only while on screen and tab visible
  let raf = 0;
  let running = false;
  let inView = true;
  const clock = new THREE.Clock();
  let elapsed = 0;

  const frame = () => {
    raf = 0;
    if (!inView || document.hidden) {
      running = false;
      return;
    }
    elapsed += clock.getDelta();
    const t = elapsed;

    globe.rotation.y = t * 0.05;
    pulse.scale.setScalar(0.07 + Math.sin(t * 2.6) * 0.022);

    arcLines.forEach((arc) => {
      const p = Math.min(1, Math.max(0, (t - arc.delay) / 1.4));
      arc.line.geometry.setDrawRange(0, Math.floor(p * arc.total));
    });

    const posAttr = headGeo.getAttribute("position") as THREE.BufferAttribute;
    curves.forEach((curve, i) => {
      const tt = (t * 0.1 + i * 0.13) % 1;
      const v = curve.getPoint(tt);
      posAttr.setXYZ(i, v.x, v.y, v.z);
    });
    posAttr.needsUpdate = true;

    camera.position.x += (px * 0.26 - camera.position.x) * 0.045;
    camera.position.y += (-py * 0.16 + 0.15 - camera.position.y) * 0.045;
    camera.lookAt(0, 0, 0);

    renderer.render(scene, camera);
    running = true;
    raf = requestAnimationFrame(frame);
  };

  const kick = () => {
    if (!running && !raf) {
      clock.getDelta();
      raf = requestAnimationFrame(frame);
    }
  };

  const io = new IntersectionObserver(
    ([entry]) => {
      inView = entry.isIntersecting;
      if (inView && opts.animate) kick();
    },
    { threshold: 0.02 },
  );
  io.observe(canvas);

  const onVisibility = () => {
    if (!document.hidden && inView && opts.animate) kick();
  };
  document.addEventListener("visibilitychange", onVisibility);

  if (opts.animate) {
    kick();
  } else {
    // static poster frame: arcs fully drawn, heads parked at destinations
    arcLines.forEach((arc) => arc.line.geometry.setDrawRange(0, arc.total));
    const posAttr = headGeo.getAttribute("position") as THREE.BufferAttribute;
    curves.forEach((curve, i) => {
      const v = curve.getPoint(1);
      posAttr.setXYZ(i, v.x, v.y, v.z);
    });
    posAttr.needsUpdate = true;
    renderer.render(scene, camera);
  }

  return {
    destroy() {
      if (raf) cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      window.removeEventListener("pointermove", onPointer);
      document.removeEventListener("visibilitychange", onVisibility);
      disposables.forEach((d) => d.dispose());
      renderer.dispose();
    },
  };
}
