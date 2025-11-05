import Formhandler from "@/app/(main)/components/Formhandler";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "ورود / ثبت نام | فروشگاه اینترنتی تکنولایف",
};

const Login = () => {
    return (
        <section className="flex flex-col md:flex-row items-start md:items-stretch w-full min-h-screen">

            <div className="w-full md:w-1/2">
                <img src="../Logos/logo-Login.webp" alt="logo-Login" className="w-full md:w-[1100px] h-[300px] sm:h-[400px] md:h-[742px] object-cover object-center" />
            </div>

            <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-5">
                <img src="../Logos/static_logo_techno_new.svg" alt="static_logo" className="w-[150px] mx-auto pt-[50px]" />
                <h2 className="pt-10 text-[18px] text-center font-bold">
                    ورود | ثبت نام
                </h2>

                <h3 className="text-center pt-10 font-bold text-[15px]">  خوش اومدی :)</h3>

                <div className="w-full mt-6 flex justify-center"><Formhandler /></div>
            </div>
        </section>
    );
};

export default Login;
