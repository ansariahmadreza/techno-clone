import Swiperslide from "../SwiperSlide"

export interface Rootimg {
    id: string,
    alt: string,
    image: string
};
const Slider = async () => {

    const imgSlider: Rootimg[] = await fetch("http://localhost:3001/ProductSlider",{
        cache:"no-store"
    }).then(res => res.json())
    return <Swiperslide imgSlider={imgSlider} />
};

export default Slider