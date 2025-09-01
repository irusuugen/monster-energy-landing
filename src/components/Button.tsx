import { LinkField } from '@prismicio/client';
import { PrismicNextLink } from '@prismicio/next'
import clsx from 'clsx';
import React from 'react'

type Props = {
    buttonLink: LinkField;
    buttonText: string | null
    className?: string;
}

export default function Button({buttonLink, buttonText, className}: Props) {
  return (
    <PrismicNextLink
        className={clsx(
            "duration-200 rounded-xl bg-[#058C42] px-5 py-4 text-center text-xl md:text-2xl uppercase font-bold font-heading tracking-widest text-[#DAD7CD] transition-colors hover:bg-[#04471C]",
            className
        )} 
        field={buttonLink}
    >
    {buttonText}
    </PrismicNextLink>
  )
}