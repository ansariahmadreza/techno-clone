import { formatNumberWithCommas } from "@/utils/number";
import AddToCart from "../../components/(products)/AddToCart"
import { RootCarousel } from "../../components/mainPage/helper/swipercarsouel";

interface RootProps {
    params: Promise<{ id: string }>
    searchParams: Promise<{}>
}
const Store = async ({ params }: RootProps) => {
    const { id } = await params;
    const result: RootCarousel = await fetch(`http://localhost:3001/Products/${id}`, { cache: "no-cache" }).then(res => res.json());
    return (
        <section>
            <title>{result.description}</title>
            <section className="w-[90%] max-w-[1100] pb-[120px] sm:flex-row items-center gap-6
             mx-auto mt-[100px] rounded-md shadow-2xl border-2 border-neutral-200 p-6 flex flex-col">

                <div className="flex justify-center w-full sm:w-1/3">
                    <img src={result.image} alt={result.description}
                        title={result.description}
                        className="rounded-md w-[50%] sm:w-full object-cover" />
                </div>

                <div className="w-full sm:w-2/3 text-center sm:text-right">
                    <h2 className="inline-block">{formatNumberWithCommas(result.Price)}</h2>
                    <span className="pr-2">تومان</span>
                    <p className="mt-2">{result.description}</p>
                </div>
                <AddToCart id={id} />
            </section>
        </section>
    )
};
export default Store;