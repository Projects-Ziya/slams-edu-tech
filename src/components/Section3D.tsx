import { Canvas, useFrame } from "@react-three/fiber";
import { TorusKnot, Environment } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

const centerX = 3.3;
const centerY = 4;
const radiusX = 2.5;
const radiusY = 5;

const angle = Math.PI / 2;

function Knot(): JSX.Element {
  const ref = useRef<THREE.Mesh>(null!);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    const x = Math.cos(t) * radiusX;
    const y = Math.sin(t) * radiusY;

    const rotatedX =
      x * Math.cos(angle) - y * Math.sin(angle);

    const rotatedY =
      x * Math.sin(angle) + y * Math.cos(angle);

    ref.current.position.x = centerX + rotatedX;
    ref.current.position.y = centerY + rotatedY;
    ref.current.position.z = 0;

    ref.current.rotation.x += 0.01;
    ref.current.rotation.y += 0.01;
  });

  return (
    <TorusKnot ref={ref} args={[0.4, 0.25, 200, 32]}>
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
  emissive="#101C34 ,#3B42F6 "
  emissiveIntensity={0.5}
/>

    </TorusKnot>
  );
}

function Ring(): JSX.Element {
  const ref = useRef<THREE.Mesh>(null!);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    const x = Math.cos(t + Math.PI) * radiusX;
    const y = Math.sin(t + Math.PI) * radiusY;

    const rotatedX =
      x * Math.cos(angle) - y * Math.sin(angle);

    const rotatedY =
      x * Math.sin(angle) + y * Math.cos(angle);

    ref.current.position.x = centerX + rotatedX;
    ref.current.position.y = centerY + rotatedY;
    ref.current.position.z = 0;

    ref.current.rotation.x += 0.008;
    ref.current.rotation.y += 0.008;
  });

  return (
    <mesh ref={ref} rotation={[Math.PI / 2, 0, 0]}>
      <torusGeometry args={[0.4, 0.25, 200, 32]} />
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
  emissive="#0F48A0 ,#3B42F6 "
  emissiveIntensity={0.5}
/>
    </mesh>
  );
}

export default function Section3D(): JSX.Element {
  return (
<div className="absolute inset-0 pointer-events-none">     
   <Canvas  camera={{ position: [0, 0, 20], fov: 50 }}>

        {/* THIS LINE FIXES THE STEEL LOOK */}
        <Environment preset="sunset"/>

        <ambientLight intensity={0.4} />

        <directionalLight position={[5, 5, 5]} intensity={2} />
        <directionalLight position={[-5, -5, 5]} intensity={2} />

        <Ring />
        <Knot />

      </Canvas>
    </div>
  );
}