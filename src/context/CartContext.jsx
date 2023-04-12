import React, {createContext, useState, useEffect} from 'react';
import axios from "axios";
import {useCookies} from "react-cookie";
import {json} from "react-router-dom";
import cart from "../pages/Cart.jsx";

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
    const [cookies, setCookie] = useCookies(["cart"]);
    // [ { id: 2 ,quantity: 2 }, { id: 4, quantity: 1} ]

    useEffect(() => {
        if (cartProducts.length === 0 && cookies.cart) {
            setCartProducts(cookies.cart)
        }
    }, [])

    useEffect(() => {
        console.log(cartProducts)
    },[cartProducts])

    const getProductData = async (productId) => {
        axios.post("http://localhost:8080/product/getProduct", {productId})
            .then((response) => {
                setProductData(response.data)
                console.log(response.data)
                return response.data
            })
            .catch(error => {
                console.log("There Was an error!", error);
            })

    };

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

        if (quantity == 1) {
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
            const productData = getProductData(cartItem.productId);
            totalCost += (productData.price * cartItem.quantity)
        });
        return totalCost;
    }

    const contextValue = {
        items: [],
        getProductQuantity,
        addOneToCart,
        removeOneFromCart,
        deleteFromCart,
        getTotalCost,
    }
    return (
        <CartContext.Provider value={contextValue}>
            {children}
        </CartContext.Provider>
    )
}

export default CartProvider
