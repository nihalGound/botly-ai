import React from 'react'

type Props = {
    domains: {
        customer: {
          Domain: {
            name: string
          } | null
          id: string
          email: string | null
        }[]
      }[]
      campaign: {
        name: string
        id: string
        customers: string[]
        createdAt: Date
      }[]
      subscription: {
        plan: 'STANDARD' | 'PRO' | 'ULTIMATE'
        credits: number
      } | null
}

const EmailMarketing = ({campaign, domains, subscription}: Props) => {
  return (
    <div>EmailMarketing</div>
  )
}

export default EmailMarketing