import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProductPage from "./pages/ProductPage";
import CheckoutPage from "./pages/CheckoutPage";
import HomePage from "./pages/HomePage";
import CartPage from "./pages/CartPage";
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar";
import Box from "@mui/material/Box";
import OrderPage from "./pages/OrderPage";
import SuccessfulOrderPage from "./pages/SuccessfulOrderPage";

function App() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
      }}
    >
      <Router>
        <Sidebar />
        <Box sx={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/product/:kind" element={<ProductPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/order/:id" element={<OrderPage />} />
            <Route path="/success" element={<SuccessfulOrderPage />} />            
          </Routes>
        </Box>
        <Footer />
      </Router>
    </Box>
  );
}

export default App;
