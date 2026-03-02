import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const Login = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const res = await fetch("${import.meta.env.VITE_API_URL}/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify(formData),
        });

        const data = await res.json();
        console.log(data);

        if (res.ok) {
            navigate("/");
            window.location.reload();
        } else {
            alert(data.message);
        }
    };

    return (
        <div className="container auth-container">
            <div className="auth-card">
                <h2>Login</h2>

                <form onSubmit={handleSubmit}>
                    <div className="neu-inset auth-input">
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter Email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="neu-inset auth-input">
                        <input
                            type="password"
                            name="password"
                            placeholder="Enter Password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <button type="submit" className="neu-button auth-btn">
                        Login
                    </button>
                </form>

                <p className="auth-switch">
                    Don’t have an account?{" "}
                    <Link to="/register">Register</Link>
                </p>
            </div>
        </div>
    );
};