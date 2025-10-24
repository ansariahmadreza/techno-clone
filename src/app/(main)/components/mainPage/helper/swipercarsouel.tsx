import SwiperCarousel from "../SwiperCarousel"

export interface RootCarousel {
    title:string
    id: string,
    image: string,
    description: string
    Price: number,
    DiscountedPrice: number,
    Discountpercentage: number,
    Score: number
};

export interface RootProduct {
    first: number | null,
    items: number | null,
    last: number | null,
    next: number | null,
    pages: number,
    prev: number | null,
    data: RootCarousel[]
};

const SwiperCar = async () => {

    const Carousel: RootCarousel[] = await fetch("http://localhost:3001/Carousel", {
        cache: 'no-store'
    }).then(res => res.json());
    return <SwiperCarousel Carousel={Carousel} />
};

export default SwiperCar;