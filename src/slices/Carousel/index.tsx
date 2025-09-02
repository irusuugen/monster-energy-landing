"use client"

import { FC, JSX, useState } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, PrismicText, SliceComponentProps } from "@prismicio/react";
import { Center, Environment, View } from "@react-three/drei";
import FloatingCan from "@/components/FloatingCan";
import { DrinkCanProps } from "@/components/MonsterCan";
import Button from "@/components/Button";



const FLAVORS: {
  flavor: DrinkCanProps["flavor"];
  color: string;
  name: string;
  scale?: number;
  position?: number[]; 
  rotation?: number[];
}[] = [
  { 
    flavor: "original", 
    color: "#710523", 
    name: "Original", 
    scale: 0.4, 
    position: [0, 0, 0], 
    rotation: [0, 0, 0] 
  },
  { 
    flavor: "ultra", 
    color: "#572981", 
    name: "Ultra" },
  { 
    flavor: "punch", 
    color: "#164405", 
    name: "Punch" 
  },
  {
    flavor: "pineapple",
    color: "#690B3D",
    name: "Pineapple",
  },
  { 
    flavor: "pithaya", 
    color: "#4B7002", 
    name: "Pithaya" 
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

  function changeFlavor(index:number){
    const nextIndex = (index + FLAVORS.length) % FLAVORS.length
    setCurrentFlavorIndex(index)
  }

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="carousel relative grid h-screen grid-rows-[auto,4fr,auto] justify-center overflow-hidden bg-white py-12 text-[#020202]"
    >
      <div className="background pointer-events-none absolute inset-0 bg-[#046C33]"/>
      <h2 className="relative text-center text-5xl font-heading font-bold">
        <PrismicText field={slice.primary.heading}/>
      </h2>

      <div className="grid grid-cols-[auto,auto,auto] items-center">
        <button onClick={()=>changeFlavor(currentFlavorIndex+1)}
        className="z-20">
          Left
        </button>
        
        
        <View className="aspect-suare h-[70vmin] min-h-40">
          <Center position={[0, 0, 1.5]}>
            <FloatingCan 
            floatIntensity={0.3} 
            rotationIntensity={1}
            scale={0.4} 
            position={[0, 0, 0]} 
            rotation={[0, 0, 0]}
            flavor={FLAVORS[currentFlavorIndex].flavor}
            />
          </Center>
          <Environment 
          files="/hdrs/lobby.hdr"
          environmentIntensity={0.6}
          environmentRotation={[0,3,0]}
          />
          <directionalLight intensity={6} position={[0,1,1]}/>
        </View>
      </div>

      <PrismicRichText field={slice.primary.price_copy}/>
      
    </section>
  );
};

export default Carousel;
