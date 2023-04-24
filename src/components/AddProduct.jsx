import React, {useContext, useState} from "react";
import ReactDOM from "react-dom";
import "../index.scss";
import AddSpec from './AddSpec'
import axios from "axios";
import {useEffect} from "react";
import "../styles/productForm.scss";
import {storage} from "../firebase";
import {ref, uploadBytes} from "firebase/storage";
import {useCookies} from "react-cookie";
import ProductTemplate from './ProductTemplate'
import {useLocation} from "react-router-dom";
import updateProducts from "./UpdateProducts.jsx";
import {CartContext} from "../context/CartContext.jsx";
import {AiOutlinePicture} from "react-icons/ai";

function AddProduct() {
    const types = ["Keyboard", "Switch", "Keycaps", "Case", "Accessories"];
    const [isOpen, setIsOpen] = useState(false);
    const [cookies] = useCookies([])
    const location = useLocation()
    const [preview, setPreview] = useState(false);

    const [fromUpdate, setFromUpdate] = useState(false);

    const cart = useContext(CartContext)

    const [product, setProduct] = useState({
        name: "",
        price: 0,
        brand: "",
        model: "",
        type: "",
        subType: "",
        description: "",
    });
    const [spec, setSpec] = useState({
        spec1: "",
        spec2: "",
        spec3: "",
        spec4: "",
        spec5: "",
        spec6: "",
        spec7: "",
        spec8: "",
        spec9: "",
    });

    const [productResponse, setProductResponse] = useState({product, spec});
    const [imageUpload, setImageUpload] = useState(null);

    useEffect(() => {
        putData()
    }, []);

    const Modal = ({isOpen, onClose, children}) => {
        if (!isOpen) return null;
        console.log(isOpen);
        return ReactDOM.createPortal(
            <div className="modal-container">
                <div className="modal-div">
                    {children}
                    {
                        fromUpdate ?
                            <button className="product-button" onClick={() => updateProducts()}>
                                Update Product
                            </button>
                            :
                            <button className="product-button" onClick={() => insertProduct()}>
                                Add Product
                            </button>
                    }
                    <button className="product-button" onClick={() => onClose()}>
                        Close Preview
                    </button>
                </div>
            </div>,

            document.body
        );
    };

    const updateProducts = async () => {
        try {
            const data = await axios.post(
                "http://192.168.1.119:8080/product/updateProduct",
                productResponse
            )
            console.log(data)
            if (data.status === 200) {
                setIsOpen(false);
                cart.notifySuccess(data.data)
            } else {
                cart.notifyError(data.data)
            }

        } catch (err) {
            console.log(err.message);
            cart.notifyError(err.message)
        }
    }

    const handleImage = (event) => {
        console.log(event.target.files[0]);
        setImageUpload(event.target.files[0]);
    };

    const uploadImage = (data) => {
        if (imageUpload == null) return;
        const imageRef = ref(storage, `product-images/${data.product.id}`);
        uploadBytes(imageRef, imageUpload).then(() => {
            alert("imageUploaded");
        });
    };


    const insertProduct = async () => {
        try {
            const {data} = await axios.post(
                "http://192.168.1.119:8080/product/addproduct",
                productResponse
                , {headers: {"Authorization": `Bearer ${cookies.jwt}`}}
            );
            if (data) {
                uploadImage(data)
            }

            setIsOpen(false);
        } catch (err) {
            console.log(err);
        }
    };

    const handleInput = (e) => {
        const {name, value} = e.target;
        setProduct({...product, [name]: value});
        setSpec({...spec, [name]: value});
    };

    const putData = () => {
        if (location.state !== null && location.state.product !== null) {
            setFromUpdate(true)
            setProduct(location.state.product);
            setSpec(location.state.spec)
        }
    }

    return (
        <div>
            <div>
                {isOpen ? (
                    <Modal
                        isOpen={isOpen}
                        onClose={() => setIsOpen(false)}
                        children={<ProductTemplate product={product} spec={spec} fromPreview={preview}/>}
                    />
                ) : (
                    <form className="product-form" onSubmit={insertProduct}>
                        <input
                            type="text"
                            required
                            name="name"
                            value={product.name}
                            onChange={handleInput}
                            placeholder="name"
                        ></input>
                        <input
                            type="number"
                            required
                            name="price"
                            value={product.price}
                            onChange={handleInput}
                            placeholder="price"
                        ></input>
                        <input
                            type="text"
                            required
                            name="brand"
                            value={product.brand}
                            onChange={handleInput}
                            placeholder="brand"
                        ></input>
                        <input
                            type="text"
                            required
                            name="model"
                            value={product.model}
                            onChange={handleInput}
                            placeholder="model"
                        ></input>
                        <select
                            name=""
                            id=""
                            className="product-form-selector"
                            defaultValue={"DEFAULT"}
                            onChange={(e) =>
                                setProduct((prevState) => ({
                                    ...prevState,
                                    type: e.target.value,
                                }))
                            }
                        >
                            <option value={"DEFAULT"} disabled hidden>
                                Type
                            </option>
                            {types.map((type) => (
                                <option key={type}>{type}</option>
                            ))}
                        </select>
                        <input
                            type="text"
                            required
                            name="subType"
                            value={product.subType}
                            onChange={handleInput}
                            placeholder="sub-type"
                        ></input>
                        <input
                            type="text"
                            name="description"
                            value={product.description}
                            onChange={handleInput}
                            placeholder="description"
                        ></input>
                        <AddSpec product={product} spec={spec} setSpec={setSpec}/>
                        <label className="image-upload"> Upload Product Image :
                            <AiOutlinePicture size={50}/>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => {
                                    handleImage(e);
                                }}
                            />
                        </label>
                        <button
                            className="product-form-button"
                            onClick={() => {
                                setIsOpen(true);
                                setPreview(true);
                                setProductResponse({product, spec});
                            }}>
                            Preview Template
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
}

export default AddProduct;
