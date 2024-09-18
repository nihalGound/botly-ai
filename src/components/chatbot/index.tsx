"use client"
import { useChatBot } from '@/hooks/chatbot/use-chatbot';
import React from 'react'
import BotWindow from './window';
import { cloudianryCofig, cn } from '@/lib/utils';
import Image from 'next/image';
import { BotIcon } from '@/icons/bot-icon';

type Props = {}

const AiChatBot = (props: Props) => {
  const {
    onOpenChatBot,
    botOpened,
    onChats,
    register,
    onStartChatting,
    onAiTyping,
    messageWindowRef,
    currentBot,
    loading,
    onRealTime,
    setOnChats,
    errors
  } = useChatBot();
  return (
    <div className="h-screen md:w-fit w-screen flex flex-col justify-end items-end gap-y-1">
      {botOpened && (
        <BotWindow 
          errors={errors}
          setChat={setOnChats}
          realtimeMode={onRealTime}
          helpdesk={currentBot?.helpdesk!}
          domainName={currentBot?.name!}
          ref={messageWindowRef}
          help={currentBot?.chatBot?.helpdesk}
          theme={currentBot?.chatBot?.background}
          textColor={currentBot?.chatBot?.textColor}
          chats={onChats}
          register={register}
          onChat={onStartChatting}
          onResponding={onAiTyping}
        />
      )}
      <div
        className={cn(
          "rounded-full relative cursor-pointer shadow-md w-15 h-15 md:w-20 md:h-20 flex items-center justify-center bg-grandis",
          loading ? "invisible" : "visible"
        )}
        onClick={onOpenChatBot}
      >
        {currentBot?.chatBot?.icon ? (
          <Image
            src={`https://res.cloudinary.com/${cloudianryCofig.cloud_name}/image/upload/f_auto,q_auto/${currentBot.chatBot.icon}`}
            alt="bot"
            fill
          />
        ) : (
          <BotIcon  />
        )}
      </div>

    </div>
  )
}

export default AiChatBot