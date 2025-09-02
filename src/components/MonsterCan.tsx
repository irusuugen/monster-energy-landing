"use client";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

// Paths to each flavour model
const flavorModels = {
  ultra: "/models/monster-ultra/scene.gltf",
  original: "/models/monster-original/scene.gltf",
  punch: "/models/monster-punch/scene.gltf",
  pineapple: "/models/monster-pineapple/scene.glb",
  pithaya: "/models/monster-pithaya/scene.glb"

};

// Preload all models for performance
Object.values(flavorModels).forEach(modelPath => {
  useGLTF.preload(modelPath);
});

export type DrinkCanProps = {
  flavor?: keyof typeof flavorModels;
};

export function MonsterCan({
  flavor = "original",
  ...props
}: DrinkCanProps) {
  // Load the specific model for this flavor
  const { scene } = useGLTF(flavorModels[flavor]);
     
  // Clone scene to avoid issues when using multiple instances
  const clonedScene = scene.clone();
     
  return (
    <group {...props} dispose={null}>
      <primitive object={clonedScene} />
    </group>
  );
}