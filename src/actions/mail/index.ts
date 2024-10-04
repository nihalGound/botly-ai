"use server"

import { client } from "@/lib/prisma"

export const onGetAllCustomers = async (id: string) => {
    try {
        const customers = await client.user.findUnique({
            where: {
                clerkId: id,
            },
            select: {
                subscription: {
                    select: {
                        credits: true,
                        plan: true,
                    },
                },
                domains: {
                    select: {
                        customer: {
                            select: {
                                id: true,
                                email: true,
                                Domain: {
                                    select: {
                                        name: true,
                                    },
                                },
                            },
                        },
                    },
                },
            },
        })

        if (customers) {
            return customers;
        }
    } catch (error) {
        console.log(error)
    }
}

export const onGetAllCampaigns = async (id: string) => {
    try {
        const campaigns = await client.user.findUnique({
            where: {
                clerkId: id,
            },
            select: {
                campaign: {
                    select: {
                        name: true,
                        id: true,
                        customers: true,
                        createdAt: true,
                    },
                },
            },
        })

        if(campaigns) {
            return campaigns
        }
    } catch (error) {
        console.log(error)
    }
}