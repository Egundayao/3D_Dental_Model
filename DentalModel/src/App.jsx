import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useState } from "react";
import Model from "./components/Model"; // Adjust path if needed

export default function App() {
  const [partColors, setPartColors] = useState({});
  const [isVisible, setIsVisible] = useState({
    Tongue: true,
    Back: true,
  });

  const handleSelect = (part) => {
    setPartColors((prev) => {
      const currentState = prev[part] || 0;
      const nextState = (currentState + 1) % 3;
      return {
        ...prev,
        [part]: nextState,
      };
    });
  };

  const getColor = (part) => {
    switch (partColors[part]) {
      case 0:
        return "red";
      case 1:
        return "blue";
      default:
        return null;
    }
  };

  const toggleVisibility = () => {
    setIsVisible((prevState) => ({
      Tongue: !prevState.Tongue,
      Back: !prevState.Back,
    }));
  };

  return (
    <div style={{ width: "100vw", height: "100vh", position: "relative" }}>
      <Canvas camera={{ position: [0, 2, 5] }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[2, 2, 2]} />
        <Model
          onSelect={handleSelect}
          getColor={getColor}
          isVisible={isVisible}  // Pass visibility state to Model component
        />
        <OrbitControls />
      </Canvas>

      {/* Clear All Button */}
      <button
        onClick={() => setPartColors({})}
        style={{
          position: "absolute",
          top: "20px",
          left: "20px",
          padding: "10px 16px",
          background: "#fff",
          border: "1px solid #ccc",
          borderRadius: "8px",
          cursor: "pointer",
          fontWeight: "bold",
          color: "black",
        }}
      >
        Clear All
      </button>

      {/* Toggle Visibility Button */}
      <button
        onClick={toggleVisibility}
        style={{
          position: "absolute",
          top: "60px",
          left: "20px",
          padding: "10px 16px",
          background: "#fff",
          border: "1px solid #ccc",
          borderRadius: "8px",
          cursor: "pointer",
          fontWeight: "bold",
          color: "black",
        }}
      >
        Toggle Tongue/Back
      </button>
    </div>
  );
}
