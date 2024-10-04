"use client"
import { Loader } from '@/components/loader'
import { useSubscription } from '@/hooks/billing/use-billing'
import React from 'react'
import SubscriptionCard from './subscription-card'
import StripeElements from '@/components/settings/stripe-elements'

type Props = {
    plan: "STANDARD" | "PRO" | "ULTIMATE"
}

const SubscriptionForm = ({plan}: Props) => {
  const { loading, onSetPayment, onUpdateToFreeTier,payment} = useSubscription(plan)
  return (
    <Loader loading={loading}>
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-3">
          <SubscriptionCard 
            title="STANDARD"
            description="Perfect if you’re just getting started with Botly AI"
            price="0"
            payment={payment}
            onPayment={onSetPayment}
            id="STANDARD"
          />
          <SubscriptionCard 
            title="PRO"
            description="Perfect for medium-sized businesses or growing teams"
            price="15"
            payment={payment}
            onPayment={onSetPayment}
            id="PRO"
          />
          <SubscriptionCard 
            title="ULTIMATE"
            description="Perfect for high-performance businesses and large-scale customers"
            price="35"
            payment={payment}
            onPayment={onSetPayment}
            id="ULTIMATE"
          />
        </div>
        <StripeElements payment={payment} />
      </div>
    </Loader>
  )
}

export default SubscriptionForm