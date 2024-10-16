"use server"
import { client } from '@/lib/prisma';
import { currentUser } from '@clerk/nextjs';
import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripeSecret = process.env.STRIPE_SECRET;
if (!stripeSecret) {
  console.error("STRIPE_SECRET is not defined");
}

const stripe = new Stripe(stripeSecret!, {
  typescript: true,
  apiVersion: '2024-09-30.acacia',
});

export async function GET() {
  try {
    const user = await currentUser();
    if (!user) return new NextResponse('User not authenticated');

    const account = await stripe.accounts.create({
      country: 'US',
      type: 'custom',
      business_type: 'company',
      capabilities: {
        card_payments: { requested: true },
        transfers: { requested: true },
      },
      external_account: 'btok_us',
      tos_acceptance: {
        date: 1547923073,
        ip: '172.18.80.19',
      },
    });

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

      return NextResponse.json({ url: accountLink.url });
    }
  } catch (error) {
    console.error('Error when creating Stripe account:', error);
    return NextResponse.json({
      error: error instanceof Error ? error.message : "An unexpected error occurred",
    });
  }
}
