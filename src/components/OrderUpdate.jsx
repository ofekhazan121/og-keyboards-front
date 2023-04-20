import React, {useEffect, useState} from 'react';
import axios from "axios";
import ProductTemplate from "./ProductTemplate.jsx";

const OrderUpdate = () => {
    const [orderData, setOrderData] = useState([]);
    const [order, setOrder] = useState([])

    useEffect(() => {
        getOrderDetails()
        setOrder(orderMapping)
    }, [])

    const orderMapping = () => {
        let arr = []
        orderData.forEach((order) => {
            arr.push({productName: order.productName, productId: order.productId, quantity: order.quantity})
            console.log(order)
            console.log(arr)
        })
        return arr
    }


    const getOrderDetails = () => {
        let url = window.location.href
        let urlArray = url.split("/")
        let id = Number(urlArray[urlArray.length - 1])
        try {
            const test = axios.post("http://192.168.1.119:8080/order/get",
                id,
                {headers: {'Content-Type': 'application/json',}})
                .then((res) => {
                    setOrderData(res.data)
                })
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div className="order-container">
            <div className="order-products">
                {order.map((currentOrder, index) => (
                    <div className="order-item" key={index}>
                        <h3>{currentOrder.productName}</h3>
                        <p>Product Id: {currentOrder.productId}</p>
                        <p>Quantity: {currentOrder.quantity}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}
export default OrderUpdate;