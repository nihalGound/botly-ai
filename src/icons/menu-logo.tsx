import Image from 'next/image'
import React from 'react'

type MenuLogoProps = {
  onClick(): void
}

export const MenuLogo = ({ onClick }: MenuLogoProps) => {
  return (
    <Image 
      src="/images/logo.jpg"
      alt="Botly-ai"
      className='rounded-lg'
      width={50}
      height={50}
      onClick={onClick}
    />
  )
}
