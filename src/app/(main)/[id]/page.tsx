import { formatNumberWithCommas } from "@/utils/number";
import AddToCart from "../components/(products)/AddToCart";
import { RootCarousel } from "../components/mainPage/helper/swipercarsouel";


export interface RootProps {///بعد از اینکه وارد یک صفحه داینامیک میشی از این طریق id رو میگیری و اطلاعات محصول رو بالا میاری
    params: Promise<{ id: string }>
    searchParams: Promise<object>
};
const Store = async ({ params }: RootProps) => {

    const { id } = await params;
    const result: RootCarousel = await fetch(`http://localhost:3001/Carousel/${id}`, { cache: "no-cache" }).then(res => res.json());
    const Purchaseprofit = result.Price - result.DiscountedPrice
    return (
        <>
            <title>{result.description}</title>
            <section className="w-[90%] max-w-[1100px] pb-[120px] mx-auto mt-[100px] rounded-md 
            shadow-2xl border-2 border-neutral-200 p-6 flex flex-col
             sm:flex-row items-center gap-6">

                <div className="flex justify-center w-full sm:w-1/3">
                    <img src={result.image} alt={result.description}
                        title={result.description}
                        className="rounded-md w-[50%] sm:w-full object-cover" />
                </div>

                <div className="w-full sm:w-2/3 text-center sm:text-right">
                    <h2 className="inline-block">{formatNumberWithCommas(result.DiscountedPrice)}</h2>
                    <span className="pr-1">تومان</span>
                    <div>
                        <span className="text-neutral-500  line-through ml-2  ">{formatNumberWithCommas(result.Price)} </span>
                        <span className="text-neutral-500">تومان</span>
                        <div>
                            <h2 className="inline-block text-neutral-500">{formatNumberWithCommas(Purchaseprofit)}</h2>
                            <span className="text-neutral-500 pr-3">سود شما از خرید</span>
                        </div>
                    </div>
                    <p>{result.description}</p>
                </div>
                <div className="mt-6 flex justify-center sm:justify-start">
                    <AddToCart id={id} />
                </div>

            </section>
        </>

    )
};
export default Store;