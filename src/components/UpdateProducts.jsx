import React from 'react';
import SearchResults from "./SearchResults.jsx";
import {useNavigate} from "react-router-dom";

const UpdateProducts = () => {
    const navigate = useNavigate();


    return (
        <div className="management-container">
            <h3>Select a Product Type</h3>
            <div>
                <button className="product-button" onClick={()=> navigate("/keyboards")}>Keyboards</button>
                <button className="product-button" onClick={()=> navigate("/keycaps")}>Keycaps</button>
                <button className="product-button" onClick={()=> navigate("/switches")}>Switches</button>
                <button className="product-button" onClick={()=> navigate("/accessories")}>Accessories</button>
            </div>
        </div>
    );
};

export default UpdateProducts;