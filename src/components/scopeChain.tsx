import { Canvas } from "@react-three/fiber";
import { OrbitControls, Sphere, Line } from "@react-three/drei";
import { useMemo } from "react";

const ScopeChain = () => {
  // Define scope hierarchy
  const scopes = useMemo((): { name: string, position: [number, number, number], color: string }[] => [
    { name: "Global Scope", position: [0, 3, 0], color: "blue" }, 
    { name: "Function Scope", position: [-2, 1.5, 0], color: "green" },
    { name: "Block Scope", position: [2, 1.5, 0], color: "red" },
    { name: "Nested Block", position: [0, 0, 0], color: "yellow" },
  ], []);

  // Scope chain connections
  const connections = useMemo(() => [
    [scopes[0].position, scopes[1].position],
    [scopes[1].position, scopes[2].position],
    [scopes[2].position, scopes[3].position],
  ], [scopes]);

  return (
    <>
      {scopes.map((scope, index) => (
        <Sphere key={index} args={[0.3, 32, 32]} position={scope.position}>
          <meshStandardMaterial color={scope.color} />
        </Sphere>
      ))}

      {connections.map((conn, i) => (
        <Line key={i} points={conn} color="white" />
      ))}
    </>
  );
};

export default function ScopeVisualization() {
  return (
    <Canvas camera={{ position: [0, 5, 5], fov: 50 }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[5, 5, 5]} />
      <ScopeChain />
      <OrbitControls />
    </Canvas>
  );
}
