import { useGLTF } from "@react-three/drei";
import { useState, useEffect } from "react";

export default function Model({ onSelect }) {
  const { nodes } = useGLTF("/T37_Material_Testing_2.glb");
  const [selectedPart, setSelectedPart] = useState(null);

  const interactiveParts = {
    "Molar3_Crown": "yellow",
    "T37_Occlusal": "red",
    "T37_buccal": "lightgreen",
    "T37_lingual": "pink",
    "T37_distal.001": "orange",
    "T37_mesial": "violet",
  };

  const handleSelect = (part) => {
    setSelectedPart(part);
    if (onSelect) onSelect(part);
  };

  useEffect(() => {
    console.log("Loaded nodes:", nodes);
  }, [nodes]);

  return (
    <group>
      {/* Render ALL parts */}
      {Object.entries(nodes).map(([key, node]) => {
        if (!node.geometry) return null;

        const isInteractive = key in interactiveParts;
        const isSelected = selectedPart === key;

        return (
          <mesh
            key={key}
            geometry={node.geometry}
            onClick={isInteractive ? (e) => { e.stopPropagation(); handleSelect(key); } : undefined}
            onPointerOver={isInteractive ? () => (document.body.style.cursor = "pointer") : undefined}
            onPointerOut={isInteractive ? () => (document.body.style.cursor = "default") : undefined}
          >
            <meshStandardMaterial
              map={node.material.map || null}
              normalMap={node.material.normalMap || null}
              roughnessMap={node.material.roughnessMap || null}
              metalnessMap={node.material.metalnessMap || null}
              roughness={node.material.roughness}
              metalness={node.material.metalness}
              transparent={node.material.transparent}
              opacity={node.material.opacity}
              color={
                isInteractive && isSelected
                  ? interactiveParts[key] // If selected, use highlight color
                  : `#${node.material.color.getHexString()}` // Else use original color
              }
            />
          </mesh>
        );
      })}
    </group>
  );
}
