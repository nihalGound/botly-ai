import { onGetPaymentConnected } from '@/actions/settings'
import InfoBar from '@/components/infobar'
import IntegrationsList from '@/components/integrations'
import React from 'react'


const IntegrationPage = async () => {
    const payment = await onGetPaymentConnected()

    const connections = {
        stripe: payment ? true : false,
    }
  return (
    <>
        <InfoBar />
        <IntegrationsList connections={connections} />
    </>
  )
}

export default IntegrationPage