import React from 'react'

type Props = {
    plan: "STANDARD" | "PRO" | "ULTIMATE"
}

const SubscriptionForm = ({plan}: Props) => {
  return (
    <div>{plan}</div>
  )
}

export default SubscriptionForm