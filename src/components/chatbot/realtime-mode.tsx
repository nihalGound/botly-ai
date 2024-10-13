"use client"
import React from 'react'
import { Card } from '../ui/card'
import { useRealTime } from '@/hooks/chatbot/use-chatbot'

type Props = {
    setChats: React.Dispatch<
        React.SetStateAction<
            {
                role: 'user' | 'assistant'
                content: string
                link?: string | undefined
            }[]
        >
    >
    chatRoomId: string
}

const RealTimeMode = ({setChats,chatRoomId}: Props) => {
    useRealTime(chatRoomId,setChats)
  return (
    <Card className="px-3 rounded-full py-1 bg-orange font-bold text-white text-sm">
        Real Time
    </Card>
  )
}

export default RealTimeMode