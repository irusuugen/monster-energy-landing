import React from 'react'
import MonsterLogo from './MonsterLogo'
import CircleText from './CircleText'

type Props = {}

export default function Footer({}: Props) {
  return (
    <footer className="bg-[#020202]">
        <div className="relative py-4">
            <MonsterLogo className="h-40 w-40 mx-auto -mb-1"/>
            <div className="absolute right-24 top-0 size-28 origin-center -translate-y-14 md:size-48 md:-translate-y-28 z-20">
                <CircleText/>
            </div>
        </div>
    </footer>
  )
}