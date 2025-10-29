"use client"
import { RootCarousel } from "./helper/Swipercarsouel";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/swiper-bundle.css";
import "swiper/swiper.css";
import { AiOutlineRight } from "react-icons/ai";
import { AiOutlineLeft } from "react-icons/ai";
import { formatNumberWithCommas } from "@/utils/number";
import Link from "next/link";
import Container from "../../../Container";



const SwiperCarousel = ({ Carousel }: { Carousel: RootCarousel[] }) => {

    return (
        <div>
            <Container>
                <section className="rounded-2xl border-neutral-300 px-2  py-6 mx-auto  border mt-10 ">
                    <div className=" flex justify-between sm:justify-end items-center  shadow bg-rose-800 px-4 text-white rounded py-3 sm:px-10 font-bold">
                        <span className="ml-1 cursor-pointer">
                            <Link target="_blank" href="/store"> نمایش همه محصولات</Link>
                        </span> <AiOutlineLeft className="cursor-pointer " size={14} />
                    </div>
                    <Swiper
                        className="group relative"
                        modules={[Navigation]}
                        navigation={{
                            prevEl: ".left-btn",
                            nextEl: ".Right-btn"
                        }}
                        spaceBetween={15}
                        slidesPerView={6}
                        loop
                        breakpoints={{
                            0: { slidesPerView: 1 },
                            480: { slidesPerView:2 },
                            768: { slidesPerView: 3 },
                            1024: { slidesPerView: 4 },
                            1280: { slidesPerView: 5 },
                            1536: { slidesPerView: 6 }
                        }}
                    >
                        {Carousel.map((item) =>
                            <SwiperSlide key={item.id} className="border-r sm:h-[870px]   border-neutral-300 px-2 py-4  mt-15 relative">
                                <Link href={`/${item.id}`}>
                                    <span className="text-rose-800 text-xl pr-3.5 mr-2.5"> تخفیف</span>
                                    <span className=" float-left text-rose-800 ml-5 text-center mr-2  p-0.5 rounded">{item.Discountpercentage}%</span>
                                    <img loading="lazy" className=" rounded-sm w-[180] h-[140px]  border-red-500 border-t-5 mx-auto cursor-pointer "
                                        src={item.image} alt={item.description} title={item.description} />
                                    <p className="h-[90px]  py-2 mx-auto px-1">{item.description}</p>

                                    <div className="flex items-center justify-between ">
                                        <p className="pr-[149px] md:pr-28 float-left">{formatNumberWithCommas(item.DiscountedPrice)}</p>
                                        <span className="text-[14px]">تومان</span>
                                    </div>
                                    
                                    <section className="text-[14px] mt-1">
                                        <span className="text-neutral-500 float-left">تومان</span>
                                        <span className="text-neutral-500 float-left  line-through ml-2  ">{formatNumberWithCommas(item.Price)} </span>
                                    </section>
                                </Link>
                            </SwiperSlide>
                        )}
                        <section >
                            <div className="left-btn  mr-2 top-[50%] absolute  z-40 w-[30px] h-[30px] text-black bg-neutral-100
                     rounded-2xl text-2xl pt-0.5  ">
                                <AiOutlineRight className="cursor-pointer hover:text-black text-neutral-500" />
                            </div>
                        </section>
                        <section className="flex justify-end items-center">
                            <div className="Right-btn  top-[50%] absolute h-[30px] rounded-2xl  z-40 bg-neutral-100  shadow-2xl
                    w-[30px] text-2xl pt-0.5 pr-1  group-hover ">
                                <AiOutlineLeft className="cursor-pointer hover:text-black  text-neutral-500" />
                            </div>
                        </section>
                    </Swiper>
                </section>
            </Container>
        </div>
    );
};
export default SwiperCarousel;