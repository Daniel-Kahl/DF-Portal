'use client'

import { Navbar } from 'flowbite-react'
import Image from 'next/image'

const imageStyle = {
  borderRadius: '15%',
  border: '1px solid #000',
}

export default function Nav() {
    return (
        <Navbar fluid className=" bg-slate-700">
          <Navbar.Brand>
            <Image
              src="/Ebin.PNG"
              width={75}
              height={75}
              style={imageStyle}
              alt="Nav Photo"
            />
            <span className="self-center mx-5 whitespace-nowrap text-3xl font-bold text-white">
                DF Portal
            </span>
            {/* TODO: Fix Link throwing errors */}
            {/* <Link href="/">
              <span className="self-center mx-5 whitespace-nowrap text-2xl font-bold text-black dark:text-white">
                DF Portal
              </span>
            </Link> */}
          </Navbar.Brand>
          
        </Navbar>
    )
}