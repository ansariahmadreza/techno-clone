import { RootProps } from "@/app/(main)/[id]/page";
import { infoUsers } from "@/app/dropdownMenu";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'حساب کاربری'
}

const Profileuser = async ({ params }: RootProps) => {
    const { id } = await params
    const infoUser: infoUsers = await fetch(`http://localhost:3001/users/${id}`).then(res => res.json())

    return (
        <div className="mt-[200px] shadow-2xl text-center w-[400px] mx-auto h-[100px] border-neutral-400 rounded  border">
            <section className="mt-[20px]">
                <h2 ><p className="inline-block"> حساب کاربری:</p>{infoUser.namefamily}</h2>
                <h4> <p className="inline-block"> ادرس ایمیل:</p>{infoUser.email}</h4>
            </section>
        </div>
    )
}

export default Profileuser


