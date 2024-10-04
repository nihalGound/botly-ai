import React from 'react'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '../ui/sheet'

type Props = {
    trigger: React.ReactNode
    title: string
    description: string
    children: React.ReactNode
    className?:string
}

const SideSheet = ({trigger,title,description,children,className}: Props) => {
  return (
    <Sheet>
        <SheetTrigger className={className}>{trigger}</SheetTrigger>
        <SheetContent>
            <SheetHeader>
                <SheetTitle>{title}</SheetTitle>
                <SheetDescription>{description}</SheetDescription>
            </SheetHeader>
            {children}
        </SheetContent>
    </Sheet>
  )
}

export default SideSheet