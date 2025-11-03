"use client"
import { useForm } from "react-hook-form"; ///برای مدیریت فرم و گرفتن داده ها
import { zodResolver } from "@hookform/resolvers/zod";/// وصل کردن قوانین zod به react hook form
import { useState } from "react";
import cookie from "js-cookie"
import axios from "axios";
import { type RegisterFormData, userSchema } from "@/utils/valid";
import Link from "next/link";
import { useUserStore } from "../../../zustand";

const Formhandler = () => {
    const [serverMessage, setServerMessage] = useState('')/// نمایش پیغام ثبت نام موفقیت امیز بود
    const { setUser } = useUserStore()

    /// به صورت کلی یه فرم بساز که فیلد هاش طبق registerFormData باشن و اعتبار سنجی طبق userSchema با zod انجام بشه
    const { register, /// هر input رو به فرم وصل میکنه
        handleSubmit, ///برای هندل کردن ارسال فرم
        formState: { errors // اگر خطا در گرفتن داده ها بود پیام اینجا ذخیره بشه
            , isSubmitting /// نشون میده فرم در هر ارسال هست یا خیر
        } }
        = useForm<RegisterFormData>({
            resolver: zodResolver(userSchema)
        })
    ///شبیه سازی وضعیت بک اند
    const onSubmit = async (data: RegisterFormData) => {
        try {
            const baseUrl = process.env.NEXT_PUBLIC_API_URL;
            setServerMessage("")
            const checkEmailUser = await axios.get(`${baseUrl}/users?email=${data.email}`);
            if (checkEmailUser.data.length > 0) {
                setServerMessage("این کاربر قبلاً ثبت‌ نام کرده است");
                return;
            }
            setServerMessage("ثبت نام با موفقیت انجام شد")
            setUser(data)
            handleLogin(data)
        } catch (err) {
            setServerMessage("مشکلی پیش امد")
        }
    };
    const handleLogin = async (user: RegisterFormData) => {
        const response = {
            token: 'sdgsdgxvcxcv',
            export: 365
        }
        cookie.set('token', response.token, { expires: response.export })

        const API_URL = process.env.NEXT_PUBLIC_API_URL;

        await axios({
            method: "POST",
            url: `${API_URL}/users`,
            data: {
                id: Math.floor(Math.random() * 100000).toString(),
                namefamily: user.name,
                email: user.email,
                password: user.password,
                confrimPassword: user.confirmPassword
            }
        })
        window.location.href = "/"
    }

    return (
        <div>
            <form className="flex flex-col items-center justify-center gap-3 pt-7" onSubmit={handleSubmit(onSubmit)} >
                <input type="text" {...register('name')} className="outline-0 border rounded p-1 w-[300px]" placeholder="نام  و نام خانوادگی" />
                {errors.name && <p>{errors.name.message}</p>}
                <input type="email" {...register("email")} className="outline-0 border rounded p-1 w-[300px]" placeholder="ایمیل" />
                {errors.email && <p>{errors.email.message}</p>}
                <input type="password" placeholder="رمز عبور" className="outline-0 border rounded p-1 w-[300px]"  {...register("password")} />
                {errors.password && <p>{errors.password.message}</p>}
                <input type="password" {...register("confirmPassword")} className="outline-0 border rounded p-1 w-[300px]" placeholder="تکرار رمز عبور" />
                {errors.confirmPassword && (<p>{errors.confirmPassword.message}</p>)}
                <Link href={"login/ExsitingUser"} className="text-[14px]">در صورتی که ثبت نام کرده اید از اینجا وارد شوید</Link>
                <button type="submit"
                    disabled={isSubmitting}
                    className={`p-1 text-white rounded-lg cursor-pointer mt-9 ${isSubmitting ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"}`}
                >
                    {!isSubmitting ? "ثبت نام" : "...در حال ارسال"}
                </button>
                {serverMessage && (
                    <p className={`text-center mt-2 ${serverMessage.includes("ثبت نام با موفقیت انجام شد") ? "text-green-600" : "text-red-600"
                        }`}>
                        {serverMessage}
                    </p>
                )}
            </form>
        </div>
    )
}
export default Formhandler;