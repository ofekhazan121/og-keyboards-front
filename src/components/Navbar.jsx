import React, { useState, useEffect } from "react";
import "../styles/navbar.scss";
import { Link, useNavigate } from "react-router-dom";
import {
  AiOutlineClose,
  AiOutlineMenu,
  AiOutlineShoppingCart,
  AiOutlineUser,
} from "react-icons/ai";
import SearchResults from "./SearchResults";
import AsyncSelect from "react-select/async";
import axios from "axios";
import logo from '../assets/logo_short.png';
import {useCookies} from "react-cookie";



function Navbar() {
  const [nav, setNav] = useState(false);
  const [products, setProducts] = useState([]);
  const [val, setVal] = useState({
    name: "",
  });
  const [search,setSearch] = useState()
  const navigate = useNavigate();
  const [cookies] = useCookies();


  useEffect(() => {
    const getProducts = async () => {
      await axios
      .post("http://localhost:8080/product/getByName", { name: search })
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.log("There Was an error!", error);
      });
    }

    getProducts();
  },[search])

  const handleNav = () => {
    setNav(!nav);
  };

  const loadProductList = (searchValue, callback) => {
      setSearch(searchValue)
      const filteredOptions = products.map(({ name, id }) => {
        return { value: name, label: name, id: id }
      });
      callback(filteredOptions);
  };

  const handleChange = (selectedOption) => {
    const getSpecs = async() => {
      const response = await axios.post("http://localhost:8080/product/getProduct",
          { id :selectedOption.id })
    }
    
    getSpecs();
    console.log("handleChange", selectedOption);
    console.log(selectedOption.id);

    navigate("/product/" + selectedOption.id)

  };

  const colorStyles = {
    control: (styles) => ({...styles, backgroundColor: "#f6f3f7" })
  }

  return (
    <div>
      <nav>
        <div id="navbar-links" className="navbar-section" onClick={handleNav}>
          {nav ? (
            <AiOutlineClose size={25} color={"#0e1116ff"} className="outline-close"/>
          ) : (
            <AiOutlineMenu size={25} color={"#616283ff"} />
          )}
        </div>
        <div id="navbar-logo" className="navbar-section">
          <Link to={"/"}><img src={logo}/></Link>
        </div>
        <div id="navbar-search" className="navbar-section">
          <AsyncSelect
            className="search-bar"
            styles={colorStyles}
            value={val.name}
            loadOptions={loadProductList}
            onChange={handleChange}
            placeholder="search..."
            openMenuOnClick={false}
          />
        </div>
        <div id="navbar-cart" className="navbar-section">
          <Link to={"/cart"}><AiOutlineShoppingCart size={25} color={"#616283ff"} /></Link>
        </div>
        <div id="navbar-login" className="navbar-section">
          <Link to={"/userProfile"}><AiOutlineUser size={25} color={"#616283ff"}/></Link>
        </div>
      </nav>
      <div className={nav ? "burger-open" : "burger-close"}>
        <div className="burger-links">
          <Link to={"/keyboards"}>Keyboards</Link>
          <Link to={"/keycaps"}>Keycaps</Link>
          <Link to={"/switches"}>Switches</Link>
          <Link to={"/accessories"}>Accessories & Tools</Link>
          { cookies.jwt ? <Link to={"/userProfile"}>Profile</Link> : <Link to={"/userProfile"}>Sign In</Link>}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
