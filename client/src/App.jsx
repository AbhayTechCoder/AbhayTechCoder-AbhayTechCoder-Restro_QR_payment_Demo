import { Routes, Route, useLocation } from "react-router-dom";
import { Navbar } from "./Components/Navbar";
import { Home } from "./pages/Home";
import { Veg } from "./pages/Veg";
import { NonVeg } from "./pages/Non-veg";
import { Chat } from "./pages/Chat";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import OwnerDashboard from "./pages/OwnerDashboard";
import { ManageDishes } from "./Components/owner/ManageDishes";
import { AllOrdersList } from "./Components/owner/AllOrdersList";
import { PostDishes } from "./Components/owner/PostDish";
import { PendingOrders } from "./Components/owner/PendingOrders";
import { CompletedOrders } from "./Components/owner/CompletedOrders";
import { PaymentSettings } from "./Components/owner/PaymentSettings";
// import OrderSidebar from "./Components/OrderSidebar";
import {OrderSidebar}  from "./Components/OrderSidebar";
import "./index.css";

function App() {
  const location = useLocation();

  // Sidebar sirf in routes par dikhega
  const showSidebarRoutes = ["/", "/veg", "/nonveg"];
  const shouldShowSidebar = showSidebarRoutes.includes(location.pathname);

  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/veg" element={<Veg />} />
        <Route path="/nonveg" element={<NonVeg />} />

        <Route path="/chat" element={<Chat />} />
        <Route path="/history" element={<h2>Order History</h2>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/owner" element={<OwnerDashboard />}>
          <Route index element={<AllOrdersList />} />
          <Route path="all" element={<AllOrdersList />} />
          <Route path="pending" element={<PendingOrders />} />
          <Route path="completed" element={<CompletedOrders />} />
          <Route path="post-dish" element={<PostDishes />} />
          <Route path="manage-dishes" element={<ManageDishes />} />
          <Route path="payment-settings" element={<PaymentSettings />} />
        </Route>
      </Routes>

      {/* Sidebar only on customer pages */}
      {shouldShowSidebar && <OrderSidebar />}
    </>
  );
}

export default App;