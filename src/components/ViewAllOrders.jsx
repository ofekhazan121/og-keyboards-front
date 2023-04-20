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
    const [orderNumber ,setOrderNumber] = useState()


    useEffect(() => {
        getAll()
    },[])

    const getAll = async () => {
        try {
            const res = await axios.get("http://192.168.1.119:8080/order/getAll",{headers: {'Authorization': `Bearer ${cookies.jwt}`}})
            console.log(res.data)
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
                        productName={currentOrder.productName}
                        productId={currentOrder.productId}
                        quantity={currentOrder.quantity}
                        price={currentOrder.price}
                        orderNumber={currentOrder.orderNumber}>
                        props={currentOrder}
                    </OrderCard>
                ))}
            </div>
            <button className="product-button">Click</button>
        </div>
    );
};

export default ViewAllOrders;