import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `BigText`.
 */
export type BigTextProps = SliceComponentProps<Content.BigTextSlice>;

/**
 * Component for "BigText" Slices.
 */
const BigText: FC<BigTextProps> = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="min-h-[90%] w-screen overflow-hidden bg-[#046C33]"
    >
      <h2 className="flex-col w-full gap-[5w] py-10 text-center font-black uppercase leading-[0.8] font-heading items-center">
        <div className="text-[45vw]">Soda</div>
        <div className="flex gap-[3vw] text-[40w] md:flex md:text-[11vw] justify-center">
          <span className="inline-block">that </span>
          <span className="inline-block max-md:text-[35vw]">gives </span>
          <span className="inline-block max-md:text-[46vw]">you</span>
        </div>
        <div className="text-[40vw]">power</div>
      </h2>
    </section>
  );
};

export default BigText;
