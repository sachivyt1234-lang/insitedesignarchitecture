import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

interface FloatingMeshProps {
  position: [number, number, number];
  color: string;
  speed: number;
  rotSpeed: [number, number, number];
  type: "box" | "icosahedron" | "torusKnot" | "octahedron" | "tetrahedron";
  scale: number;
  wireframe?: boolean;
}

function FloatingMesh({
  position,
  color,
  speed,
  rotSpeed,
  type,
  scale,
  wireframe = true,
}: FloatingMeshProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const initialY = position[1];

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime();
    meshRef.current.position.y = initialY + Math.sin(t * speed) * 0.5;
    meshRef.current.rotation.x += rotSpeed[0];
    meshRef.current.rotation.y += rotSpeed[1];
    meshRef.current.rotation.z += rotSpeed[2];
  });

  const geometry = useMemo(() => {
    switch (type) {
      case "box":
        return new THREE.BoxGeometry(1, 1, 1);
      case "icosahedron":
        return new THREE.IcosahedronGeometry(1, 0);
      case "torusKnot":
        return new THREE.TorusKnotGeometry(0.6, 0.2, 64, 8);
      case "octahedron":
        return new THREE.OctahedronGeometry(1);
      case "tetrahedron":
        return new THREE.TetrahedronGeometry(1);
      default:
        return new THREE.BoxGeometry(1, 1, 1);
    }
  }, [type]);

  return (
    <mesh ref={meshRef} position={position} scale={scale} geometry={geometry}>
      <meshStandardMaterial
        color={color}
        wireframe={wireframe}
        emissive={color}
        emissiveIntensity={wireframe ? 0.8 : 0.2}
        transparent
        opacity={wireframe ? 0.85 : 0.4}
      />
    </mesh>
  );
}

const MESH_CONFIGS: (FloatingMeshProps & { id: string })[] = [
  {
    id: "tk1",
    position: [3, 1, -2],
    color: "#20E0FF",
    speed: 0.5,
    rotSpeed: [0.003, 0.005, 0.002],
    type: "torusKnot",
    scale: 1.2,
  },
  {
    id: "ico1",
    position: [-4, -1, -3],
    color: "#FF3DBE",
    speed: 0.7,
    rotSpeed: [0.004, 0.003, 0.006],
    type: "icosahedron",
    scale: 1.5,
  },
  {
    id: "box1",
    position: [5, -2, -4],
    color: "#C84CFF",
    speed: 0.4,
    rotSpeed: [0.002, 0.007, 0.003],
    type: "box",
    scale: 1.0,
  },
  {
    id: "oct1",
    position: [-2, 2, -5],
    color: "#30FF7A",
    speed: 0.6,
    rotSpeed: [0.005, 0.002, 0.004],
    type: "octahedron",
    scale: 0.8,
  },
  {
    id: "tet1",
    position: [1, -3, -3],
    color: "#FF8A2A",
    speed: 0.8,
    rotSpeed: [0.003, 0.006, 0.002],
    type: "tetrahedron",
    scale: 1.1,
  },
  {
    id: "box2",
    position: [-5, 0, -6],
    color: "#2D7CFF",
    speed: 0.35,
    rotSpeed: [0.006, 0.003, 0.005],
    type: "box",
    scale: 1.8,
    wireframe: true,
  },
  {
    id: "ico2",
    position: [2, 3, -7],
    color: "#20E0FF",
    speed: 0.45,
    rotSpeed: [0.004, 0.004, 0.003],
    type: "icosahedron",
    scale: 0.9,
  },
  {
    id: "tk2",
    position: [-1, -2, -2],
    color: "#FF3DBE",
    speed: 0.55,
    rotSpeed: [0.002, 0.005, 0.007],
    type: "torusKnot",
    scale: 0.7,
  },
];

function SceneContent() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ mouse }) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y +=
      (mouse.x * 0.3 - groupRef.current.rotation.y) * 0.02;
    groupRef.current.rotation.x +=
      (-mouse.y * 0.15 - groupRef.current.rotation.x) * 0.02;
  });

  return (
    <group ref={groupRef}>
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={0.5} color="#20E0FF" />
      <pointLight position={[-10, -10, -10]} intensity={0.3} color="#FF3DBE" />
      <pointLight position={[0, 5, 5]} intensity={0.4} color="#C84CFF" />
      {MESH_CONFIGS.map((m) => (
        <FloatingMesh key={m.id} {...m} />
      ))}
    </group>
  );
}

export default function ThreeScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 60 }}
      style={{ background: "transparent" }}
      dpr={[1, 2]}
    >
      <SceneContent />
    </Canvas>
  );
}
