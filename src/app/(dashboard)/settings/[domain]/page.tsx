import { onGetCurrentDomainInfo } from '@/actions/settings';
import BotTraining from '@/components/forms/setttings/bot-training';
import SettingForm from '@/components/forms/setttings/form';
import InfoBar from '@/components/infobar';
import { redirect } from 'next/navigation';
import React from 'react'

type Props = { params: { domain: string } }

const DomainSettingPage = async ({ params }: Props) => {
  const domain = await onGetCurrentDomainInfo(params.domain);
  if (!domain) redirect("/dashboard");
  return (
    <>
      <InfoBar />
      <div className="overflow-y-auto w-full flex-1 h-0 pr-2">
        <div className="flex flex-col">
          <div className="w-full">
            <SettingForm
              plan={domain.subscription?.plan!}
              chatBot={domain.domains[0].chatBot}
              id={domain.domains[0].id}
              name={domain.domains[0].name}
            />
          </div>
          <div className="w-full mt-4">
            <BotTraining id={domain.domains[0].id} />
          </div>
        </div>
      </div>
    </>
  );
  
}

export default DomainSettingPage