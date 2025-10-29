"use client"
import Link from "next/link";
import Container from "../../Container";
import { SlWallet } from "react-icons/sl";
import { Suspense, useEffect, useState } from "react";
import TopHeader from "./ToppHeader";
import { Menu, X } from "lucide-react";


const Nav = () => {
    const [header, setHeader] = useState(false);
    const [open, setOpen] = useState(false);


    useEffect(() => {
        const scrollHeader = () => setHeader(window.scrollY >= 1);
        window.addEventListener("scroll", scrollHeader)
        return () => {
            window.removeEventListener("scroll", scrollHeader)
        }
    }, []);
    return (
        <Suspense >
            <>
                <div className={`fixed z-50 w-full top-0 transition-all duration-300
                 bg-white  
                 ${header ? "h-[90px] w-full" : "h-[135px]"}`} >
                    <Container>
                        <TopHeader/>
                        <nav className={`flex items-center  justify-between
                     transition-all duration-300 w-full
                    ${header ? "opacity-0 -translate-y-5 "
                                : "opacity-100 translate-y-0"}`}>

                            <button onClick={() => setOpen(!open)}
                                className="md:hidden p-2 rounded
                             hover:bg-sky-50 transition"
                            >
                                {open ? <X size={24} /> : <Menu size={24} />}
                            </button>

                            <ul className="hidden md:flex items-center gap-10 ">
                                <li>
                                    <Link href="/" className=" hover:bg-sky-50 transition">
                                        دسته بندی محصولات</Link>
                                </li>
                                <li >
                                    <Link href="/" target="_blank" className="flex items-center gap-2">
                                        <SlWallet size={20} />خرید قسطی</Link>
                                </li>
                                <li>
                                    <Link target="_blank" href="/*">فروشنده شو</Link>
                                </li>
                                <li>
                                    (منو همبرگری صرفا)
                                </li>
                            </ul>
                        </nav>


                        <div className={`md:hidden fixed left-0 w-full
                        z-40 bg-white shadow-md transition-all duration-300
                        overflow-hidden ${open ? "max-h-60 border-t" : "max-h-0 border-t-0"}
                        ${header ? "top-[90px]" : "top-[135px]"}
                        `}>
                            <ul className="flex flex-col items-center justify-start py-4 space-y-4">
                                <li>
                                    <Link href={"/"} onClick={() => setOpen(false)} className="block transition">
                                        دسته بندی محصولات
                                    </Link>
                                </li>

                                <li>
                                    <Link href={"/"} target="_blank" onClick={() => setOpen(false)} className="flex items-center gap-2 transition">
                                        <SlWallet size={20} />خرید قسطی
                                    </Link>
                                </li>
                                <li>
                                    <Link href={"/"} target="_blank" onClick={() => setOpen(false)} className="block transition">
                                        فروشنده شو
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </Container>
                </div>
                {/* خط پایین برای فاصله انداختن navbar هنگام fixed شدن با عکس پایینش هست */}
                <div className="pt-[136px]">
                </div>
            </>
        </Suspense>
    );
};


export default Nav;