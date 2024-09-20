import Navbar from "./Components/Navbar/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Shop from "./Pages/Shop";
import Cart from "./Pages/Cart";
import Product from "./Pages/Product";
import Footer from "./Components/Footer/Footer";
import ShopCategory from "./Pages/ShopCategory";
import women_banner from "./Components/Assets/perfumeBanner.jpg";
import men_banner from "./Components/Assets/mensWatchBanner.jpg";
import kid_banner from "./Components/Assets/sunglassBanner.jpg";
import LoginSignup from "./Pages/LoginSignup";
import NotFound from "./Components/NotFound/NotFound";

export const backend_url = 'https://13.239.119.246:4000';
// export const backend_url = 'http://localhost:4000';
export const currency = '₹';

function App() {

  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Shop gender="all" />} />
          <Route path="/watches" element={<ShopCategory banner={men_banner} category="watch" />} />
          <Route path="/perfumes" element={<ShopCategory banner={women_banner} category="perfume" />} />
          <Route path="/sunglasses" element={<ShopCategory banner={kid_banner} category="sunglass" />} />
          <Route path='/product' element={<Product />}>
            <Route path=':productId' element={<Product />} />
          </Route>
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<LoginSignup/>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
