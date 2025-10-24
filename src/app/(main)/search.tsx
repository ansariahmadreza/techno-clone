"use client"
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { IoClose } from "react-icons/io5";
import { PiMagnifyingGlassLight } from "react-icons/pi";

const Search = () => {
    const [search, setSearch] = useState('')
    const [showMobileInput, setShowMobileInput] = useState(false)
    const Router = useRouter()
    const searchParams = useSearchParams()

    const handleSearch = () => {
        const currentSearchParams = new URLSearchParams(searchParams.toString())
        currentSearchParams.set("title", search)
        Router.push(`/store?${currentSearchParams.toString()}`)
        setSearch("")
    };

    return (
        <section className="relative">
            <div className="flex justify-center 
items-center pr-4 py-2 relative">
                <PiMagnifyingGlassLight onClick={() => {
                    if (window.innerWidth < 1024) {
                        setShowMobileInput(true)
                    } else {
                        handleSearch()
                    }
                }}
                    className="w-7 h-7 text-neutral-500 bg-white cursor-pointer  " />

                <input value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    autoFocus autoComplete="on"
                    className="w-130 h-10 pr-3 hidden lg:inline-block rounded bg-neutral-200 outline-none"
                    type="text" placeholder="محصول و شماره مورد نظر را جستجو کنید" />
            </div>

            {showMobileInput && (
                <div className="fixed inset-0 z-50 flex
                justify-center items-start pt-10 
                ">
                    <div className="bg-white w-[90%]
                    rounded-full px-4 py-3 shadow-xl
                    flex items-center gap-2">
                        <PiMagnifyingGlassLight onClick={handleSearch}
                            className="w-6 h-6  cursor-pointer"
                        />
                        <input
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            autoFocus
                            autoComplete="on"
                            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                            className="flex-1 outline-0 text-base"
                            placeholder="محصول و شماره محصول"
                        />
                        <IoClose onClick={() => setShowMobileInput(false)}
                            className="w-6 h-6  cursor-pointer"
                        />
                    </div>

                </div>
            )}
        </section>
    )
};

export default Search;