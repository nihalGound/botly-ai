import { onGetAllAccoutDomains } from '@/actions/settings'
import ConversationMenu from '@/components/conversation';
import Messenger from '@/components/conversation/messenger';
import InfoBar from '@/components/infobar';
import { Separator } from '@/components/ui/separator';
import React from 'react'

type Props = {}

const ConversationPage = async (props: Props) => {
    const domains = await onGetAllAccoutDomains();
  return (
    <div className="w-full h-full flex">
        <ConversationMenu 
          domains={domains?.domains}
        />
        <Separator orientation="vertical" />
        <div className="w-full flex flex-col">
            <div className="md:pl-4">
                <InfoBar />
            </div>
            <Messenger />
        </div>
    </div>
  )
}

export default ConversationPage