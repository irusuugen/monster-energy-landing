import { FC } from "react";
import { Content, asText } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { Bounded } from "@/components/Bounded";
import Button from "@/components/Button";
import { TextSplitter } from "@/components/TextSplitter";

/**
 * Props for `Hero`.
 */
export type HeroProps = SliceComponentProps<Content.HeroSlice>;

/**
 * Component for "Hero" Slices.
 */
const Hero: FC<HeroProps> = ({ slice }) => {
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="hero"
    >
      <div className="min-h-screen">
        <div className="grid h-screen place-items-center">
          <div className="grid auto-rows-min place-items-center text-center px-4 md:mt-36 mt-18">
            <h1 className="hero-header text-7xl font-black font-heading uppercase leading-[.8] text-[#058C42] md:text-[9rem] lg:text-[10rem]">
              <TextSplitter 
                text={asText(slice.primary.heading)} 
                wordDisplayStyle="block"
                className="hero-header-word mx-auto"
              />
            </h1>
            <div className="hero-subheading mt-8 text-3xl font-regular lg:text-4xl font-semibold font-body text-[#DAD7CD] max-w-4xl">
              {asText(slice.primary.subheading)}
            </div>
            <div className="hero-body text-base font-body text-[#DAD7CD] mt-4 max-w-2xl">
              {asText(slice.primary.body)}
            </div>
            <Button 
              buttonLink={slice.primary.button_link}
              buttonText={slice.primary.button_text}
              className="hero-button mt-12"
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
              <h2 className="text-side-heading text-balance text-5xl lg:text-6xl font-black uppercase text-[#058C42] font-heading">
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