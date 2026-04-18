import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { TorusKnot, Environment } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

const angle = Math.PI / 4;

// ✅ Stable orbit configuration (UPDATED)
const RADIUS_X = 2.0;
const RADIUS_Y = 1.3;
const DEPTH = 0.4;
const SPEED = 0.6;

function Knot({ centerRef }: { centerRef: React.MutableRefObject<[number, number, number]> }): JSX.Element {
  const ref = useRef<THREE.Mesh>(null!);
  const { viewport } = useThree();
   
  const baseScale = THREE.MathUtils.clamp(viewport.width / 10, 0.5, 1.3);

  // optional fine-tuning
  const scaleFactor = baseScale * 0.9;

  // 🎯 Stable orbit position (aligned with cards area)
  // const centerX = viewport.width * 0.10;
  // const centerY = viewport.height * -0.05;

  // 🎯 Stable orbit size (consistent feel across screens)
  // const radiusX = viewport.width * 0.22 * scaleFactor;
  // const radiusY = viewport.height * 0.32 * scaleFactor;

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * SPEED;

    const center = centerRef.current;

    const x = center[0] + Math.cos(t) * RADIUS_X;
    const y = center[1] + Math.sin(t) * RADIUS_Y;
    const z = center[2] + Math.sin(t * 0.5) * DEPTH + 0.2;

    // ✅ APPLY POSITION (you missed this before)
    ref.current.position.set(x, y, z);

    ref.current.rotation.x += 0.008;
    ref.current.rotation.y += 0.008;
  });

  return (
    <TorusKnot ref={ref} args={[0.4 * scaleFactor, 0.25 * scaleFactor, 200, 32]}>
      {/* <meshStandardMaterial
        color="#d9d9d9"
        metalness={1}
        roughness={0.15}
        envMapIntensity={3}
      /> */}
      <meshPhysicalMaterial
        color="#8b9efe"
        metalness={1}
        roughness={0.05}
        envMapIntensity={3}
        clearcoat={1}
        clearcoatRoughness={0}
        emissive="#0F48A0 "
        emissiveIntensity={0.5}
      />
    </TorusKnot>
  );
}

function Ring({ centerRef }: { centerRef: React.MutableRefObject<[number, number, number]> }): JSX.Element {
  const ref = useRef<THREE.Mesh>(null!);
  const { viewport } = useThree();
  
  const baseScale = THREE.MathUtils.clamp(viewport.width / 10, 0.5, 1.3);

  // optional fine-tuning
  const scaleFactor = baseScale * 0.9;

  // 🎯 Stable orbit position (aligned with cards area)
  // const centerX = viewport.width * 0.10;
  // const centerY = viewport.height * -0.05;

  // 🎯 Stable orbit size (consistent feel across screens)
  // const radiusX = viewport.width * 0.12 * scaleFactor;
  // const radiusY = viewport.height * 0.32 * scaleFactor;

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * SPEED + Math.PI;

    const center = centerRef.current;

    const x = center[0] + Math.cos(t) * RADIUS_X;
    const y = center[1] + Math.sin(t) * RADIUS_Y;
    const z = center[2] + Math.sin(t * 0.5) * DEPTH;

    // ✅ APPLY POSITION (you missed this before)
    ref.current.position.set(x, y, z);

    ref.current.rotation.x += 0.006;
    ref.current.rotation.y += 0.006;
  });

  return (
    <mesh ref={ref} rotation={[Math.PI / 2, 0, 0]}>
      <torusGeometry args={[0.4 * scaleFactor, 0.25 * scaleFactor, 200, 32]} />
      {/* <meshStandardMaterial
        color="#D9D9D9"
        metalness={1}
        roughness={0.15}
        envMapIntensity={3}
      /> */}

      <meshPhysicalMaterial
        color="#8b9efe"
        metalness={1}
        roughness={0.05}
        envMapIntensity={3}
        clearcoat={1}
        clearcoatRoughness={0}
        emissive="#0F48A0  "
        emissiveIntensity={0.5}
      />
    </mesh>
  );
}

export default function Section3D({ targetRef }: { targetRef: React.RefObject<HTMLDivElement> }): JSX.Element {

  return (
    <div className="absolute inset-0 pointer-events-none">     
      <Canvas
        camera={{
          position: [0, 0, 8], // ✅ fixed camera for consistency
          fov: 50,
        }}
      >

        <SceneContent targetRef={targetRef} />

      </Canvas>
    </div>
  );
}

// ✅ Separate scene logic (needed for useThree)
function SceneContent({ targetRef }: { targetRef: React.RefObject<HTMLDivElement> }) {

  const { size, viewport } = useThree();
  const centerRef = useRef<[number, number, number]>([0, 0, 0]);
  
  useFrame(() => {
    if (!targetRef.current) return;

    const rect = targetRef.current.getBoundingClientRect();

    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    const ndcX = (x / size.width) * 2 - 1;
    const ndcY = -(y / size.height) * 2 + 1;

    const worldX = (ndcX * viewport.width) / 2;
    const worldY = (ndcY * viewport.height) / 2;

    // ✅ SMOOTH FOLLOW (important)
    centerRef.current[0] += (worldX - centerRef.current[0]) * 0.1;
    centerRef.current[1] += (worldY - centerRef.current[1]) * 0.1;
    centerRef.current[2] = 0;
  });

  return (
    <>
      {/* THIS LINE FIXES THE STEEL LOOK */}
      <Environment preset="sunset"/>

      <ambientLight intensity={0.4} />

      <directionalLight position={[5, 5, 5]} intensity={2} />
      <directionalLight position={[-5, -5, 5]} intensity={2} />

      <Ring centerRef={centerRef} />
      <Knot centerRef={centerRef} />
    </>
  );
}