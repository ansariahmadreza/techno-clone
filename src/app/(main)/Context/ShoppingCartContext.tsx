"use client"
import { createContext, useContext, useEffect, useState } from "react";


interface ShoppingCartContextProvider {
    children: React.ReactNode
};

interface ProductItems {
    id: number,
    qty: number /// تعداد کالا
};

interface RootShoppingCartContext {
    ProductItems: ProductItems[]
    handleIncreaseProduct: (id: number) => void;
    handleDecreaseProduct: (id: number) => void;
    handleRemoveProduct: (id: number) => void;
    getProductQty: (id: number) => number
    cartTotalQty: number
};
const ShoppingCartContext = createContext({} as RootShoppingCartContext);

export const useShoppingCartContext = () => {
    return useContext(ShoppingCartContext)
}

const ShoppingCartContextProvider = ({ children }: ShoppingCartContextProvider) => {

    const [ProductItems, setProductItems] = useState<ProductItems[]>([])

    const getProductQty = (id: number) => {
        return ProductItems.find(item => item.id === id)?.qty || 0 /// مقدار qty ایتمی id با item.id برابر داره رو برگردو
    }

    const cartTotalQty = ProductItems.reduce((totalQty, item) => {
        return totalQty + item.qty
    }, 0)

    const handleIncreaseProduct = (id: number) => {
        setProductItems(prev => {
            const isNotProductExit = prev.find(item => item.id == id) == null;
            if (isNotProductExit) {
                return [...prev, { id, qty: 1 }]
            } else {
                return prev.map(item => {
                    if (item.id === id) {
                        return { ...item, qty: item.qty + 1 }
                    } else {
                        return item
                    }
                })
            }
        })
    }

    const handleDecreaseProduct = (id: number) => {
        setProductItems(prev => {
            const isLastOne = prev.find(item => item.id == id)?.qty == 1
            if (isLastOne) {
                return prev.filter((item) => item.id !== id)
            } else {
                return prev.map(item => {
                    if (item.id === id) {
                        return { ...item, qty: item.qty - 1 }
                    } else {
                        return item
                    }
                })
            }
        })
    }

    const handleRemoveProduct = (id: number) => {
        setProductItems(prev => {
            return prev.filter(item => item.id !== id);
        });
    };
    useEffect(() => {
        const storedCartItems = localStorage.getItem("cartItems")
        if (storedCartItems) {
            setProductItems(JSON.parse(storedCartItems))
        }
    }, [])

    useEffect(() => {
        localStorage.setItem("cartItems", JSON.stringify(ProductItems))
    }, [ProductItems])

    return (
        <ShoppingCartContext.Provider value={{ ProductItems, getProductQty, handleIncreaseProduct, handleDecreaseProduct, handleRemoveProduct, cartTotalQty }}>
            {children}
        </ShoppingCartContext.Provider>
    )
}

export default ShoppingCartContextProvider;