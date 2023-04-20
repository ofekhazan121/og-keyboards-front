import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import axios from "axios";



const OrderCard = (props) => {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate("/orderUpdate/" + props.orderNumber)
    }


    return (
        <div>
            <div className="order-item" onClick={handleClick}>
                <h3>{props.productName}</h3>
                <p>Product Id: {props.productId}</p>
                <p>Quantity: {props.quantity}</p>
                <p>${ (props.quantity * props.price).toFixed(2)}</p>
                <p>Order Number: {props.orderNumber}</p>
            </div>
        </div>
    );
};

export default OrderCard;