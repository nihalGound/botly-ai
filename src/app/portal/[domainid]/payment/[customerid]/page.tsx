import { onDomainCustomerResponses } from '@/actions/appointment';
import { onGetDomainProductsAndConnectedAccountId } from '@/actions/payment';
import PortalForm from '@/components/forms/portal/portal-form';
import React from 'react'

const CustomerPaymentPage = async (
    {params}:{params : {domainid: string; customerid: string}}) => {
    const questions = await onDomainCustomerResponses(params.customerid)
    const product = await onGetDomainProductsAndConnectedAccountId(params.domainid);

    if(!questions) return null
  return (
    <PortalForm
        email={questions.email!}
        products={product?.products}
        amount={product?.amount}
        domainId={params.domainid}
        customerId={params.customerid}
        questions={questions.questions}
        stripeId={product?.stripeId!}
        type="Payment"
    />
  )
}

export default CustomerPaymentPage