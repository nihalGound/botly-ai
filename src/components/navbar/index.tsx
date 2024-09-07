import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

type Props = {}

const NavBar = (props: Props) => {
    return (
        <div className="px-7 py-1 flex justify-between items-center font-bold border-b border-solid border-zinc-100 leading-[154.5%] max-md:flex-wrap max-md:px-5 dark:bg-gray-700">
            <div className="flex justify-center self-stretch gap-1.5 my-auto text-2xl tracking-tighter text-neutral-700">
                <Image
                    src="/images/logo.png"
                    alt='LOGO'
                    sizes='100vw'
                    style={{
                        width: '100px',
                        height: 'auto',
                    }}
                    width={0}
                    height={0}
                />
            </div>

            <ul className="flex justify-between gap-2  self-stretch my-auto text-sm leading-5 text-neutral-700 font-normal max-md:flex-wrap max-md:max-w-full md:gap-x-5">
                <li className="">
                    <Link href="/" className="text-black  dark:hover:text-gray-200 dark:text-white">
                        Home
                    </Link>
                </li>
                <li>
                    <Link href="/pricing" className="text-black dark:hover:text-gray-200 dark:text-white">
                        Pricing
                    </Link>
                </li>
                <li>
                    <Link href="/NewsRoom" className="text-black dark:hover:text-gray-200 dark:text-white">
                        NewsRoom
                    </Link>
                </li>
                <li>
                    <Link href="/features" className="text-black dark:hover:text-gray-200 dark:text-white">
                        Features
                    </Link>
                </li>
                <li>
                    <Link href="/contact-us" className="text-black dark:hover:text-gray-200 dark:text-white">
                        Contact us
                    </Link>
                </li>

            </ul>

            <Link className="bg-orange text-white rounded-sm px-4 py-2
            max-md:px-3 max-md:py-1.5 max-md:mt-2"
                href="/dashboard">
                Free Trial
            </Link>
        </div>
    )
}

export default NavBar