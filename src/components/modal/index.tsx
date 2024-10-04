import React from 'react'

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import Image from 'next/image'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { cloudianryCofig } from '@/lib/utils'

type Props = {
    trigger: React.ReactNode
    children: React.ReactNode
    title: string
    description: string
    type?: "Integration"
    logo?: string
}

const Modal = ({trigger,children,title,description,type,logo}: Props) => {
    switch(type){
        case "Integration":
            return (
                <Dialog>
                    <DialogTrigger asChild>
                        {trigger}
                    </DialogTrigger>
                    <DialogContent>
                        <div className="flex  justify-end gap-3">
                            <div className="w-12 h-12 relative">
                                <Image
                                    //upload image in cloudinary then change src url WIP
                                    src={`https://res.cloudinary.com/dqglrqnma/image/upload/v1727542119/botly-ai/zfshpc9ubw5ycmtadpmu.png`}
                                    fill
                                    alt="Botly"
                                />
                            </div>  
                            <div className="text-gray-400">
                                <ArrowLeft size={20} />
                                <ArrowRight size={20} />
                            </div>
                            <div className="w-1/2 h-1/2 relative">
                                <Image
                                    src={`https://res.cloudinary.com/${cloudianryCofig.cloud_name}/image/upload/f_auto,q_auto/${logo}`}
                                    height={50}
                                    width={50}
                                    alt="Stripe"
                                />
                            </div>
                        </div>
                        <DialogHeader className="flex items-center">
                            <DialogTitle className="text-xl">{title}</DialogTitle>
                            <DialogDescription className="text-center">
                                {description}
                            </DialogDescription>
                        </DialogHeader>
                        {children}
                    </DialogContent>
                </Dialog>
            )
            default:
                return (
                    <Dialog>
                        <DialogTrigger asChild>
                            {trigger}
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle className="text-xl">
                                    {title}
                                </DialogTitle>
                                <DialogDescription>
                                    {description}
                                </DialogDescription>
                            </DialogHeader>
                            {children}
                        </DialogContent>
                    </Dialog>
                )
    }
}

export default Modal