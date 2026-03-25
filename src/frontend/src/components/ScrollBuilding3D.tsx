import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

function Building() {
  const groupRef = useRef<THREE.Group>(null);
  const scrollRef = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const maxScroll = document.body.scrollHeight - window.innerHeight;
      scrollRef.current = maxScroll > 0 ? window.scrollY / maxScroll : 0;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.getElapsedTime();
    const scrollProgress = scrollRef.current;
    const scrollRotY = scrollProgress * Math.PI * 3;
    const idleRotY = t * 0.15;
    groupRef.current.rotation.y = scrollRotY + idleRotY;
    groupRef.current.rotation.x = scrollProgress * 0.3 - 0.1;
  });

  const neonCyan = "#20E0FF";
  const darkSurface = "#0a1520";
  const neonAccent = "#C84CFF";

  const parts = useMemo(() => {
    const items: {
      id: string;
      geo: THREE.BufferGeometry;
      pos: [number, number, number];
      color: string;
      emissive: string;
      emissiveIntensity: number;
      opacity?: number;
    }[] = [];

    items.push({
      id: "lobby-base",
      geo: new THREE.BoxGeometry(2.0, 0.6, 2.0),
      pos: [0, -2.5, 0],
      color: darkSurface,
      emissive: neonCyan,
      emissiveIntensity: 0.15,
    });

    items.push({
      id: "lobby-strip",
      geo: new THREE.BoxGeometry(2.05, 0.08, 2.05),
      pos: [0, -2.2, 0],
      color: neonCyan,
      emissive: neonCyan,
      emissiveIntensity: 1.5,
    });

    const floorHeights = [0.55, 0.55, 0.5, 0.5, 0.45, 0.45, 0.4, 0.4, 0.35];
    let yPos = -2.1;
    floorHeights.forEach((h, i) => {
      const widthFactor = 1 - i * 0.04;
      const w = 1.7 * widthFactor;
      const d = 1.7 * widthFactor;
      yPos += h / 2;

      items.push({
        id: `floor-${i}`,
        geo: new THREE.BoxGeometry(w, h * 0.9, d),
        pos: [0, yPos, 0],
        color: darkSurface,
        emissive: neonCyan,
        emissiveIntensity: 0.05,
      });

      items.push({
        id: `floor-edge-${i}`,
        geo: new THREE.BoxGeometry(w + 0.03, 0.04, d + 0.03),
        pos: [0, yPos + h * 0.45, 0],
        color: i % 3 === 0 ? neonCyan : "#1a1a2e",
        emissive: i % 3 === 0 ? neonCyan : neonAccent,
        emissiveIntensity: i % 3 === 0 ? 1.2 : 0.4,
      });

      for (let wx = -1; wx <= 1; wx++) {
        if (wx === 0 && i === 0) continue;
        items.push({
          id: `win-front-${i}-${wx}`,
          geo: new THREE.BoxGeometry(0.18, h * 0.5, 0.06),
          pos: [(wx * w) / 3, yPos, d / 2 + 0.01],
          color: "#020810",
          emissive: neonCyan,
          emissiveIntensity: 0.6,
          opacity: 0.9,
        });
      }

      for (let wx = -1; wx <= 1; wx++) {
        items.push({
          id: `win-back-${i}-${wx}`,
          geo: new THREE.BoxGeometry(0.18, h * 0.5, 0.06),
          pos: [(wx * w) / 3, yPos, -(d / 2 + 0.01)],
          color: "#020810",
          emissive: neonCyan,
          emissiveIntensity: 0.4,
          opacity: 0.9,
        });
      }

      yPos += h / 2;
    });

    const topY = yPos;
    items.push({
      id: "penthouse",
      geo: new THREE.BoxGeometry(1.0, 0.6, 1.0),
      pos: [0, topY + 0.3, 0],
      color: darkSurface,
      emissive: neonAccent,
      emissiveIntensity: 0.2,
    });
    items.push({
      id: "penthouse-top",
      geo: new THREE.BoxGeometry(1.05, 0.05, 1.05),
      pos: [0, topY + 0.62, 0],
      color: neonAccent,
      emissive: neonAccent,
      emissiveIntensity: 2.0,
    });
    items.push({
      id: "antenna-base",
      geo: new THREE.CylinderGeometry(0.06, 0.08, 0.5, 6),
      pos: [0, topY + 0.95, 0],
      color: darkSurface,
      emissive: neonCyan,
      emissiveIntensity: 0.3,
    });
    items.push({
      id: "antenna-spire",
      geo: new THREE.CylinderGeometry(0.01, 0.05, 0.8, 6),
      pos: [0, topY + 1.55, 0],
      color: neonCyan,
      emissive: neonCyan,
      emissiveIntensity: 2.5,
    });
    items.push({
      id: "antenna-tip",
      geo: new THREE.SphereGeometry(0.07, 8, 8),
      pos: [0, topY + 2.0, 0],
      color: neonCyan,
      emissive: neonCyan,
      emissiveIntensity: 4.0,
    });

    const corners: [number, number][] = [
      [-0.35, 0.35],
      [0.35, 0.35],
      [-0.35, -0.35],
      [0.35, -0.35],
    ];
    corners.forEach(([rx, rz], ci) => {
      items.push({
        id: `roof-corner-${ci}`,
        geo: new THREE.BoxGeometry(0.12, 0.3, 0.12),
        pos: [rx, topY + 0.75, rz],
        color: darkSurface,
        emissive: neonCyan,
        emissiveIntensity: 0.8,
      });
    });

    return items;
  }, []);

  return (
    <group ref={groupRef}>
      <ambientLight intensity={0.1} />
      <pointLight position={[5, 5, 5]} intensity={0.8} color={neonCyan} />
      <pointLight position={[-5, 0, 3]} intensity={0.5} color={neonAccent} />
      <pointLight position={[0, 8, 0]} intensity={0.3} color="#ffffff" />
      {parts.map((p) => (
        <mesh key={p.id} position={p.pos} geometry={p.geo}>
          <meshStandardMaterial
            color={p.color}
            emissive={p.emissive}
            emissiveIntensity={p.emissiveIntensity}
            transparent={p.opacity !== undefined}
            opacity={p.opacity ?? 1}
            roughness={0.3}
            metalness={0.7}
          />
        </mesh>
      ))}
    </group>
  );
}

export default function ScrollBuilding3D() {
  return (
    <Canvas
      camera={{ position: [0, 0, 9], fov: 50 }}
      style={{ background: "transparent" }}
      dpr={[1, 1.5]}
    >
      <Building />
    </Canvas>
  );
}
