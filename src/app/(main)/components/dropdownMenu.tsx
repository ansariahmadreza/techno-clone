"use client"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger, } from "@/components/ui/dropdown-menu";
import { CiUser } from "react-icons/ci";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useUserStore } from "../../../zustand";


export interface infoUsers {
    id: string,
    namefamily: string,
    email: string,
    password: string,
    confirmPassword: string
};

const DropdownProfile = () => {
    const [hover, setHover] = useState(false)
    const [lastUser, setLastUser] = useState<infoUsers[]>([])//اطلاعات همه کاربران
    const { user, user2 } = useUserStore()

    useEffect(() => {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL;
        axios.get(`${baseUrl}/users`).then(res => {
            const { data } = res
            setLastUser(data)
        })
        const observe = new MutationObserver(() => {//غیر فعال کردن رفتار پیش فرض
            const body = document.querySelector('body')
            if (body?.getAttribute('data-scroll-locked') === "1") {
                body.removeAttribute("data-scroll-locked")
            }
        })
        observe.observe(document.body, { attributes: true, attributeFilter: ["data-scroll-locked"] })
        return () => observe.disconnect()
    }, [])

    const handlerExit = () => {
        Cookies.remove("token")
        window.location.href = "/"
    };

    const currentUser = user2?.email || user?.email
    const allData = lastUser.find(u => u.email === currentUser)

    const handlerRedirect = () => {
        window.location.href = `login/${allData?.id}`
    }

    return (
        <div onMouseLeave={() => setHover(false)} onMouseOver={() => { setHover(true) }}>
            <DropdownMenu dir="rtl" open={hover} onOpenChange={setHover} >
                <DropdownMenuTrigger onClick={handlerRedirect}><CiUser className="shadow-lg h-7 w-7 rounded" />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="ml-20 w-[250px]" sideOffset={1}>
                    <section className="w-60 h-[110px]">
                        <Link key={allData?.id} href={`/login/${allData?.id}`}>
                            <DropdownMenuItem >حساب کاربری<span className="text-[14px] text-neutral-500">{allData?.namefamily}</span></DropdownMenuItem>
                        </Link>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>تنظیمات</DropdownMenuItem>
                        <DropdownMenuItem onSelect={handlerExit} className="text-red-600">خروج از حساب کاربری</DropdownMenuItem>
                    </section>
                </DropdownMenuContent>
            </DropdownMenu >
        </div >
    );
};

export default DropdownProfile;