"use client"
import UseSideBar from '@/context/use-sidebar'
import { cn } from '@/lib/utils'
import React from 'react'
import MaxMenu from './maximized-menu'
import MinMenu from './minimized-menu'

type Props = {
    domains: 
    {
        id: string
        name: string
        icon: string
    }[]
    | null
    | undefined
}

const SideBar = ({domains}: Props) => {
    const { expand, onExpand, page, onSignOut} = UseSideBar();
  return (
    <div className={cn(
      " z-50 bg-cream h-screen w-[60px] fill-mode-forwards fixed md:relative dark:bg-black",
      expand == undefined
       && '',
       expand == true
       ? "animate-open-sidebar"
       : expand == false && "animate-close-sidebar"
    )}>
      {expand ? (
        <MaxMenu
          domains = {domains}
          current={page!}
          onExpand={onExpand}
          onSignOut={onSignOut}
        />
      ): (
        <MinMenu
        domains = {domains}
        current={page!}
        onShrink={onExpand}
        onSignOut={onSignOut}
        />
      )}
    </div>
  )
}

export default SideBar