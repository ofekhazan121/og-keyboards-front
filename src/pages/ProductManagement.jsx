import React from 'react'
import AddProduct from '../components/AddProduct'
import {useNavigate} from "react-router-dom";


function ProductManagement() {

    const navigate = useNavigate();

    return (
        <div className="management-container">
            <h2>Product Management</h2>
                <button className="product-button" onClick={() => navigate("/addProduct")}>Add Products</button>
                <button className="product-button" onClick={() => navigate("/updateProducts")}>Update Products</button>
        </div>
    )
}

export default ProductManagement