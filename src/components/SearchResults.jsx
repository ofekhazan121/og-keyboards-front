import React, { useState } from "react";
import ProductCard from "./ProductCard";
import axios from "axios";
import { useEffect } from "react";
import "../styles/searchResults.scss";
import ImagesContextProvider, {
  useImagesContext,
} from "../context/ImagesContext";

const SearchResults = (props) => {
  const [products, setProducts] = useState([]);
  const [val, setVal] = useState();
  const { images, setImages, updateImages } = useImagesContext();
  const [loading,setLoading] = useState(true)

  useEffect(() => {
      getProducts()

  }, []);  

  const getProducts = async () => {
    axios
      .post("http://localhost:8080/product/filter", { type: props.val })
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.log("There Was an error!", error);
      });
  };

  return (
    <div className="product-results">
      {products.map((product, i) => (
        <ProductCard product={product} key={i}/>
      ))}
    </div>
  );
};

export default SearchResults;
