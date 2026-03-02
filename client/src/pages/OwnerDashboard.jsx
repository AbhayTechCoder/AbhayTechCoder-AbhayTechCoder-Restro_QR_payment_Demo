// pages/OwnerDashboard.jsx
import { NavLink, Outlet } from "react-router-dom";
import OwnerHeader from "../Components/owner/OwnerHeader";

const OwnerDashboard = () => {
    return (
        <div className="container">
            <OwnerHeader />

            {/* 🔹 Owner Navbar */}
            <div className="owner-nav">
                <NavLink to="all" className="owner-link">All</NavLink>
                <NavLink to="pending" className="owner-link">Pending</NavLink>
                <NavLink to="completed" className="owner-link">Completed</NavLink>
                <NavLink to="post-dish" className="owner-link">Post Dish</NavLink>
                <NavLink to="manage-dishes" className="owner-link">Manage Dishes</NavLink>
                <NavLink to="payment-settings" className="owner-link">Payment Settings</NavLink>
            </div>

            {/* 🔹 Page Load Area */}
            <div className="owner-content">
                <Outlet />
            </div>
        </div>
    );
};

export default OwnerDashboard;