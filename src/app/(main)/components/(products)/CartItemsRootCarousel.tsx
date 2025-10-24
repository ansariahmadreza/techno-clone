"use client";
import { formatNumberWithCommas } from "@/utils/number";
import { RootCarousel } from "../mainPage/helper/swipercarsouel";
import AddToCart from "./AddToCart";
import Container from "../../../Container";

interface IcartItemsProps {
    info: RootCarousel;
    qty: number;
}

const CartItemRootCarousel = ({ info, qty }: IcartItemsProps) => {
    return (
        <Container>
            <section
                className="w-[90%]  max-w-[900px] mx-auto mt-10 p-6 
        flex flex-col sm:flex-row items-center justify-between 
        gap-6 border-2 border-neutral-200 rounded-xl shadow-lg 
        bg-white overflow-hidden"
            >

                <div className="flex justify-center sm:justify-start w-full sm:w-1/3">
                    <img
                        className="rounded-md w-[50%] sm:w-full object-cover"
                        src={info.image}
                        alt={info.description}
                        title={info.description}
                    />
                </div>

                <div className="flex flex-col justify-center w-full sm:w-2/3 text-center sm:text-right gap-2">
                    <p className="text-base">
                        تعداد سفارش: <span className="font-semibold">{qty}</span>
                    </p>
                    <p className="text-base">    قیمت محصول <span className="font-semibold">{formatNumberWithCommas(info.Price ?? 0)}</span> تومان </p>
                    <p className="text-sm text-neutral-500"> قیمت با تخفیف:
                        <span className="font-semibold">{formatNumberWithCommas(info.DiscountedPrice ?? 0)}</span> تومان</p>

                    <div className="flex justify-center sm:justify-start mt-3">
                        <AddToCart id={info.id.toString()} />
                    </div>
                </div>
            </section>
        </Container>
    );
};

export default CartItemRootCarousel;
