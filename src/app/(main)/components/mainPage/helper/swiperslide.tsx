import Swiperslide from "../SwiperSlide"

export interface Rootimg {
    id: string,
    alt: string,
    image: string
};
const Slider = async () => {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL;
    const imgSlider: Rootimg[] = await fetch(`${baseUrl}/ProductSlider`, {
        cache: "no-store"
    }).then(res => res.json())
    return <Swiperslide imgSlider={imgSlider} />
};

export default Slider