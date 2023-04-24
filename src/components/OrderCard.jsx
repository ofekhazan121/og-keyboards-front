import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {useCookies} from "react-cookie";



const OrderCard = (props) => {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate("/orderUpdate/" + props.orderNumber)
    }
    const [cookie, setCookie, removeCookie] = useCookies()


    return (
        <div>
            <div className="order-item" onClick={handleClick}>
                {cookie.role !== "CLIENT" ? <div>{props.workerName ? <h3>Worker Name: {props.workerName}</h3> : <h3>No Worker Has been Assigned</h3>}</div> : <></>}


                <h4>Status: {props.status}</h4>
                <h4>Order Number: {props.orderNumber}</h4>
                <p>Click To see more Info</p>
            </div>
        </div>
    );
};

export default OrderCard;