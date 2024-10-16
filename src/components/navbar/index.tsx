import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

type Props = {}

const NavBar = (props: Props) => {
    return (
        <div className="px-7 py-1 flex justify-center gap-x-10 z-20 items-center font-bold border-b border-solid  leading-[154.5%] max-md:flex-wrap max-md:px-5 dark:bg-gray-700">

            <ul className="flex justify-between gap-2 mr-10  self-stretch my-auto text-sm leading-5 text-white font-normal max-md:flex-wrap max-md:max-w-full md:gap-x-5">
                <li className="cursor-pointer">
                    <Link href="/">
                        Home
                    </Link>
                </li>
                <li className='cursor-pointer'>
                    <Link href="#pricing">
                        Pricing
                    </Link>
                </li>
                <li className='cursor-pointer'>
                    <Link href="#features">
                        Features
                    </Link>
                </li>

            </ul>

            <Link className="bg-orange text-white rounded-sm px-4 py-2
            max-md:px-3 max-md:py-1.5 max-md:mt-2 ml-10"
                href="/dashboard">
                Dashboard
            </Link>
        </div>
    )
}

export default NavBar