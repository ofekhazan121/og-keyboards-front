import React, {createContext, useEffect, useState} from 'react';
import axios from "axios";
import {useCookies} from "react-cookie";
import {toast, ToastContainer} from "react-toastify";

export const CartContext = createContext({
    items: [],
    getProductQuantity: () => {
    },
    addOneToCart: () => {
    },
    removeOneFromCart: () => {
    },
    deleteFromCart: () => {
    },
    getTotalCost: () => {
    },
});

export function CartProvider({children}) {
    const [cartProducts, setCartProducts] = useState([]);
    const [productData, setProductData] = useState([])
    const [cookies, setCookie, removeCookie] = useCookies(["cart"]);


    useEffect(() => {
        if (cartProducts.length === 0 && cookies.cart) {
            setCartProducts(cookies.cart)
        }
    }, [])

    useEffect(() => {
        console.log(cartProducts)
        setCookie('cart', JSON.stringify(cartProducts))
    }, [cartProducts])


    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('OG_KEYS_PRODUCTS'));
        if (data?.length === 0 || data === null) {
            getAllProductsData()
            localStorage.setItem('OG_KEYS_PRODUCTS', JSON.stringify(productData))
        } else {
            setProductData(data)
        }

    }, [])

    const clearCart = () => {
        setCartProducts([])
        removeCookie("cart")
    }

    const getAllProductsData = async () => {
        const res = await axios.get("http://localhost:8080/product/getAll")
        setProductData(res.data)
    }

    const productMap = (productId) => {
        return productData?.find(({id}) => id === productId)
    }

    function getProductQuantity(productId) {
        const quantity = cartProducts.find(product => product.productId === productId)?.quantity

        if (quantity === undefined) {
            return 0;
        }

        return quantity;
    }

    const addOneToCart = (productId) => {
        const quantity = getProductQuantity(productId);
        if (quantity === 0) {
            setCartProducts(
                [
                    ...cartProducts,
                    {
                        quantity: 1,
                        productId: productId,

                    }
                ]
            )
            console.log(cartProducts)
            const cartCookie = JSON.stringify(cartProducts)
            setCookie('cart', cartCookie)
        } else {
            setCartProducts(
                cartProducts.map(
                    product => product.productId === productId ? {...product, quantity: product.quantity + 1} : product
                )
            )
        }
    }

    function removeOneFromCart(productId) {
        const quantity = getProductQuantity(productId);

        if (quantity === 1) {
            deleteFromCart(productId);
        } else {
            setCartProducts(
                cartProducts.map(
                    product => product.productId === productId ? {...product, quantity: product.quantity - 1} : product
                )
            )
        }
    }

    function deleteFromCart(productId) {
        setCartProducts(
            cartProducts => cartProducts.filter(currentProduct => {
                return currentProduct.productId !== productId;
            })
        )
    }

    function getTotalCost() {
        let totalCost = 0;

        cartProducts.map((cartItem) => {
            const productData = productMap(cartItem.productId);
            totalCost += (productData?.price * cartItem.quantity)
        });
        return totalCost;
    }

    const notifySuccess = (string) => {
        toast.success(string, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    }

    const notifyError = (string) => {
        toast.error(string, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });

}

const contextValue = {
    items: cartProducts,
    getProductQuantity,
    addOneToCart,
    removeOneFromCart,
    deleteFromCart,
    getTotalCost,
    productData,
    productMap,
    notifySuccess,
    notifyError,
    clearCart
}
return (
    <CartContext.Provider value={contextValue}>
        {children}
        <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
        />
    </CartContext.Provider>
)
}

export default CartProvider
