import React from 'react'

type Props = {
    title: string
    value: number
    icon: JSX.Element
    sales?: boolean
}

const DashboardCard = ({ title, value, icon, sales }: Props) => {
    return (
        <div className="rounded-lg flex flex-col gap-3 pr-10 pl-10 py-10 md:pl-10 md:pr-20 bg-cream dark:bg-muted max-w-full">
            <div className="flex gap-3">
                {icon}
                <h2 className="font-bold text-xl">{title}</h2>
            </div>
            <p className="font-bold text-4xl">
                {sales && '$'}
                {value}
            </p>
        </div>
    )
}

export default DashboardCard