"use client";

import { Environment, Scroll } from "@react-three/drei";
import { useRef } from "react";
import { Group } from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import FloatingCan from "@/components/FloatingCan";
import { useMediaQuery } from "@/hooks/useMediaQuery";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type Props = {};

export default function Scene({}: Props) {
  const canRef = useRef<Group>(null);
  const isDesktop = useMediaQuery("(min-width: 768px)", true);
  const isTablet = useMediaQuery("(min-width: 640px)", true);

  const bgColors = ["#020202", "#046C33", "#020202"];

  useGSAP(
    () => {
      if (!canRef.current) return;

      const sections = gsap.utils.toArray(".alternating-section");

      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".alternating-text-view",
          endTrigger: ".alternating-text-container",
          pin: true,
          start: "top top",
          end: "bottom bottom",
          scrub: 2,
          anticipatePin: 1,
        },
      });

      sections.forEach((_, index) => {
        if (!canRef.current) return;
        if (index === 0) return;

        const isOdd = index % 2 !== 0;

        const xPosition = isDesktop 
          ? (isOdd ? -1.2 : 1.2) 
          : isTablet 
          ? (isOdd ? -0.8 : 0.8)
          : (isOdd ? -0.4 : 0.4);
        
        const yRotation = isDesktop 
          ? (isOdd ? 0.3 : -0.3) 
          : isTablet 
          ? (isOdd ? 0.2 : -0.2)
          : (isOdd ? 0.1 : -0.1);

        const zPosition = isDesktop ? 0 : -0.5; 
        
        scrollTl
          .to(canRef.current.position, {
            x: xPosition,
            z: zPosition,
            duration: 1.5, 
            ease: "power2.inOut",
          })
          .to(
            canRef.current.rotation,
            {
              y: yRotation,
              duration: 1.5,
              ease: "power2.inOut", 
            },
            "<0.2", 
          )
          .to(
            ".alternating-text-container", 
            {
              backgroundColor: gsap.utils.wrap(bgColors, index),
              duration: 1.2,
              ease: "power2.inOut",
            },
            "<0.1"
          );
      });
    },
    { dependencies: [isDesktop, isTablet] },
  );

  return (
    <group
      ref={canRef}
      position-x={isDesktop ? 0.8 : isTablet ? 0.4 : 0}
      position-y={-0.5}
      rotation-y={isDesktop ? -0.2 : isTablet ? -0.15 : -0.1}
    >
      <FloatingCan 
        scale={isDesktop ? 0.4 : isTablet ? 0.35 : 0.28} 
        position={[0, -0.4, 0]} 
        rotation={[0, 0, 0]}
        flavor="ultra" 
      />
      <Environment files={"/hdrs/lobby.hdr"} environmentIntensity={1.5} />
    </group>
  );
}