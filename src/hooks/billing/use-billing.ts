import React, { useEffect, useState } from "react";
import axios from "axios"
import { onCreateCustomerPaymentIntentSecret } from "@/actions/stripe";
import { useToast } from "@/components/ui/use-toast";
import { useElements, useStripe as useStripeHook} from "@stripe/react-stripe-js";

export const useStripe = () => {
    const [onStripeAccountPending, setonStripeAccountPending] = useState<boolean>(false)

    const onStripeConnect = async () =>  {
        try {
            setonStripeAccountPending(true)
            const account = await axios.get("/api/stripe/connect")
            if(account) {
                if(account) {
                    window.location.href = account.data.url
                }
            }
        } catch (error) {
            console.log(error)
        } finally {
            setonStripeAccountPending(false)
        }
    }

    return {onStripeAccountPending,onStripeConnect}
}

export const useStripeCustomer = (amount: number, stripeId: string) => {
    const [stripeSecret,setStripeSecret] = useState<string>('')
    const [loadForm,setLoadForm] = useState<boolean>(false)
    const onGetCustomerIntent = async (amount: number) => {
        try {
            setLoadForm(true)
            const intent = await onCreateCustomerPaymentIntentSecret(amount,stripeId);
            if(intent) {
                setLoadForm(false)
                setStripeSecret(intent.secret!)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        onGetCustomerIntent(amount)
    },[amount])

    return {stripeSecret, loadForm}
}

export const useCompleteCustomerPayment = (onNext: ()=> void) => {
    const [processing, setprocessing] = useState<boolean>(false)
    const {toast} = useToast();
    const stripe = useStripeHook();
    const elements = useElements();

    const onMakePayment = async (e: React.MouseEvent) => {
        e.preventDefault()
        if (!stripe || !elements) {
            return null
        }

        console.log("no reload")

        try {
            setprocessing(true)

            const {error, paymentIntent} = await stripe.confirmPayment({
                elements,
                confirmParams: {
                    return_url: "https://localhost:3000/",
                },
                redirect: "if_required",
            })

            if(error) {
                console.log(error)
            }
            console.log(paymentIntent)

            if(paymentIntent?.status === "succeeded") {
                toast({
                    title: "Success",
                    description: "Payment complete",
                })
                onNext()
            }
        } catch (error) {
            console.log(error)
        } finally {
            setprocessing(false)
        }
    }

    return { processing, onMakePayment}
}