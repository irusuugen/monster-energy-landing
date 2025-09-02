"use client"

import { FC, JSX, useRef, useState } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, PrismicText, SliceComponentProps } from "@prismicio/react";
import { Center, Environment, View } from "@react-three/drei";
import FloatingCan from "@/components/FloatingCan";
import { DrinkCanProps } from "@/components/MonsterCan";
import Button from "@/components/Button";
import { ArrowIcon } from "./ArrowIcon";
import clsx from "clsx";
import { Group } from "three";
import gsap from "gsap";

const SPINS_ON_CHANGE = 8;
const FLAVORS: {
  flavor: DrinkCanProps["flavor"];
  color: string;
  name: string;
  scale?: number;
  position?: number[]; 
  rotation?: number[];
  rotationIntensity?: number;
}[] = [
  { 
    flavor: "original", 
    color: "#710523", 
    name: "Original", 
    scale: 0.38, 
    position: [0, -1, 0], 
    rotation: [0, 0, 0] 
  },
  { 
    flavor: "ultra", 
    color: "#572981", 
    name: "Ultra",
    scale: 0.38,
    position: [0, -1, 0], 
    rotation:[0, 0, 0]
  },
  { 
    flavor: "punch", 
    color: "#164405", 
    name: "Punch",
    scale: 0.046,
    position: [0, -1, 0], 
    rotation: [0, 0, 0]
  },
  {
    flavor: "pineapple",
    color: "#690B3D",
    name: "Pineapple",
    scale: 0.30,
    position: [0, -1.2, 0],
    rotation: [0, -Math.PI / 3, 0],
    rotationIntensity: 0.3
  },
  { 
    flavor: "pithaya", 
    color: "#4B7002", 
    name: "Pithaya",
    scale: 0.38,
    position: [-0.05, -2, 0],
    rotation: [0, -Math.PI / 3, 0],
    rotationIntensity: 0.3
  },
];

/**
 * Props for `Carousel`.
 */
export type CarouselProps = SliceComponentProps<Content.CarouselSlice>;

/**
 * Component for "Carousel" Slices.
 */
const Carousel: FC<CarouselProps> = ({ slice }: CarouselProps): JSX.Element => {
  const [currentFlavorIndex, setCurrentFlavorIndex] = useState(0);
const drinkCanRef = useRef<Group>(null);

function changeFlavor(index: number) {
  if (!drinkCanRef.current) return;

  const nextIndex = (index + FLAVORS.length) % FLAVORS.length;

  const tl = gsap.timeline();

  tl.to(
    drinkCanRef.current.rotation,
    {
      y:
        index > currentFlavorIndex
          ? `-=${Math.PI * 2 * SPINS_ON_CHANGE}`
          : `+=${Math.PI * 2 * SPINS_ON_CHANGE}`,
      ease: "power2.inOut",
      duration: 1,
    },
    0,
  )
    // .to(
    //   ".background, .wavy-circles-outer, .wavy-circles-inner",
    //   {
    //     backgroundColor: FLAVORS[nextIndex].color,
    //     fill: FLAVORS[nextIndex].color,
    //     ease: "power2.inOut",
    //     duration: 1,
    //   },
    //   0,
    // )
    .to(".text-wrapper", { duration: 0.2, y: -10, opacity: 0 }, 0)
    .to({}, { onStart: () => setCurrentFlavorIndex(nextIndex) }, 0.5)
    .to(".text-wrapper", { duration: 0.2, y: 0, opacity: 1 }, 0.7);
}


  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="carousel relative grid h-screen grid-rows-[auto,4fr,auto] justify-center overflow-hidden bg-white py-12 text-[#020202]"
    >
      <div className="background pointer-events-none absolute inset-0 bg-[#046C33]"/>
      <h2 className="relative text-center text-6xl font-heading font-bold">
        <PrismicText field={slice.primary.heading}/>
      </h2>

      <div className="flex items-center justify-center gap-6">
        <ArrowButton
          onClick={() => changeFlavor(currentFlavorIndex - 1)}
          direction="left"
          label="Previous Flavor"
        />

        
        <View className="aspect-square h-[70vmin] min-h-40 -mt-4">
          <Center position={[0, 0, 1.5]}>
            <FloatingCan 
              ref={drinkCanRef}
              floatIntensity={0.3} 
              rotationIntensity={1}
              scale={FLAVORS[currentFlavorIndex].scale}
              position={FLAVORS[currentFlavorIndex].position}
              rotation={FLAVORS[currentFlavorIndex].rotation}
              flavor={FLAVORS[currentFlavorIndex].flavor}
              rotationIntensity={FLAVORS[currentFlavorIndex].rotationIntensity ?? 1}
            />
          </Center>
          <Environment 
            files="/hdrs/lobby.hdr"
            environmentIntensity={0.3}
            environmentRotation={[0,3,0]}
          />
          <directionalLight intensity={6} position={[0,1,1]}/>
        </View>

        <ArrowButton
          onClick={() => changeFlavor(currentFlavorIndex + 1)}
          direction="right"
          label="Next Flavor"
        />
      </div>

      <div className="text-area relative mx-auto text-center">
        <div className="text-wrapper text-4xl font-medium">
          <p>{FLAVORS[currentFlavorIndex].name}</p>
        </div>
        <div className="mt-2 text-xl font-normal opacity-90">
          <PrismicRichText field={slice.primary.price_copy}/>
        </div>
      </div>

      
      
    </section>
  );
};

export default Carousel;

type ArrowButtonProps = {
  direction?: "right" | "left";
  label: string;
  onClick: () => void;
};

function ArrowButton({
  label,
  onClick,
  direction = "right",
}: ArrowButtonProps) {
  return (
    <button
      onClick={onClick}
      className="size-12 rounded-full border-2 border-black bg-white/10 p-3 opacity-85 ring-white focus:outline-none focus-visible:opacity-100 focus-visible:ring-4 md:size-16 lg:size-20 cursor-pointer hover:cursor-pointer"
    >
      <ArrowIcon className={clsx(direction === "right" && "-scale-x-100")} />
      <span className="sr-only">{label}</span>
    </button>
  );
}