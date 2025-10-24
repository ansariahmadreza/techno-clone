"use client"
import { useRouter, useSearchParams } from "next/navigation";
import ReactPaginate from "react-paginate";

const Paginate = ({ pageCount }: { pageCount: number }) => {
    const Router = useRouter()
    const searchParams = useSearchParams()
    const handlePageClick = (e: { selected: number }) => {
        const page = e.selected + 1;
        const currentSearchParams = new URLSearchParams(searchParams.toString())  
        currentSearchParams.set("page", page.toString())
        currentSearchParams.set("per_page", "6")
        Router.push(`/store?${currentSearchParams.toString()}`);
    };

    return (
        <>
            <ReactPaginate
                breakLabel="..."
                nextLabel="صفحه بعد"
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={pageCount}
                previousLabel=" صفحه قبل "
                renderOnZeroPageCount={null}

                containerClassName="flex justify-center mb-[50px] items-center gap-2 "
                pageClassName="border rounded-md  cursor-pointer"
                pageLinkClassName="block px-2 py-2"
                activeClassName="bg-blue-800 text-white"
                previousClassName="cursor-pointer border rounded-md px-3 py-1 hover:bg-gray-400"
                nextClassName="cursor-pointer border rounded-md px-3 py-1 hover:bg-gray-400 "
            />
        </>
    )
};
export default Paginate;