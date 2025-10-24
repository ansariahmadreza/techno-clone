"use client"
import { useShoppingCartContext } from "../../Context/ShoppingCartContext";

interface Rootid {
    id: string
}

const AddToCart = ({ id }: Rootid) => {

    const { handleIncreaseProduct, handleDecreaseProduct, getProductQty, handleRemoveProduct } = useShoppingCartContext()

    return (
        <section className="inline-flex w-full justify-center
        md:justify-start">
            <div className="flex flex-col
             md:flex-row items-center 
             md:items-center
             gap-3 md:gap-0 mt-5 md:mt-0
             ">
                <div className="flex items-center">
                    <button onClick={() => handleIncreaseProduct(parseInt(id))}
                        className="bg-blue-900 px-3 py-2 rounded-sm  cursor-pointer mx-2 text-white">+</button>
                    <span>{getProductQty(parseInt(id))}</span>

                    <button onClick={() => { handleDecreaseProduct(parseInt(id)) }}
                        className=" bg-blue-900 px-3 py-2 rounded-md cursor-pointer text-white mx-2">-</button>
                </div>


                <div className="w-[120px] text-center p-2 rounded bg-blue-900
                text-white cursor-pointer mt-3 md:mt-0 md:ml-[200px]
                ">
                    <button className="cursor-pointer" onClick={() => handleRemoveProduct(parseInt(id))}>حذف محصول</button>
                </div>
            </div>


        </section>
    );
};

export default AddToCart;