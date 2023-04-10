import "./index.scss";
import Management from "./pages/Management";
import LoginPage from "./pages/LoginPage";
import Navbar from "./components/Navbar";
import SearchResults from "./components/SearchResults";
import { HomePage } from "./pages/HomePage";
import { UserContext } from "./UserContext";
import { useCookies } from 'react-cookie';
import { Route, Routes, Navigate } from "react-router-dom"
import SignUp from "./components/SignUp";
import Keyboards from "./pages/Keyboards";
import Switches from "./pages/Switches";
import Keycaps from "./pages/Keycaps";
import Accessories from "./pages/Accessories";
import ProductPage from "./pages/ProductPage";
import Cart from "./pages/Cart";

function App() {
  const [cookies] = useCookies(['user'])

  const Redirect = () => {
    return(<div><span> wrong page 3 sec to redirect... <Navigate replace to={"/"} />  </span></div>)
  };

  return (
    <main>
      <UserContext.Provider value={cookies.user}>
        <Navbar />
          <Routes>
            <Route path={"/"} element={<HomePage />} />
            <Route path={"/login"} element={<LoginPage />} /> 
            <Route path={"/searchResults"} element={<SearchResults/>} /> 
            <Route path={"/management"} element={<Management />} /> 
            <Route path={"/signup"} element={<SignUp/>}/>
            <Route path="/keyboards" element={<Keyboards/>}/>
            <Route path="/accessories" element={<Accessories/>}/>
            <Route path="/switches" element={<Switches/>}/>
            <Route path="/keycaps" element={<Keycaps/>}/>
            <Route path="/product/*" element={<ProductPage/>} />
            <Route path="/cart" element={<Cart/>}/>
          </Routes>
      </UserContext.Provider>
    </main>
  );
}

export default App;
