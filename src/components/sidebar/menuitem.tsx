import { cn } from '@/lib/utils'
import Link from 'next/link'
import React from 'react'

type Props = {
    size: "max" | "min"
    label: string
    icon: JSX.Element
    path?: string
    current?: string
    onSignOut?():void
}

const MenuItem = ({size, path, icon, label, current, onSignOut}: Props) => {

  return (
    <Link
        onClick={onSignOut}
        className={cn(
            size==="min" ? 'flex items-center justify-center  rounded-lg py-2 my-1' : "flex items-center gap-2 px-1 py-2 rounded-lg my-1",
            !current
            ? "text-gray-500"
            : current == path
            ? "bg-white font-extrabold text-black"
            : "text-gray-500"
            
        )}
        href={path ? `/${path}` : '#'}
    >
        {icon}
        {size === "max"
            ? label
            : ""
        }
    </Link>
  )
}

export default MenuItem