import { NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { useAuth } from "../contexts/authContext";

export const Navbar = () => {
    const { me, logout } = useAuth();
    const navigate = useNavigate();


    const handleLogout = async () => {
        logout();
        navigate("/login");
    };

    return (
        <header className="neu-header">
            <div className="logo-container">
                <img
                    src="https://th.bing.com/th/id/OIP.wdFggtlZsQyPMVRP1LaqXAHaHa?rs=1&pid=ImgDetMain"
                    alt="Delicious Bites"
                    className="logo"
                />
                <h1>Delicious Bites</h1>
            </div>

            <div className="header-actions">

                <NavLink
                    to="/"
                    end
                    className={({ isActive }) =>
                        `neu-button ${isActive ? "active" : ""}`
                    }
                >
                    All
                </NavLink>

                <NavLink
                    to="/veg"
                    className={({ isActive }) =>
                        `neu-button ${isActive ? "active" : ""}`
                    }
                >
                    Veg
                </NavLink>

                <NavLink
                    to="/nonveg"
                    className={({ isActive }) =>
                        `neu-button ${isActive ? "active" : ""}`
                    }
                >
                    Non-Veg
                </NavLink>

                {/* Only show Chat if logged in */}
                {me && (
                    <NavLink
                        to="/chat"
                        className={({ isActive }) =>
                            `neu-button ${isActive ? "active" : ""}`
                        }
                    >
                        Chat
                    </NavLink>
                )}

                {me && (
                    <NavLink
                        to="/history"
                        className={({ isActive }) =>
                            `neu-button ${isActive ? "active" : ""}`
                        }
                    >
                        History
                    </NavLink>
                )}

                 {
                    me && me.role === "admin" && (
                        <NavLink
                            to="/owner"
                            className={({ isActive }) =>
                                `neu-button ${isActive ? "active" : ""}`
                            }
                        >
                            Admin
                        </NavLink>
                    )
                }


                {/* If NOT logged in */}
                {!me && (
                    <>
                        <NavLink
                            to="/login"
                            className={({ isActive }) =>
                                `neu-button ${isActive ? "active" : ""}`
                            }
                        >
                            Login
                        </NavLink>

                        <NavLink
                            to="/register"
                            className={({ isActive }) =>
                                `neu-button ${isActive ? "active" : ""}`
                            }
                        >
                            Register
                        </NavLink>
                    </>
                )}

                {/* If Logged In */}
                {me && (
                    <button onClick={handleLogout} className="neu-button">
                        Logout
                    </button>
                )}

            </div>
        </header>
    );
};