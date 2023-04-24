import React, {useEffect, useState} from 'react';
import axios from "axios";
import {useCookies} from "react-cookie";
import {useNavigate} from "react-router-dom";
import CartProduct from "./CartProduct.jsx";
import OrderCard from "./OrderCard.jsx";
import "../styles/orders.scss"

const ViewAllOrders = () => {
    const [cookies, setCookies, removeCookies] = useCookies();
    const navigate = useNavigate();
    const [orders, setOrders] = useState([])


    useEffect(() => {
        getAll()
    },[])

    const getAll = async () => {
        try {
            const res = await axios.get("http://192.168.1.119:8080/order/getOrderNumbers",{headers: {'Authorization': `Bearer ${cookies.jwt}`}})
            setOrders(res.data)
        }catch (e) {
            console.log(e)
        }
    }


    
    return (
        <div className='order-container'>
            <div className='order-products'>
                {orders.map((currentOrder,index) => (
                    <OrderCard
                        key={index}
                        status={currentOrder.status}
                        orderNumber={currentOrder.orderNumber}
                        workerName={currentOrder.workerName}
                        props={currentOrder}>
                    </OrderCard>
                ))}
            </div>
            <button className="product-button">Click</button>
        </div>
    );
};

export default ViewAllOrders;