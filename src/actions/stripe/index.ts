"use server"

import { client } from "@/lib/prisma"
import { currentUser } from "@clerk/nextjs"
import { Stripe } from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET!, {
    typescript: true,
    apiVersion: "2024-09-30.acacia",
})

export const onCreateCustomerPaymentIntentSecret = async (
    amount: number,
    stripeId: string
) => {
    try {
        const paymentIntent = await stripe.paymentIntents.create(
            {
                currency: "usd",
                amount: amount * 100,
                automatic_payment_methods: {
                    enabled: true,
                },
            },
            { stripeAccount: stripeId }
        )

        if (paymentIntent) {
            return { secret: paymentIntent.client_secret }
        }
    } catch (error) {
        console.log(error)
    }
}

export const onUpdateSubscription = async (
    plan: "STANDARD" | "PRO" | "ULTIMATE"
) => {
    try {
        const user = await currentUser();
        if (!user) return
        const update = await client.user.update({
            where: {
                clerkId: user.id,
            },
            data: {
                subscription: {
                    update: {
                        data: {
                            plan,
                            credits: plan == "PRO" ? 50 : plan == "ULTIMATE" ? 500 : 10,
                        },
                    },
                },
            },
            select: {
                subscription: {
                    select: {
                        plan: true,
                    },
                },
            },
        });

        if (update) {
            return {
                status: 200,
                message: "subscription updated",
                plan: update.subscription?.plan,
            }
        }
    } catch (error) {
        console.log(error)
    }
}

const setPlanAmount = (item: "STANDARD" | "PRO" | "ULTIMATE") => {
    if (item == "PRO") {
        return 1500
    }
    else if (item == "ULTIMATE") {
        return 3500
    }
    else {
        return 0
    }
}

export const onGetStripeClientSecret = async (item: "STANDARD" | "PRO" | "ULTIMATE") => {
    try {
        const amount = setPlanAmount(item)
        const paymentIntent = await stripe.paymentIntents.create({
            currency: "usd",
            amount: amount,
            automatic_payment_methods: {
                enabled: true,
            }
        })

        if (paymentIntent) {
            return { secret: paymentIntent.client_secret }
        }
    } catch (error) {
        console.log(error)
    }
}

export const stripeConnect = async () => {
    try {
        const user = await currentUser()
        if (!user) return {
            status: 401,
            data: "User not authenticated"
        }

        const account = await stripe.accounts.create({
            country: 'US',
            type: 'custom',
            business_type: 'company',
            capabilities: {
                card_payments: {
                    requested: true,
                },
                transfers: {
                    requested: true,
                },
            },
            external_account: 'btok_us',
            tos_acceptance: {
                date: 1547923073,
                ip: '172.18.80.19',
            },
        })

        if (account) {
            await stripe.accounts.update(account.id, {
                business_profile: {
                    mcc: '5045',
                    url: 'https://bestcookieco.com',
                },
                company: {
                    address: {
                        city: 'Fairfax',
                        line1: '123 State St',
                        postal_code: '22031',
                        state: 'VA',
                    },
                    tax_id: '000000000',
                    name: 'The Best Cookie Co',
                    phone: '8888675309',
                },
            });

            const person = await stripe.accounts.createPerson(account.id, {
                first_name: 'Jenny',
                last_name: 'Rosen',
                relationship: { representative: true, title: 'CEO' },
            });

            await stripe.accounts.updatePerson(account.id, person.id, {
                address: {
                    city: 'Victoria',
                    line1: '123 State St',
                    postal_code: 'V8P 1A1',
                    state: 'BC',
                },
                dob: { day: 10, month: 11, year: 1980 },
                ssn_last_4: '0000',
                phone: '8888675309',
                email: 'jenny@bestcookieco.com',
                relationship: { executive: true },
            });

            const owner = await stripe.accounts.createPerson(account.id, {
                first_name: 'Kathleen',
                last_name: 'Banks',
                email: 'kathleen@bestcookieco.com',
                address: {
                    city: 'Victoria',
                    line1: '123 State St',
                    postal_code: 'V8P 1A1',
                    state: 'BC',
                },
                dob: { day: 10, month: 11, year: 1980 },
                phone: '8888675309',
                relationship: { owner: true, percent_ownership: 80 },
            });

            await stripe.accounts.update(account.id, {
                company: { owners_provided: true },
            });

            await client.user.update({
                where: { clerkId: user.id },
                data: { stripeId: account.id },
            });

            const accountLink = await stripe.accountLinks.create({
                account: account.id,
                refresh_url: `${process.env.NEXT_PUBLIC_URL}/callback/stripe/refresh`,
                return_url: `${process.env.NEXT_PUBLIC_URL}/callback/stripe/success`,
                type: 'account_onboarding',
                collection_options: { fields: 'currently_due' },
            });

            if (accountLink.url) {
                return {
                    status: 201,
                    data: accountLink.url
                }
            }

            return {
                status: 404,
                data: "Cannot connect to stripe"
            }
        } 
        return {
            status: 404,
            data: "Cannot create account on stripe"
        }
    }catch (error) {
            return {
                status: 500,
                data: "Oops something went wrong"
            }
        }
    }