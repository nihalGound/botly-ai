import React from 'react'
import BreadCrumb from './bread-crumb'
import { Card } from '../ui/card'
import { Headphones, Star, Trash } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"

type Props = {}

const InfoBar = (props: Props) => {
  return (
    <div className=" flex w-full justify-between items-center py-1 mb-8 gap-y-2 max-md:flex-wrap">
        <BreadCrumb  />
    </div>
  )
}

export default InfoBar