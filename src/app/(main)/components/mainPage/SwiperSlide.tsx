"use client"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Pagination, Autoplay } from "swiper/modules"
import "swiper/swiper-bundle.css"
import "swiper/swiper.css"
import { AiOutlineArrowLeft } from "react-icons/ai";
import { AiOutlineArrowRight } from "react-icons/ai";
import { Rootimg } from "./helper/swiperslide"


const Swiperslide = ({ imgSlider }: { imgSlider: Rootimg[] }) => {

    if (imgSlider.length === 0) return <p className="text-center font-bold" > در حال بارگیری</p>
    return (
        <div>
            <Swiper
                className="relative group "
                modules={[Navigation, Pagination, Autoplay]}
                pagination={{
                    clickable: true,
                    el: ".custom-class"
                }}
                navigation={{
                    prevEl: ".button-prev-slide",
                    nextEl: ".button-next-slide"
                }}
                autoplay={{ delay: 3000 }}
                loop

            >
                {imgSlider.map((item) =>
                    <SwiperSlide key={item.id}
                        className="overflow-hidden w-full ">
                        <div className="relative w-full aspect-16/6 sm:aspect-16/5
                        md:aspect-[16/4.5] lg:aspect-16/4">
                            <img className="absolute inset-0 w-full h-full object-fill transition-all duration-500" src={item.image} alt={item.alt} title={item.alt} />
                        </div>
                    </SwiperSlide>
                )}
                <div className="custom-class absolute bottom-3 left-1/2 -translate-x-1/2 z-10"></div>

                <div className="button-prev-slide absolute
                top-1/2 
                -translate-y-1/2 left-2 sm:left-4 z-10
                w-9 h-9 sm:w-11 sm:h-11 grid place-items-center
                rounded-full bg-black/50 text-white opacity-0 
                group-hover:opacity-100 transition-all duration-300 ">
                    <AiOutlineArrowRight  className="text-xl"/>
                </div>

                <div className="button-next-slide absolute top-1/2
                 -translate-y-1/2 right-2 sm:right-4 z-10 w-9
                  h-9 sm:w-11 sm:h-11 grid place-items-center 
                  rounded-full bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <AiOutlineArrowLeft  className="text-xl"/>
                </div>
            </Swiper>
        </div>
    );
};

export default Swiperslide;