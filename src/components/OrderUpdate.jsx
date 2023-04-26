import React, {useContext, useEffect, useState} from 'react';
import axios from "axios";
import ProductTemplate from "./ProductTemplate.jsx";
import {useCookies} from "react-cookie";
import {CartContext} from "../context/CartContext.jsx";

const OrderUpdate = () => {
    const [orderData, setOrderData] = useState([]);
    const [status, setStatus] = useState(null);
    const [cookies, setCookies, removeCookies] = useCookies();
    const cart = useContext(CartContext)


    useEffect(() => {
        getOrderDetails()
    }, [])

    let url = window.location.href
    let urlArray = url.split("/")
    let id = Number(urlArray[urlArray.length - 1])


    useEffect(() => {
        if (status !== null) {
            putOrderStatus()
        }
    }, [status])

    const putOrderStatus = async () => {
        await axios.put("http://localhost:8080/order/updateStatus", {
            workerId: cookies.workerId,
            status: status,
            orderNumber: id
        }, {headers: {'Authorization': `Bearer ${cookies.jwt}`}})
            .then(res => {
                cart.notifySuccess(res.data)
            })
            .catch(error => {
                cart.notifyError("Order Status Update Failed! Try Again")
            })
    }

    const getOrderDetails = () => {
        try {
            const test = axios.post("http://localhost:8080/order/get",
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
                {orderData.map((currentOrder) => (
                    <div className="order-item" key={currentOrder.id}>
                        <h3>{currentOrder.productName}</h3>
                        <p>Product Id: {currentOrder.productId}</p>
                        <p>Quantity: {currentOrder.quantity}</p>
                    </div>
                ))}
            </div>
            {cookies.role !== "CLIENT" ?
                <select className="order-selector" defaultValue={"DEFAULT"} onChange={(e) => setStatus(e.target.value)}>
                    <option value="RECEIVED">Received</option>
                    <option value="IN_PROGRESS">In Progress</option>
                    <option value="COMPLETED">Completed</option>
                </select> : <></>}

        </div>
    )
}
export default OrderUpdate;