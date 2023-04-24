import React, {useEffect, useState} from 'react';
import axios from "axios";
import {useCookies} from "react-cookie";
import OrderCard from "./OrderCard.jsx";

const UserOrders = () => {

    const [cookies] = useCookies()
    const [orders, setOrders] = useState([])

    useEffect(() => {
        getUserOrders()
    },[])

    const getUserOrders = async () => {
        const res = await axios.post("http://192.168.1.119:8080/order/getByUserName",
            { userName: cookies.userName}, {headers: {'Authorization': `Bearer ${cookies.jwt}`}})
        setOrders(res.data)
        console.log(res.data)
    }


    return (
        <div className="container">
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
        </div>
    );
};

export default UserOrders;