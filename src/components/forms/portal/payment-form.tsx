import { Loader } from '@/components/loader'
import { Button } from '@/components/ui/button'
import { useCompleteCustomerPayment } from '@/hooks/billing/use-billing'
import { PaymentElement } from '@stripe/react-stripe-js'
import React from 'react'

type CustomerPaymentFormProps = {
    onNext():void
}

const CustomerPaymentForm = ({onNext}: CustomerPaymentFormProps) => {
    const { processing, onMakePayment } = useCompleteCustomerPayment(onNext);

  return (
    <div className="flex flex-col">
        <PaymentElement />
        <Button
            type="submit"
            className="w-full mt-5"
            onClick={onMakePayment}
        >
            <Loader loading={processing}>{processing}</Loader>
        </Button>
    </div>
  )
}

export default CustomerPaymentForm