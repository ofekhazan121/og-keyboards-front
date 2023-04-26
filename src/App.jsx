import "./index.scss";
import ProductManagement from "./pages/ProductManagement.jsx";
import LoginPage from "./pages/LoginPage";
import Navbar from "./components/Navbar";
import SearchResults from "./components/SearchResults";
import {HomePage} from "./pages/HomePage";
import {UserContext} from "./UserContext";
import {useCookies} from 'react-cookie';
import {Route, Routes, Navigate} from "react-router-dom"
import SignUp from "./components/SignUp";
import Keyboards from "./pages/Keyboards";
import Switches from "./pages/Switches";
import Keycaps from "./pages/Keycaps";
import Accessories from "./pages/Accessories";
import ProductPage from "./pages/ProductPage";
import Cart from "./pages/Cart";
import UserProfile from "./pages/UserProfile.jsx";
import CartProvider from "./context/CartContext.jsx";
import Contact from "./pages/Contact.jsx";
import Orders from "./pages/Orders.jsx";
import ViewAllOrders from "./components/ViewAllOrders.jsx";
import OrderUpdate from "./components/OrderUpdate.jsx";
import AddProduct from "./components/AddProduct.jsx";
import UpdateProducts from "./components/UpdateProducts.jsx";
import Footer from "./components/Footer.jsx";
import AboutUs from "./components/AboutUs.jsx";

function App() {
    const [cookies] = useCookies(['user'])

    const Redirect = () => {
        return (<div><span> wrong page 3 sec to redirect... <Navigate replace to={"/"}/>  </span></div>)
    };

    return (
        <main>
            <CartProvider>
                <UserContext.Provider value={cookies.user}>
                    <Navbar/>
                    <Routes>
                        <Route path={"/"} element={<HomePage/>}/>
                        <Route path={"/login"} element={<LoginPage/>}/>
                        <Route path={"/searchResults"} element={<SearchResults/>}/>
                        <Route path={"/productManagement"} element={<ProductManagement/>}/>
                        <Route path={"/signup"} element={<SignUp/>}/>
                        <Route path={"/keyboards"} element={<Keyboards/>}/>
                        <Route path={"/accessories"} element={<Accessories/>}/>
                        <Route path={"/switches"} element={<Switches/>}/>
                        <Route path={"/keycaps"} element={<Keycaps/>}/>
                        <Route path={"/product/*"} element={<ProductPage/>}/>
                        <Route path={"/orderUpdate/*"} element={<OrderUpdate/>} />
                        <Route path={"/cart"} element={<Cart/>}/>
                        <Route path={"/userProfile"} element={<UserProfile/>}/>
                        <Route path={"/contactSupport"} element={<Contact/>}/>
                        <Route path={"/viewOrders"} element={<Orders />}/>
                        <Route path={"/viewAllOrders"} element={<ViewAllOrders/>}/>
                        <Route path={"/addProduct"} element={<AddProduct/>}/>
                        <Route path={"/UpdateProducts"} element={<UpdateProducts/>}/>
                        <Route path={"/about"} element={<AboutUs/>}/>
                        <Route path={"*"} element={<Redirect />}/>
                    </Routes>
                    <Footer />
                </UserContext.Provider>
            </CartProvider>
        </main>
    );
}

export default App;
