import AiChatBot from '@/components/chatbot'
import React from 'react'

type Props = {}

const ChatBot = (props: Props) => {
  return (
    <div className="h-screen w-screen">
      <AiChatBot />
    </div>
  )
}

export default ChatBot