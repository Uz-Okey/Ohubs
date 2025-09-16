import logo from '@/img/logo_preview_rev_1.png'
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
const HeroSection = () => {
    return (
        <div className=" bg-[url('/img/bg.jpg')] bg-no-repeat bg-center bg-cover h-[500px] w-[100%]">
            <nav className='mt-4 text-white max-w-4xl mx-auto z-10 pr-4 items-center flex justify-between'>
                <Link href='/' className='flex items-center'>
                    <Image
                        src={logo} className='w-[60px]' alt='our company logo'
                    />

                    <div>
                        <h1 className='-m-4 font-bold font-serif text-2xl'>
                            HUBs
                        </h1>
                    </div>
                </Link>

                <div className='font-serif font-light flex space-x-3'>
                    <h1 className='cursor-pointer'>Sign in</h1>
                    <h1 className='border cursor-pointer px-2 rounded-full'>Get Started</h1>
                </div>
            </nav>


            <div className='px-6 mt-25 text-white max-w-4xl mx-auto'>
                <h1 className='font-semibold mb-3 underline'>
                    what do i do?
                </h1>

                <p className='max-w-[85%] text-3xl md:text-5xl font-bold'>
                    I explain and teach tech­nol­o­gy, solve tech prob­lems and help you make gad­get buy­ing decisions.
                </p>
            </div>
        </div>

    )
}

export default HeroSection