import { z } from "zod";/// تعریف قوانین اعتبار سنجی فرم

export const userSchema = z.object({/// تعریف یک ابجکت از z که دارای مقادیر و قوانین زیر است
    name: z.string().min(3, "نام باید حداقل 3 کاراکتر داشته باشد"),
    email: z.string().email("ایمیل معتبر نیست"),
    password: z.string().min(6, "حداقل 6 کاراکتر لازم است").regex(/[A-Z]+/, "باید دارای یک حرف بزرگ باشد"),
    confirmPassword: z.string().min(6, "تکرار رمز عبور الزامی است")
}).refine((data) => data.password === data.confirmPassword, {/// رمز عبور و تکرار ان باید یکسان باشد و اگر نبود پیغام خطای مشخص شده رو روی فیلد confirmpassword نشون بده
    message: "رمز عبور و تکرار ان باید یکسان باشند",
    path: ["confirmPassword"]
})

export type RegisterFormData = z.infer<typeof userSchema> /// ساخت یک تایپ اختصاصی که بر اساس قوانین ابجکتی که در بالا با درنظر گرفتن قوانین zod ساختیم