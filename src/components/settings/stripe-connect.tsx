"use client"
import { useStripe } from '@/hooks/billing/use-billing'
import React from 'react'
import { Button } from '../ui/button'
import { Loader } from '../loader'

type StripeConnectProps = {
    connected: boolean
}

const StripeConnect = ({connected}: StripeConnectProps) => {
    const { onStripeConnect, onStripeAccountPending} = useStripe();
  return (
    <Button
        disabled={connected}
        onClick={onStripeConnect}
    >
        <Loader loading={onStripeAccountPending}>
            {connected ? "Connected" : "Connect to stripe"}
        </Loader>
    </Button>
  )
}

export default StripeConnect