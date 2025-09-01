import React from 'react'
import MonsterLogo from '@/components/MonsterLogo'

type Props = {}

export default function Header({}: Props) {
  return (
    <header className="flex justify-center py-5 -mb-60 md:-mb-48 mt-2">
        <MonsterLogo className="h-40 z-10 cursor-pointer"/>
    </header>
  )
}