"use client"
import { useShoppingCartContext } from "../Context/ShoppingCartContext";
import { useEffect, useState, Suspense } from "react";
import Countainer from "../../Container";
import { RootCarousel } from "../components/mainPage/helper/Swipercarsouel";
import CartItem from "../components/(products)/CartItems";
import { formatNumberWithCommas } from "@/utils/number";
import axios from "axios";
import CartItemRootCarousel from "../components/(products)/CartItemsRootCarousel";

const Cart = () => {
    const { ProductItems } = useShoppingCartContext() /// تعداد و ایدی محصول
    const [products, setProducts] = useState<RootCarousel[]>([]) // کل محصولات بدون تخفیف
    const [Carousel, setCarousel] = useState<RootCarousel[]>([]) // کل محصولات تخفیف‌دار
    const [finalPrice, setFinalPrice] = useState(0) // قیمت کل با تخفیف
    const [discountPrice, setDiscountPrice] = useState(0) // مجموع تخفیف‌ها
    const [loading, setLoading] = useState(true)/// بررسی وضعیت لود 
    
    
    useEffect(() => {
        axios.all([
            axios.get(`http://localhost:3001/Products`),
            axios.get(`http://localhost:3001/Carousel`)
        ]).then(
            axios.spread((productsRes, carouselRes) => {
                setProducts(productsRes.data)
                setCarousel(carouselRes.data)
                setLoading(false)
            })
        )
    }, [])

    /// قیمت کل بدون تخفیف
    const totalPrice = Array.isArray(ProductItems) ? ProductItems.reduce((total, item) => {
        const selectedProduct = products.find(p => p.id === item.id.toString())
        const selectedCarousel = Carousel.find(c => c.id === item.id.toString())
        return total + (selectedProduct?.Price || selectedCarousel?.Price || 0) * item.qty
    }, 0) : 0;

    useEffect(() => {
        if (!loading) {
            const discountItems = Carousel.filter(c =>  ///پیدا  کردن محصولی که دارای تخفیف هست
                ProductItems?.some(p => p.id.toString() === c.id)
            )
            //قیمت کل با تخفیف
            const discountTotal = discountItems.reduce((sumDiscountPrice, item) => {
                return sumDiscountPrice + ((item.Price - item.DiscountedPrice) || 0) *
                    (ProductItems.find(p => p.id.toString() === item.id)?.qty || 1)
            }, 0)
            setDiscountPrice(discountTotal)
            setFinalPrice(totalPrice - discountTotal)
        }
    }, [loading, ProductItems, products, Carousel])

    if (loading) return <div>در حال بارگذاری...</div>

    return (
        <Suspense fallback={loading}>
            <section >
                <Countainer>
                    <h2 className="font-bold">سبد خرید</h2>
                    {ProductItems?.map((item) => {
                        const product = products.find(p => p.id === item.id.toString())
                        const carouselItem = Carousel.find(c => c.id === item.id.toString())
                        if (!product && !carouselItem) return null  /// اگر محصولی نبود null برگردون
                        if (carouselItem?.DiscountedPrice) {
                            return (
                                <div key={item.id}>
                                    <CartItemRootCarousel info={carouselItem} qty={item.qty} />
                                </div>
                            )
                        }
                        //// وقتی دوتا حالت کاملا متفاوت داریم دوتا return باید باشه

                        // ! یعنی قطعا وجود داره
                        return (
                            <div key={item.id}>
                                <CartItem info={product!} qty={item.qty} />
                            </div>
                        )
                    })}
                    <div className="mt-5">
                        <h3>قیمت کل: <span>{formatNumberWithCommas(totalPrice)} تومان</span></h3>
                        {discountPrice > 0 && (
                            <div>
                                <h3>قیمت کل با تخفیف: <span>{formatNumberWithCommas(finalPrice)} تومان</span></h3>
                                <h3>تخفیف کل: <span>{formatNumberWithCommas(discountPrice)} تومان</span></h3>
                            </div>
                        )}
                    </div>
                </Countainer>
            </section >
        </Suspense>
    )
};
export default Cart;