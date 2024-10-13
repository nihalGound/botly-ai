"use client"
import { ChatBotMessageProps } from '@/schemas/conversation.schema'
import React, { forwardRef } from 'react'
import { UseFormRegister } from 'react-hook-form'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import RealTimeMode from './realtime-mode'
import Image from 'next/image'
import TabsMenu from '../tabs'
import { BOT_TABS_MENU } from '@/constants/menu'
import ChatIcon from '@/icons/chat-icon'
import { TabsContent } from '../ui/tabs'
import { Separator } from '../ui/separator'
import Bubble from './bubble'
import Responding from './responding'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Paperclip, Send } from 'lucide-react'
import { Label } from '../ui/label'
import { CardDescription, CardTitle } from '../ui/card'
import Accordian from '../accordian'

type BotWindowProps = {
    errors: any
    register: UseFormRegister<ChatBotMessageProps>
    chats: { role: 'assistant' | 'user'; content: string; link?: string }[]
    onChat(): void
    onResponding: boolean
    domainName: string
    theme?: string | null
    textColor?: string | null
    help?: boolean
    realtimeMode:
    | {
        chatroom: string
        mode: boolean
    }
    | undefined
    helpdesk: {
        id: string
        question: string
        answer: string
        domainId: string | null
    }[]
    setChat: React.Dispatch<
        React.SetStateAction<
            {
                role: 'user' | 'assistant'
                content: string
                link?: string | undefined
            }[]
        >
    >
}

const BotWindow = forwardRef<HTMLDivElement, BotWindowProps>(
    (
        {
            errors,
            register,
            chats,
            onChat,
            onResponding,
            domainName,
            helpdesk,
            realtimeMode,
            setChat,
            textColor,
            theme,
            help,
        },
        ref
    ) => {
        return <div className="h-fit w-full max-md:max-w-[425px] flex flex-col bg-white rounded-xl border shadow-lg">
            <div className="flex justify-between px-2 pt-4 max-md:pt-1">
                <div className="flex gap-2">
                    <Avatar className="w-12 h-12 md:w-20 md:h-20">
                        <AvatarImage
                            src="https://github.com/shadcn.png"
                            alt="@shadcn"
                        />
                        <AvatarFallback>
                            CN
                        </AvatarFallback>
                    </Avatar>
                    <div className="flex items-start flex-col">
                        <h3 className="text-lg font-bold leading-none">
                            Sales Rep - MyCompany
                        </h3>
                        <p className="text-sm">
                            {domainName.split(".com")[0]}
                        </p>
                        {realtimeMode?.mode && (
                            <RealTimeMode
                                setChats={setChat}
                                chatRoomId={realtimeMode.chatroom}
                            />
                        )}
                    </div>
                </div>
                <div className="relative w-16 h-16">
                    <Image
                        src="https://res.cloudinary.com/dqglrqnma/image/upload/f_auto,q_auto/botly-ai/ty65uqbvvdylmekvzhio"
                        fill
                        alt="users"
                        objectFit="contain"
                    />
                </div>
            </div>
            <TabsMenu
                triggers={
                    BOT_TABS_MENU
                }
                className="bg-transparent border-[1px] border-border m-2"
            >
                <TabsContent value="chat">
                    <Separator orientation="horizontal" />
                    <div
                        style={{
                            background: theme || '',
                            color: textColor || '',
                        }}
                        className="px-3 flex h-[400px] flex-col py-5 gap-3 chat-window overflow-y-auto"
                        ref={ref}
                    >
                        {chats.map((chat, key) => (
                            <Bubble
                                key={key}
                                message={chat}
                            />
                        ))}
                        {onResponding && <Responding />}
                    </div>
                    <form
                        onSubmit={onChat}
                        className="flex px-3 py-1  flex-1 justify-between gap-x-1 items-center bg-porcelain"
                    >
                        <Label htmlFor="bot-image"
                            className="">
                            <Paperclip />
                            <Input
                                type="file"
                                id="bot-image"
                                {...register("image")}
                                className="hidden"
                            />
                        </Label>
                        <div className="flex justify-between items-center flex-1">
                            <Input
                                {...register("content")}
                                placeholder="Type your message..."
                                className="focus-visible:ring-offset-0 bg-porcelain rounded-none outline-none border-none"
                            />
                            <Button
                                type="submit"
                            >
                                <Send />
                            </Button>
                        </div>
                    </form>
                </TabsContent>
                <TabsContent value="helpdesk">
                    <div className="h-[485px] overflow-y-auto overflow-x-hidden p-4 flex flex-col gap-4">
                        <div>
                            <CardTitle>Help Desk</CardTitle>
                            <CardDescription>
                                Browse from a list of question people usually ask.
                            </CardDescription>
                        </div>
                        {helpdesk.map((desk) => (
                            <Accordian
                                key={desk.id}
                                trigger={desk.question}
                                content={desk.answer}
                            />
                        ))}
                    </div>
                </TabsContent>
            </TabsMenu>
            <div className="flex justify-center">
                <p className="text-gray-400 text-xs">Powered by Botly-ai</p>
            </div>
        </div>
    })

export default BotWindow

BotWindow.displayName = "BotWindow"