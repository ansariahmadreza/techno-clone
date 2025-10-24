"use client"
import axios from "axios"
import { useState } from "react"
import { useRouter } from "next/navigation";
import cookie from "js-cookie";
import { z } from "zod";/// تعریف قوانین اعتبار سنجی فرم
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUserStore } from "@/zustand";

export const userSchema = z.object({/// تعریف یک ابجکت از z که دارای مقادیر و قوانین زیر است
    email: z.string().email("ایمیل معتبر نیست"),
})
export type RegisterFormData2 = z.infer<typeof userSchema> /// ساخت یک تایپ اختصاصی که بر اساس قوانین ابجکتی که در بالا با درنظر گرفتن قوانین zod ساختیم


const exsitingUser = () => {
    const Router = useRouter()
    const { setUser2 } = useUserStore()

    const { register, /// هر input رو به فرم وصل میکنه
        handleSubmit, ///برای هندل کردن ارسال فرم
        formState: { errors // اگر خطا در گرفتن داده ها بود پیام اینجا ذخیره بشه
        } }
        = useForm<RegisterFormData2>({
            resolver: zodResolver(userSchema)
        })

    const onSubmit = async (data: RegisterFormData2) => {
        handler(data)
        setUser2(data)
    };



    const handler = async (item: RegisterFormData2) => {
        const checkEmailUser = await axios.get(`http://localhost:3001/users?email=${item?.email}`);

        if (checkEmailUser.data.length > 0) {
            const response = {
                token: 'sdgsdgxvcxcv',
                export: 365
            }
            cookie.set('token', response.token, { expires: response.export })
            Router.push('/')
        }
    }


    return (
        <section>
            <title>بازیابی حساب کاربری</title>
            <div className="mt-10">
                <h1 className="text-center  text-lg md:text-2xl mb-8">ورود کاربری که قبلا ثبت  نام کرده</h1>
                <div className="flex justify-center items-center">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <input type="email" {...register("email")} className="outline-0 border rounded p-1 w-[250px] md:w-[300px]" placeholder="لطفا ادرس ایمیل خود را وارد کنید" />
                        {errors.email && <p>{errors.email.message}</p>}
                        <div className="flex justify-center items-center mt-8">
                            <button className="bg-blue-800 mx-auto w-[80px] text-white p-2 rounded hover:bg-blue-700" type="submit">ورود مجدد</button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default exsitingUser;