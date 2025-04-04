import { useGLTF } from "@react-three/drei";
import { useState } from "react";

function SelectableModel({ modelPath, onSelect }) {
  const { nodes } = useGLTF(modelPath);
  const [selected, setSelected] = useState(null);

  return (
    <group>
      {Object.keys(nodes).map((key) => {
        const node = nodes[key];

        // Only allow selection for "Molar3_Crown"
        if (key === "Molar3_Crown") {
          return (
            <mesh
              key={key}
              geometry={node.geometry}
              material={node.material}
              position={node.position}
              onClick={(e) => {
                e.stopPropagation();
                setSelected(key);
                onSelect && onSelect(key);
              }}
              onPointerOver={(e) => {
                e.stopPropagation();
                document.body.style.cursor = "pointer";
              }}
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

export default SelectableModel;