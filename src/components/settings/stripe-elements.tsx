"use client"
import { useStripeElements } from '@/hooks/billing/use-billing'
import { loadStripe } from '@stripe/stripe-js'
import React from 'react'
import { Loader } from '../loader'
import { Elements } from '@stripe/react-stripe-js'
import PaymentForm from './payment-form'

type Props = {
    payment: "STANDARD" | "PRO" | "ULTIMATE"
}

const StripeElements = ({payment}: Props) => {
    const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISH_KEY!)
    const {stripeSecret,loadForm} = useStripeElements(payment)
  return (
    stripeSecret &&
    stripeSecret &&
    (payment == "PRO" || payment == "ULTIMATE") && (
        <Loader loading={loadForm}>
            <Elements
                stripe={stripePromise}
                options={{
                    clientSecret: stripeSecret,
                }}
            >
                <PaymentForm plan={payment} />
            </Elements>
        </Loader>
    )
  )
}

export default StripeElements