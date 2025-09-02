"use client"

import FloatingCan from "@/components/FloatingCan"
import { Environment, OrbitControls } from "@react-three/drei"
import { useRef } from "react"
import { Group } from "three"

import gsap from "gsap";
import {useGSAP} from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger"

import {useStore} from "@/hooks/useStore";

type Props = {}

export default function Scene({}: Props) {
    const isReady = useStore((state)=>state.isReady);
    
    const can1Ref = useRef<Group>(null)
    const can2Ref = useRef<Group>(null)
    const can3Ref = useRef<Group>(null)
    const can4Ref = useRef<Group>(null)
    const can5Ref = useRef<Group>(null)

    const can1GroupRef = useRef<Group>(null)
    const can2GroupRef = useRef<Group>(null)

    const groupRef = useRef<Group>(null)

    const FLOAT_SPEED = 1.5

    useGSAP(() => {
        if (
            !can1Ref.current ||
            !can2Ref.current ||
            !can3Ref.current ||
            !can4Ref.current ||
            !can5Ref.current ||
            !can1GroupRef.current ||
            !can2GroupRef.current ||
            !groupRef.current
        ) return;
        
        isReady();

        // Set starting locations for cans
        gsap.set(can1Ref.current.position, { x: -1.5 , y: "+=.2"});
        gsap.set(can1Ref.current.rotation, { z: -0.35 });

        gsap.set(can2Ref.current.position, { x: 1.5 , y: "+=.2"});
        gsap.set(can2Ref.current.rotation, { z: 0.35 });

        gsap.set(can3Ref.current.position, { y: 5, z: 2 });
        gsap.set(can4Ref.current.position, { x: 2, y: 4, z: 2 });
        gsap.set(can5Ref.current.position, { y: -5 });
    
        const introTl = gsap.timeline({
            defaults: {
                duration: 3,
                ease: "back.out(1.4)"
            }
        })
        
        if (window.scrollY < 20) {
            introTl
              .from(can1GroupRef.current.position, { y: -5, x: 1 }, 0)
              .from(can1GroupRef.current.rotation, { z: 3 }, 0)
              .from(can2GroupRef.current.position, { y: 5, x: 1 }, 0)
              .from(can2GroupRef.current.rotation, { z: 3 }, 0);
        }

        const scrollTl = gsap.timeline({
            defaults: {
                duration: 2
            },
            scrollTrigger: {
                trigger: ".hero",
                start: "top top",
                end: "bottom bottom",
                scrub: 1.5,
            }
        })

        scrollTl
      // Rotate can group
        .to(groupRef.current.rotation, { y: Math.PI * 2 })

        // ultra
        .to(can1Ref.current.position, { x: 0, y: -0.5, z: 0  }, 0)
        .to(can1Ref.current.rotation, { z: -0.3 }, 0)

        // original
        .to(can2Ref.current.position, { x: .3, y: -1, z: 0.5 }, 0)
        .to(can2Ref.current.rotation, { z: 0.3 }, 0)

        // punch
        .to(can3Ref.current.position, { x: -0.2, y: -0.5, z: -0.5 }, 0)
        .to(can3Ref.current.rotation, { z: -0.1 }, 0)

        //pineapple
        .to(can4Ref.current.position, { x: 0.6, y: -1.8, z: -1 }, 0)
        .to(can4Ref.current.rotation, { z: 0.2 }, 0)

        //pithaya
        .to(can5Ref.current.position, { x: 0.8, y: -2, z: -0.8 }, 0)
        .to(can5Ref.current.rotation, { z: -0.1 }, 0)
        .to(
            groupRef.current.position,
            { x: 1, duration: 3, ease: "sine.inOut" },
            1.3,
        );

    })

    

  return (
    <group ref={groupRef}>
        <group ref={can1GroupRef}>
            <FloatingCan ref={can1Ref}
                scale={0.4} 
                position={[0, -1, 0]} 
                rotation={[0, 0, 0]}
                flavor="ultra"
                floatSpeed = {FLOAT_SPEED}
            />
        </group>
        <group ref={can2GroupRef}>
            <FloatingCan ref={can2Ref}
            scale={0.4} 
            position={[0, -1, 0]} 
            rotation={[0, 0, 0]}
            flavor="original"
            floatSpeed = {FLOAT_SPEED}
            />
        </group>
        <FloatingCan ref={can3Ref}
            scale={0.048} 
            position={[0, -1, 0]} 
            rotation={[0, 0, 0]}
            flavor="punch"
            floatSpeed = {FLOAT_SPEED}
        />
        <FloatingCan ref={can4Ref}
            scale={0.4} 
            position={[0.4, -1.4, 0]} 
            rotation={[0, -Math.PI / 3, 0]}
            flavor="pineapple"
            floatSpeed = {FLOAT_SPEED}
            rotationIntensity={0.4}
        />
        <FloatingCan ref={can5Ref}
            scale={0.4} 
            position={[0, -2, 0]} 
            rotation={[0, -Math.PI / 3, 0]}
            flavor="pithaya"
            floatSpeed = {FLOAT_SPEED}
            rotationIntensity={0.4}
        />
        <Environment files="/hdrs/field.hdr" environmentIntensity={1.0}/>
    </group>
    )
}