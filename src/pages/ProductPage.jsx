import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductTemplate from "../components/ProductTemplate";



const ProductPage = () => {
    const [product, setProduct] = useState();

    const getProduct = async() => {
        let url = window.location.href
        let urlArr = url.split("/")
        const response = await axios.post("http://localhost:8080/product/getProduct",  { id : Number(urlArr[urlArr.length-1]) })
        setProduct(response.data)
    }

    useEffect(() => {
      getProduct();
    }, [])
    
  return (
    <div>
        {product != null ? <ProductTemplate product={product.product} spec={product.spec}/> : <></>}
    </div>
  )
}

export default ProductPage