"use client"

import { Float } from '@react-three/drei'
import { ReactNode, forwardRef } from 'react'
import { Group } from 'three'
import { DrinkCanProps, MonsterCan } from './MonsterCan'

type FloatingCanProps = {
    flavor?: DrinkCanProps["flavor"];
    floatSpeed?: number;
    rotationIntensity?: number;
    floatIntensity?: number;
    floatingRange?: [number, number];
    children?: ReactNode;
    scale?: number;
    position?: [number, number, number];
}

const FloatingCan = forwardRef<Group, FloatingCanProps>(({
    flavor = "ultra",
    floatSpeed = 1.5,
    rotationIntensity = 1,
    floatIntensity = 1,
    floatingRange = [-0.1, 0.1],
    children,
    scale = 1.5, 
    position = [0, 0, 0], 
    ...props
}, ref,
    
) => {
  return (
    <group ref={ref} {...props}>
        <Float
            speed={floatSpeed} // Animation speed
            rotationIntensity={rotationIntensity} // XYZ rotation
            floatIntensity={floatIntensity} // Up/down float
            floatingRange={floatingRange}
        >
            {children}
            <MonsterCan flavor={flavor} scale={scale} position={position}/>
        </Float>
    </group>
  )
})

FloatingCan.displayName = "FloatingCan"

export default FloatingCan