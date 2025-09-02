"use client";

import { FC, JSX } from "react";
import { Content, asText } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { Bounded } from "@/components/Bounded";
import Button from "@/components/Button";
import { TextSplitter } from "@/components/TextSplitter";

import gsap from "gsap";
import {useGSAP} from "@gsap/react";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import { View } from "@react-three/drei";
import Scene from "./Scene";

import { Bubbles } from "./Bubbles";

import {useStore} from "@/hooks/useStore"
import { useMediaQuery } from "@/hooks/useMediaQuery";

gsap.registerPlugin(useGSAP, ScrollTrigger);

/**
 * Props for `Hero`.
 */
export type HeroProps = SliceComponentProps<Content.HeroSlice>;

/**
 * Component for "Hero" Slices.
 */
const Hero: FC<HeroProps> = ({ slice }: HeroProps): JSX.Element => {

  const ready = useStore((state) => state.ready);
  const isDesktop = useMediaQuery("(min-width: 768px)", true)

  useGSAP(()=>{
    if (!ready && isDesktop) return;
    const introTl = gsap.timeline();
    introTl
    .set(".hero", {opacity:1})
    .from(".hero-header-word", {
      scale: 3,
      opacity: 0,
      ease: "power4.in",
      delay: 1,
      stagger: 0.8,
    })
    .from(".hero-subheading", {
      opacity: 0,
      y:30,
    }, "+=.5")
    .from(".hero-body", {
      opacity:0,
      y:10,
    })
    .from(".hero-button", {
      opacity: 0,
      y: 10,
      duration: 0.6,
    })

    const scrollTl = gsap.timeline({
      scrollTrigger:{
        trigger: ".hero",
        start: "top -50%",
        end: "bottom bottom",
        scrub: 1.5,
      }
    });
    scrollTl
    .fromTo("body", {
      backgroundColor: "#020202"
    }, {
      backgroundColor: "#046C33",
      overwrite: "auto",
    }, 0.8)
    .from(".text-side-heading .split-char", {
      scale:1.3,
      y:40,
      rotate:-25,
      opacity:0,
      stagger:0.1,
      ease:"back.out(3)",
      duration:.5,
    })
    .from(".text-side-body", {
      y:20,
      opacity:0,
    })
  }, {dependencies: [ready]})
  
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="hero"
    >

      {isDesktop && (
        <View className="hero-scene pointer-events-none sticky top-0 z-50 -mt-[100vh] hidden h-screen w-screen md:block">
          <Scene />
          <Bubbles count={300} speed={2} repeat={true} bubbleSize={0.04}/>
        </View>
      )}

      <div className="min-h-screen">
        <div className="grid h-screen place-items-center">
          <div className="grid auto-rows-min place-items-center text-center px-4 md:mt-36 mt-18">
            <h1 className="hero-header text-7xl font-black font-heading uppercase leading-[.8] text-[#058C42] md:text-9xl md:-mt-16">
              <TextSplitter 
                text={asText(slice.primary.heading)} 
                wordDisplayStyle="block"
                className="hero-header-word mx-auto"
              />
            </h1>
            <div className="hero-subheading mt-6 text-3xl font-regular lg:text-4xl font-semibold font-body text-[#DAD7CD] max-w-4xl">
              {asText(slice.primary.subheading)}
            </div>
            <div className="hero-body text-base font-body text-[#DAD7CD] mt-4 max-w-2xl">
              {asText(slice.primary.body)}
            </div>
            <Button 
              buttonLink={slice.primary.button_link}
              buttonText={slice.primary.button_text}
              className="hero-button mt-6"
            />
          </div>
        </div>

        <div className="text-side relative z-[80] min-h-screen flex items-center py-20">
          <div className="grid gap-8 md:gap-12 md:grid-cols-2 items-center w-full px-4">
            
            <div className="md:hidden flex justify-center -mt-50">
              <PrismicNextImage 
                className="w-3/4 max-w-sm" 
                field={slice.primary.cans_image} 
              />
            </div>
            
            <div className="space-y-6">
              <h2 className="text-side-heading text-balance text-5xl lg:text-6xl font-black uppercase text-[#020202] font-heading">
                <TextSplitter text={asText(slice.primary.second_heading)}/>
              </h2>
              <div className="text-side-body max-w-xl text-balance text-base font-normal text-[#DAD7CD] leading-relaxed">
                {asText(slice.primary.second_body)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Bounded>
  );
};

export default Hero;