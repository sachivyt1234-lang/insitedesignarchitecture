import { j as jsxRuntimeExports, r as reactExports } from "./index-BbGkg3-G.js";
import { C as Canvas, u as useFrame, B as BoxGeometry, T as TetrahedronGeometry, O as OctahedronGeometry, b as TorusKnotGeometry, I as IcosahedronGeometry } from "./react-three-fiber.esm-DVuRO3tT.js";
function FloatingMesh({
  position,
  color,
  speed,
  rotSpeed,
  type,
  scale,
  wireframe = true
}) {
  const meshRef = reactExports.useRef(null);
  const initialY = position[1];
  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime();
    meshRef.current.position.y = initialY + Math.sin(t * speed) * 0.5;
    meshRef.current.rotation.x += rotSpeed[0];
    meshRef.current.rotation.y += rotSpeed[1];
    meshRef.current.rotation.z += rotSpeed[2];
  });
  const geometry = reactExports.useMemo(() => {
    switch (type) {
      case "box":
        return new BoxGeometry(1, 1, 1);
      case "icosahedron":
        return new IcosahedronGeometry(1, 0);
      case "torusKnot":
        return new TorusKnotGeometry(0.6, 0.2, 64, 8);
      case "octahedron":
        return new OctahedronGeometry(1);
      case "tetrahedron":
        return new TetrahedronGeometry(1);
      default:
        return new BoxGeometry(1, 1, 1);
    }
  }, [type]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("mesh", { ref: meshRef, position, scale, geometry, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    "meshStandardMaterial",
    {
      color,
      wireframe,
      emissive: color,
      emissiveIntensity: wireframe ? 0.8 : 0.2,
      transparent: true,
      opacity: wireframe ? 0.85 : 0.4
    }
  ) });
}
const MESH_CONFIGS = [
  {
    id: "tk1",
    position: [3, 1, -2],
    color: "#20E0FF",
    speed: 0.5,
    rotSpeed: [3e-3, 5e-3, 2e-3],
    type: "torusKnot",
    scale: 1.2
  },
  {
    id: "ico1",
    position: [-4, -1, -3],
    color: "#FF3DBE",
    speed: 0.7,
    rotSpeed: [4e-3, 3e-3, 6e-3],
    type: "icosahedron",
    scale: 1.5
  },
  {
    id: "box1",
    position: [5, -2, -4],
    color: "#C84CFF",
    speed: 0.4,
    rotSpeed: [2e-3, 7e-3, 3e-3],
    type: "box",
    scale: 1
  },
  {
    id: "oct1",
    position: [-2, 2, -5],
    color: "#30FF7A",
    speed: 0.6,
    rotSpeed: [5e-3, 2e-3, 4e-3],
    type: "octahedron",
    scale: 0.8
  },
  {
    id: "tet1",
    position: [1, -3, -3],
    color: "#FF8A2A",
    speed: 0.8,
    rotSpeed: [3e-3, 6e-3, 2e-3],
    type: "tetrahedron",
    scale: 1.1
  },
  {
    id: "box2",
    position: [-5, 0, -6],
    color: "#2D7CFF",
    speed: 0.35,
    rotSpeed: [6e-3, 3e-3, 5e-3],
    type: "box",
    scale: 1.8,
    wireframe: true
  },
  {
    id: "ico2",
    position: [2, 3, -7],
    color: "#20E0FF",
    speed: 0.45,
    rotSpeed: [4e-3, 4e-3, 3e-3],
    type: "icosahedron",
    scale: 0.9
  },
  {
    id: "tk2",
    position: [-1, -2, -2],
    color: "#FF3DBE",
    speed: 0.55,
    rotSpeed: [2e-3, 5e-3, 7e-3],
    type: "torusKnot",
    scale: 0.7
  }
];
function SceneContent() {
  const groupRef = reactExports.useRef(null);
  useFrame(({ mouse }) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y += (mouse.x * 0.3 - groupRef.current.rotation.y) * 0.02;
    groupRef.current.rotation.x += (-mouse.y * 0.15 - groupRef.current.rotation.x) * 0.02;
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("group", { ref: groupRef, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("ambientLight", { intensity: 0.2 }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("pointLight", { position: [10, 10, 10], intensity: 0.5, color: "#20E0FF" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("pointLight", { position: [-10, -10, -10], intensity: 0.3, color: "#FF3DBE" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("pointLight", { position: [0, 5, 5], intensity: 0.4, color: "#C84CFF" }),
    MESH_CONFIGS.map((m) => /* @__PURE__ */ jsxRuntimeExports.jsx(FloatingMesh, { ...m }, m.id))
  ] });
}
function ThreeScene() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Canvas,
    {
      camera: { position: [0, 0, 8], fov: 60 },
      style: { background: "transparent" },
      dpr: [1, 2],
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(SceneContent, {})
    }
  );
}
export {
  ThreeScene as default
};
