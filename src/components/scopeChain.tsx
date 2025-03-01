import { Canvas } from "@react-three/fiber";
import { OrbitControls, Sphere, Line, Html } from "@react-three/drei";
import { useState, useMemo } from "react";

const ScopeChain = () => {
  // State to track selected scope
  const [selectedScope, setSelectedScope] = useState<string | null>(null);

  // Define scopes with positions, colors, and corresponding JS code
  const scopes = useMemo(() => [
    { 
      name: "Global Scope", position: [0, 3, 0], color: "blue", 
      code: `var globalVar = "I am global";`
    },
    { 
      name: "Function Scope", position: [-2, 1.5, 0], color: "green", 
      code: `function myFunction() { var functionVar = "I exist in function"; }`
    },
    { 
      name: "Block Scope", position: [2, 1.5, 0], color: "red", 
      code: `{ let blockVar = "I exist only in this block"; }`
    },
    { 
      name: "Nested Block", position: [0, 0, 0], color: "yellow", 
      code: `if (true) { const nestedVar = "I exist only inside this if"; }`
    },
  ], []);

  // Scope connections (parent-child relationships)
  const connections = useMemo(() => [
    [scopes[0].position as [number, number, number], scopes[1].position as [number, number, number]], // Global -> Function
    [scopes[1].position as [number, number, number], scopes[2].position as [number, number, number]], // Function -> Block
    [scopes[2].position as [number, number, number], scopes[3].position as [number, number, number]], // Block -> Nested Block
  ], [scopes]);

  return (
    <>
      {/* Render spheres for each scope */}
      {scopes.map((scope, index) => (
        <Sphere 
          key={index} args={[0.3, 32, 32]} position={[...scope.position] as [number, number, number]}
          onClick={() => setSelectedScope(scope.code)} // Show code on click
        >
          <meshStandardMaterial color={scope.color} />
          {/* Scope Labels */}
          <Html position={[0, 0.4, 0]} center>
            <div style={{ color: "white", fontSize: "12px", background: "rgba(0,0,0,0.7)", padding: "4px", borderRadius: "4px" }}>
              {scope.name}
            </div>
          </Html>
        </Sphere>
      ))}

      {/* Render lines to connect scopes */}
      {connections.map((conn, i) => (
        <Line key={i} points={conn} color="white" />
      ))}

      {/* Floating code display */}
      {selectedScope && (
        <Html position={[0, -2, 0]} center>
          <div style={{
            background: "black", color: "white", padding: "10px",
            borderRadius: "5px", fontFamily: "monospace", whiteSpace: "pre-wrap"
          }}>
            <strong>Code:</strong>
            <pre>{selectedScope}</pre>
          </div>
        </Html>
      )}
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
