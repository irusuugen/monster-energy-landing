"use client";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

// Paths to each flavour model
const flavorModels = {
  ultra: "/models/monster-ultra/scene.gltf",
};

// Preload all models for performance
Object.values(flavorModels).forEach(modelPath => {
  useGLTF.preload(modelPath);
});

export type DrinkCanProps = {
  flavor?: keyof typeof flavorModels;
  scale?: number;
  position?: [number, number, number],
};

export function MonsterCan({
  flavor = "ultra",
  scale = 2,
  position = [0, 0, 0],
  ...props
}: DrinkCanProps) {
  // Load the specific model for this flavor
  const { scene } = useGLTF(flavorModels[flavor]);
  
  // Clone scene to avoid issues when using multiple instances
  const clonedScene = scene.clone();
  
  return (
    <group {...props} dispose={null} scale={scale} rotation={[0, -Math.PI, 0]}>
      <primitive object={clonedScene} position={position}/>
    </group>
  );
}