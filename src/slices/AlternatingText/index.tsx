"use client";

import { Bounded } from "@/components/Bounded";
import { asText, Content } from "@prismicio/client";
import {
  PrismicRichText,
  PrismicText,
  SliceComponentProps,
} from "@prismicio/react";
import { View } from "@react-three/drei";
import Scene from "./Scene";
import clsx from "clsx";

/**
 * Props for `AlternatingText`.
 */
export type AlternatingTextProps =
  SliceComponentProps<Content.AlternatingTextSlice>;

/**
 * Component for "AlternatingText" Slices.
 */
const AlternatingText = ({ slice }: AlternatingTextProps): JSX.Element => {
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="alternating-text-container relative bg-[#020202] text-[#DAD7CD]"
    >
      <div>
        <div className="relative z-[100] grid">
          <View className="alternating-text-view absolute left-0 top-0 h-screen w-full">
            <Scene />
          </View>

          {slice.primary.text_group.map((item, index) => (
            <div
              key={asText(item.heading)}
              className="alternating-section grid min-h-screen place-items-center gap-x-8 gap-y-8 px-4 py-8 md:grid-cols-2 md:gap-x-12 md:py-0"
            >
              <div
                className={clsx(
                  index % 2 === 0 ? "col-start-1" : "md:col-start-2",
                  "w-full max-w-lg rounded-lg p-6 backdrop-blur-lg",
                  "bg-white/20 md:bg-white/10",
                  "border border-white/10 shadow-lg"
                )}
              >
                <h2 className="text-balance text-3xl font-bold font-heading leading-tight sm:text-4xl md:text-5xl lg:text-6xl">
                  <PrismicText field={item.heading} />
                </h2>
                <div className="mt-4 text-base leading-relaxed sm:text-lg md:text-xl">
                  <PrismicRichText field={item.body} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Bounded>
  );
};

export default AlternatingText;