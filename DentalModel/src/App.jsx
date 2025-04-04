import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { useState } from "react";

function Model({ onSelect }) {
  const { nodes } = useGLTF("/FirstTry.glb"); // Correct model path
  const [selected, setSelected] = useState(null);

  return (
    <group>
      {Object.keys(nodes).map((key) => {
        const node = nodes[key];

        // Make "Molar3_Crown" the only selectable part
        if (key === "Molar3_Crown") {
          return (
            <mesh
              key={key}
              geometry={node.geometry}
              material={node.material}
              onClick={(e) => {
                e.stopPropagation();
                setSelected(key);
                onSelect && onSelect(key);
              }}
              onPointerOver={() => (document.body.style.cursor = "pointer")}
              onPointerOut={() => (document.body.style.cursor = "default")}
            >
              {/* Change color when selected */}
              <meshStandardMaterial color={selected === key ? "yellow" : "white"} />
            </mesh>
          );
        }
        return <primitive key={key} object={node} />;
      })}
    </group>
  );
}

export default function App() {
  const [selectedPart, setSelectedPart] = useState(null);

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Canvas camera={{ position: [0, 2, 5] }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[2, 2, 2]} />
        <Model onSelect={(part) => setSelectedPart(part)} />
        <OrbitControls />
      </Canvas>
      {selectedPart && <div style={{ position: "absolute", top: 20, left: 20, color: "white" }}>Selected: {selectedPart}</div>}
    </div>
  );
}
