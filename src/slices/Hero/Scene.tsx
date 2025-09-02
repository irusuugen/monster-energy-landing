"use client"

import FloatingCan from "@/components/FloatingCan"
import { Environment } from "@react-three/drei"


type Props = {}

export default function Scene({}: Props) {
  return (
    <group>
        <FloatingCan scale={0.4} position={[0, 0, 0]}/>
        <Environment files="/hdrs/lobby.hdr" environmentIntensity={1.5}/>
    </group>
    )
}