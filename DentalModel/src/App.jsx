import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useState } from "react";
import Model from "./components/Model"; // adjust path based on where Model.jsx is

export default function App() {
  const [selectedPart, setSelectedPart] = useState(null);

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Canvas camera={{ position: [0, 2, 5] }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[2, 2, 2]} />
        <Model onSelect={setSelectedPart} />
        <OrbitControls />
      </Canvas>

      {selectedPart && (
        <div style={{ position: "absolute", top: 20, left: 20, color: "white" }}>
          Selected: {selectedPart}
        </div>
      )}
    </div>
  );
}
