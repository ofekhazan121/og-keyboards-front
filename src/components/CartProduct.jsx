import React, {useContext} from 'react';
import { CartContext} from "../context/CartContext.jsx";
import {AiFillDelete} from "react-icons/ai";

const CartProduct = (props) => {
    const cart = useContext(CartContext)
    const productId = props.productId
    const quantity = props.quantity

    return (
        <div className="cart-item">
            <h3>{props.name}</h3>
            <p>Quantity: {quantity}</p>
            <p>${ (quantity * props.price).toFixed(2)}</p>
            <AiFillDelete className="remove-button" size={"50"}
                          onClick={() => cart.deleteFromCart(productId)}>
            </AiFillDelete>
        </div>
    );
};

export default CartProduct;