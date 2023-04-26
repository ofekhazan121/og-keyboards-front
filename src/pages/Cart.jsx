import React, {useContext, useEffect} from 'react'
import '../styles/cart.scss'
import {CartContext} from "../context/CartContext.jsx";
import CartProduct from "../components/CartProduct.jsx";
import axios from "axios";
import {useCookies} from "react-cookie";
import {Link, useNavigate} from "react-router-dom";
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Cart = () => {
    const cart = useContext(CartContext)
    const cartProducts = cart.items;
    const product = cart.productData
    const [cookies, setCookies, removeCookies] = useCookies();
    const navigate = useNavigate()


    const handleOrder = async () => {
        await axios.post("http://192.168.1.119:8080/order", {
            userName: cookies.userName,
            productList: cartProducts
        })
            .then((function (response) {
                cart.clearCart()
                navigate("/")
                cart.notifySuccess(response.data[0])
            })).catch(error => {
                cart.notifyError("Order Failed.. Make sure your credentials are correct")
                console.log(error)
            })
    }

    return (
        <div className='cart-container'>

            {cookies.userName ? <div>
                {
                    cartProducts.length === 0 ?
                        <div>
                            <h1>Your Cart is Empty</h1>
                        </div> :
                        <div>
                            <div className='cart-products'>
                                {cartProducts.map((currentProduct, index) => (
                                    <CartProduct
                                        key={index}
                                        productId={currentProduct.productId}
                                        quantity={currentProduct.quantity}
                                        name={cart?.productMap(currentProduct.productId)?.name}
                                        price={cart?.productMap(currentProduct.productId)?.price}>
                                    </CartProduct>
                                ))}
                            </div>
                            <h1>Total: ${cart.getTotalCost().toFixed(2)}</h1>
                            <button className="product-button" onClick={() => handleOrder()}>Order Now</button>
                            <p>Delivery is not Available,<br/> after ordering pick-up is Available from our Shop</p>
                        </div>
                }
            </div> : (
                <div className="cart-login">
                    <h1>Log in before adding products to cart</h1>
                    <button className="product-button"><Link to="/login">Login</Link></button>
                </div>
            )
            }
        </div>
    )
}

export default Cart