import { useGLTF } from "@react-three/drei";
import { useState } from "react";

export default function Model({ onSelect }) {
  const { nodes } = useGLTF("/FirstTry.glb");
  const [selected, setSelected] = useState(null);

  const molarMesh = nodes["Molar3_Crown"];

  return (
    <group>
      {/* Render everything else in the model */}
      {Object.entries(nodes).map(([key, node]) => {
        if (key === "Molar3_Crown") return null; // we'll render it separately below
        if (!node.geometry) return null;
        return <primitive key={key} object={node} />;
      })}

      {/* Render the Molar3_Crown separately with interactivity */}
      {molarMesh && (
        <mesh
          geometry={molarMesh.geometry}
          material={molarMesh.material.clone()}
          onClick={(e) => {
            e.stopPropagation();
            setSelected("Molar3_Crown");
            onSelect && onSelect("Molar3_Crown");
          }}
          onPointerOver={() => (document.body.style.cursor = "pointer")}
          onPointerOut={() => (document.body.style.cursor = "default")}
        >
          <meshStandardMaterial
            attach="material"
            color={selected === "Molar3_Crown" ? "yellow" : "white"}
          />
        </mesh>
      )}
    </group>
  );
}
