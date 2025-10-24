"use client"
import { formatNumberWithCommas } from "@/utils/number";
import { RootCarousel } from "../mainPage/helper/swipercarsouel";
import AddToCart from "./AddToCart";
import Container from "../../../Container";


interface IcartItemsProps {
    info: RootCarousel,
    qty: number
};

const CartItem = ({ info, qty }: IcartItemsProps) => {

    return (
        <Container>
            <section className="w-[90%] max-w-[900px] max-h-[1000px]  pb-[120px]
             sm:flex-row items-center gap-6
            mx-auto mt-[100px] rounded-md shadow-2xl
            border-2 border-neutral-200 p-6 flex flex-col
            ">
                <div className="flex justify-center w-full sm:w-1/3">
                    <img className="rounded-md w-[50%] sm:w-full object-cover" 
                    src={info.image} alt={info.description} title={info.description} />
                </div>

                <div className="w-full sm:w-[90px] text-center sm:text-right">
                    <p>تعداد سفارش <span>{qty}</span></p>
                    <p>قیمت محصول <span>{formatNumberWithCommas(info.Price ?? 0)} <span>تومان</span></span></p>
                </div>
                <div>
                    <AddToCart id={info.id.toString()} />
                </div>
            </section>
        </Container>
    );
};

export default CartItem;