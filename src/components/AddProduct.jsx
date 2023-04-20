import React, { useState } from "react";
import ReactDOM from "react-dom";
import "../index.scss";
import AddSpec from './AddSpec'
import axios from "axios";
import { useEffect } from "react";
import "../styles/productForm.scss";
import { storage } from "../firebase";
import { ref, uploadBytes } from "firebase/storage";
import { useCookies } from "react-cookie";
import ProductTemplate from './ProductTemplate'

function AddProduct() {
  const types = ["Keyboard", "Switch", "Keycaps", "Case", "Accessories"];
  const [isOpen, setIsOpen] = useState(false);
  const [cookies] = useCookies([])



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

  const [productResponse, setProductResponse] = useState({ product, spec });
  const [imageUpload, setImageUpload] = useState(null);

  useEffect(() => {
    console.log(product.type);
  }, [product.type]);

  const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;
    console.log(isOpen);
    return ReactDOM.createPortal(
      <div className="modal-container">
        <div className="modal-div">
          {children}
          <button className="product-button" onClick={() => insertProduct()}>
            Add Product
          </button>
          <button className="product-button" onClick={() => onClose()}>
            Close Preview
          </button>
        </div>
      </div>,

      document.body
    );
  };

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


  // , { headers :{ "Authorization" : `Bearer ${cookies.jwt}` }}
  const insertProduct = async () => {
    try {
      const { data } = await axios.post(
        "http://192.168.1.119:8080/product/addproduct",
        productResponse
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
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
    setSpec({ ...spec, [name]: value });
  };

  return (
    <div className="product-inputs">
      {isOpen ? (
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          children={<ProductTemplate product={product} spec={spec} />}
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
          <input
            type="file"
            onChange={(e) => {
              handleImage(e);
            }}
          />
          <AddSpec product={product} spec={spec} setSpec={setSpec} />
          <button
            className="product-form-button"
            onClick={() => {
              setIsOpen(true);
              setProductResponse({ product, spec });
            }}
          >
            Preview Template
          </button>
        </form>
      )}
    </div>
  );
}

export default AddProduct;
