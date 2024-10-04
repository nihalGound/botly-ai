"use client"
import { usePortal } from '@/hooks/portal/use-portal'
import React, { useEffect } from 'react'
import PortalSteps from './portal-steps'
import { cn } from '@/lib/utils'

type PortalFormProps = {
    questions: {
        id: string
        question: string
        answered: string | null
    }[]
    type: "Appointment" | "Payment"
    customerId: string
    domainId: string
    email: string 
    bookings?: 
        | {
            date: Date
            slot: string
        }[]
        | undefined
        products?:
            | {
                name: string
                image: string
                price: number
            }[]
            | undefined
        amount?: number
        stripeId?: string
}

const PortalForm = ({questions,type,customerId,domainId,email,bookings,amount,stripeId,products}: PortalFormProps) => {
    const {
        step,
        onNext,
        onPrev,
        register,
        errors,
        date,
        setDate,
        onBookAppointment,
        onSelectedTimeSot,
        selectedSlot,
        loading,
    } = usePortal(customerId,domainId,email);
    useEffect(() => {
        if(questions.every((question) => question.answered)){
            onNext();
        }
    },[questions])
  return (
    <form
        className="pb-1 flex flex-col gap-10 justify-center w-full"
        onSubmit={onBookAppointment}
    >
        <PortalSteps 
            loading={loading}
            slot={selectedSlot}
            bookings={bookings}
            onSlot={onSelectedTimeSot}
            date={date}
            onBooking={setDate}
            step={step}
            type={type}
            questions={questions}
            error={errors}
            register={register}
            onNext={onNext}
            products={products}
            onBack={onPrev}
            amount={amount}
            stripeId={stripeId}
        />
        {(step ==1 || step ==2) && (
            <div className="w-full flex justify-center">
                <div className="w-[400px] grid grid-cols-2 gap-3">
                    <div
                    className={cn(
                        "rounded-full h-2 col-span-1",
                        step ==1 ? "bg-orange": "bg-platinum"
                    )}
                    ></div>
                    <div
                        className={cn(
                            "rounded-full h-2 col-span-1",
                            step ==2 ? "bg-orange" : "bg-platinum"
                        )}
                    ></div>
                </div>
            </div>
        )}
    </form>
  )
}

export default PortalForm