"use client"
import React, {useEffect, useState} from 'react';
import Link from "next/link";
import {User} from "@/generated/prisma";
import {logoutUser} from "@/action/auths";
import {useRouter} from "next/navigation";
const AnnouncementBar = () => {
    return (
        <div className={"w-full bg-black py-2"}>
            <div className={"container mx-auto flex items-center justify-center px-8"}>
                <span className={"text-center text-sm font-medium text-white tracking-widest"}>
                    FREE SHIPPING ON ORDER OVER $15,00 . FREE RETURN
                </span>
            </div>
        </div>
    )
}

type HeaderProps = {
    user: Omit<User, "passwordHash">|null,
}

function Header({user}: HeaderProps) {
    const router = useRouter();
     const [ isOpen, setOpen ] = useState<boolean>(true);
     const [prevSrcollY, setPrevSrcollY] = useState<number>(0);
     useEffect(() => {
         const handleSrcoll = ()=>{
             const currentSrcollY = window.scrollY;
             const srcolledUp= currentSrcollY < prevSrcollY;
             if(srcolledUp){
                 setOpen(true)
             }else if (currentSrcollY>100){
                 setOpen(false)
             }
             setPrevSrcollY(currentSrcollY)
         }
         setPrevSrcollY(window.scrollY);
         window.addEventListener('scroll', handleSrcoll);
         return ()=>{
             window.removeEventListener('scroll', handleSrcoll);
         }
     },[prevSrcollY])
    return (
        <header className={`w-full sticky top-0 z-50`}>
            <div className={`w-full transform transition-transform duration-300 ease-in-out ${isOpen? "translate-y-0":"-translate-y-full"}`}>
                <AnnouncementBar/>
                <div className={`flex items-center justify-between py-3 sm:py4 bg-white/60 shadow-sm border-b border-gray-200 backdrop-blur-sm`}>
                    <div className={`flex justify-between items-center container mx-auto px-8`}>
                        <div className={"flex flex-1 justify-start items-center gap-6 sm:gap-6"}>
                            <button className={`text-gray-700 hover:text-gray-900 md:hidden`}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5 sm:h-6 sm:w-6 fill-none stroke-current"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                </svg>
                            </button>
                            <nav className={`hidden md:flex gap-6 lg:gap-6 text-sm font-medium`}>
                                <Link href="/">Shop</Link>
                                <Link href="/">New Arrivals</Link>
                                <Link href="/">Sale</Link>
                            </nav>
                        </div>
                        <Link href={"/"} className={"absolute left-1/2 -translate-x-1/2"}>
                            <span className={`text-xl sm:text-2xl font-bold tracking-tight`}>
                                Deal
                            </span>
                        </Link>
                        <div className={`flex flex-1 justify-end items-center gap-2 sm:gap-4`}>
                            <button className={`text-gray-700 hover:text-gray-900 hidden sm:block cursor-pointer`}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    className="h-6 w-6 sm:h-6 sm:w-6"
                                    stroke="currentColor"
                                >
                                    <path
                                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                        strokeLinecap={'round'}
                                        strokeLinejoin={'round'}
                                        strokeWidth={2}

                                    />
                                </svg>
                            </button>
                            {user?(
                                <div className={"flex items-center gap-2 sm:gap-4"}>
                                        <span className={`text-sm text-gray-700 hidden md:block`}>{user.email}</span>
                                        <Link
                                            href={"#"}
                                            className={`text-gray-700 hover:text-gray-900 text-xs sm:text-sm font-medium tracking-widest`}
                                            onClick={async (e)=>{
                                                e.preventDefault()
                                                await logoutUser()
                                                router.refresh()
                                            }}
                                        >
                                            Sign Out
                                        </Link>
                                </div>
                            ):(
                                <React.Fragment>
                                    <Link href={"/auth/sign-in"} className={`text-gray-700 hover:text-gray-900 text-xs sm:text-sm font-medium tracking-widest`}>Sign In</Link>
                                    <Link href={"/auth/sign-up"} className={`text-gray-700 hover:text-gray-900 text-xs sm:text-sm font-medium tracking-widest`}>Sign Up</Link>
                                </React.Fragment>
                            )}
                            <button className={"text-gray-700 hover:text-gray-900 relative cursor-pointer"}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    className="h-5 w-5 sm:h-6 sm:w-6"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                                    />
                                </svg>

                                <span className={`absolute -top-1 -right-1 bg-black text-white text-[10px] sm:text-xs w-3.5 h-3.5 rounded-full flex item-center justify-center`}>
                                    0
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;