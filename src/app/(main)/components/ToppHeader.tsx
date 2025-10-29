"use client"
import Link from "next/link"
import Container from "../../Container"
import { IoCartOutline } from "react-icons/io5";
import { useShoppingCartContext } from "../Context/ShoppingCartContext";
import cookie from "js-cookie"
import { useEffect, useState } from "react";
import DropdownProfile from "../../dropdownMenu";
import Search from "../Search"



const TopHeader = () => {

    const { cartTotalQty } = useShoppingCartContext()
    const [userCookie, setUserCookie] = useState<string>("")
    const handleCookie = () => {
        const cook = cookie.get("token")
        if (cook) {
            setUserCookie(cook || "")
        }
    }
    useEffect(() => {///فقط بعد از رندر شدن کامپوننت سمت مرورگر یا کلاینت این اجرا بشه
        handleCookie()
    }, [])

    return (
        <Container>
            <div className="flex justify-between items-center my-5" >
                <div className="flex items-center ">
                    <Link href={"/"}>
                        <img className="pl-7 cursor-pointer w-36 h-10 hidden sm:inline-block" src="../icons/static_logo_techno_new.svg" title="Technolife" />
                    </Link>
                    <Search/>
                </div>

                <div className="flex items-center ">
                    {
                        userCookie ?
                            <Link href={"/login"} target="_blank" className={`${`cooke ? "w-[50px] pl-5 " : ""  `} mt-2 text-center`}>
                                <DropdownProfile />
                            </Link>
                            :
                            <Link target="_blank" className={`shadow rounded-sm p-1.5 ml-5 text-center ${`cook  ? "" : " w-[120px]"`}`} href={"/login"}>
                              ثبت نام | ورود
                            </Link>
                    }
                    <Link href={"/Cart"}>
                        <IoCartOutline className="border border-neutral-400 w-[30px] h-[30px]  rounded " title="سبد خرید"></IoCartOutline>
                        <div className="fixed">
                            <span className={`text-white bg-blue-800  bottom-[-13px] -right-2 rounded-md absolute w-5 text-center
                                 ${!cartTotalQty ? "opacity-0" : "opacity-100"}`}>
                                {cartTotalQty}
                            </span>
                        </div>
                    </Link>
                </div>
            </div>
        </Container >
    );
};

export default TopHeader;