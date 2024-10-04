import { useCompletePayment } from '@/hooks/billing/use-billing'
import React from 'react'
import { CardDescription } from '../ui/card'
import { PaymentElement } from '@stripe/react-stripe-js'
import { Button } from '../ui/button'
import { Loader } from '../loader'

type Props = {
    plan: "STANDARD" | "PRO" | "ULTIMATE"
}

const PaymentForm = ({plan}: Props) => {
    const {processing, onMakePayment} = useCompletePayment(plan)
  return (
    <form 
        onSubmit={onMakePayment}
        className="flex flex-col gap-5"
    >
        <div>
            <h2 className="font-semibold text-xl text-black">Payment Method</h2>
            <CardDescription>Enter your card details</CardDescription>
        </div>
        <PaymentElement />
        <Button type="submit">
            <Loader loading={processing}>Pay</Loader>
        </Button>
    </form>
  )
}

export default PaymentForm