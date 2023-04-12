import React, {useState, useEffect, useContext} from "react";
import "../styles/productPage.scss";
import SpecTemplate from "./SpecTemplate";
import {useLocation} from "react-router-dom";
import {storage} from "../firebase";
import {listAll, ref, getDownloadURL} from "firebase/storage";
import {useCookies} from "react-cookie";
import {CartContext} from "../context/CartContext.jsx";
import {AiFillDelete, FaMinusSquare, FaPlusSquare} from "react-icons/all.js";

const imageListRef = ref(storage, "product-images/");

function ProductTemplate({product, spec}) {
    const thisLocation = useLocation();
    const [imageUrl, setImageUrl] = useState(null);
    const [cookies, setCookies] = useCookies();

    const cart = useContext(CartContext)
    const productQuantity = cart.getProductQuantity(product.id)
    console.log(cart.items)

    useEffect(() => {
        try {
            setImageUrl(thisLocation.state.imageUrl)
        } catch (e) {
            getImages();
        }
    }, [])


    const getImages = () => {
        listAll(imageListRef).then((res) => {
            res.items.forEach((item) => {
                let imageName = item.name.split(".")
                if (imageName[0] == product.id) {
                    getDownloadURL(item).then((res) => {
                        setImageUrl(res)
                    })
                }
            })
        });
    };

    const handleAddProduct = (id) => cart.addOneToCart(id)

    return (
        <div className="product-page">
            {/* image, name and price */}
            <div id="product-template-image" className="product-section">
                <img
                    src={imageUrl !== null ? imageUrl : ''}
                    alt=""
                />
            </div>
            <div id="product-template-info" className="product-section">
                <h1>{product.name}</h1>
                <h2>${product.price}</h2>
                {
                    productQuantity > 0 ?
                        <div className="product-amount">
                            <h2>In Cart: {productQuantity}</h2>
                            <div>
                                <FaPlusSquare size={"50"}
                                              onClick={() => cart.addOneToCart(product.id)}>
                                </FaPlusSquare>
                                <FaMinusSquare size={"50"}
                                               onClick={() => cart.removeOneFromCart(product.id)}>
                                </FaMinusSquare>
                            </div>
                                <AiFillDelete className="remove-button" size={"50"}
                                          onClick={() => cart.deleteFromCart(product.id)}>
                                </AiFillDelete>
                        </div>
                        :
                        <button className="product-button" onClick={() => handleAddProduct(product.id)}>ADD TO
                            CART</button>
                }
            </div>
            {/* bottom half of product page */}
            <div id="product-description" className="product-section">
                <h3>{product.description}</h3>
                <h3>Type: {product.subType} {product.type}</h3>
                <h3>Brand: {product.brand}</h3>
                <h3>Product ID: {product.id}</h3>
            </div>
            <div id="spec-template" className="product-section">
                <SpecTemplate product={product} spec={spec}/>
            </div>
        </div>
    );
}

export default ProductTemplate;
