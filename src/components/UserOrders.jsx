import React, {useState} from 'react';
import axios from "axios";
import {useCookies} from "react-cookie";

const UserOrders = () => {

    const [cookies] = useCookies()
    const [orders, setOrders] = useState([])

    const getUserOrders = async () => {
        const res = await axios.post("http://192.168.1.119:8080/order/getByUserName",
            { userName: cookies.userName}, {headers: {'Authorization': `Bearer ${cookies.jwt}`}})
        setOrders(res.data)

        console.log(res.data)
    }


    return (
        <div className="container">
            <button onClick={() => getUserOrders()}>Click</button>
        </div>
    );
};

export default UserOrders;