import React, { useState, useEffect } from "react"
import "../styles/productCard.scss";
import { useNavigate } from "react-router-dom";
import ImagesContextProvider, { useImagesContext } from '../context/ImagesContext'
import { storage } from "../firebase";
import { listAll, ref, getDownloadURL } from "firebase/storage";

function ProductCard(props) {

  const imageListRef = ref(storage, "product-images/");
  const navigate = useNavigate();
  const [imageUrl,setImageUrl] = useState('')


  useEffect(() => {
    getImages()
  }, [])
  

  const handleClick = () => {
    navigate("/product/" + props.product.id, {state: {imageUrl}})
  }

  const getImages = () => {

    listAll(imageListRef).then((res) => {
      res.items.forEach((item) => {
        let imageName = item.name.split(".")
        if (imageName[0] == props.product.id) {
          getDownloadURL(item).then((res) => {
            setImageUrl(res)
          })
        }
      })
    });
  };


  return (
    <div>
      <div className="card-container" onClick={handleClick}>
        <div className="card-image">
          <img
            src={imageUrl}
            alt=""
          />
        </div>
        <div className="product-info">
            <h3 className="product-name">{props.product.name}</h3>
            <div className="product-price">${props.product.price}</div>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
