import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [me, setMe] = useState(null);       // logged-in user
    const [allUsers, setAllUsers] = useState(null);       // logged-in user
    const [admin, setAdmin] = useState(null);     // admin data
    const [loading, setLoading] = useState(true);


    const fetchMe = async () => {
        try {
            const res = await fetch("${import.meta.env.VITE_API_URL}/api/users/me", {
                credentials: "include",
            });

            const data = await res.json();
            // console.log("Fetched user:", data);

            if (res.ok) {
                setMe(data);
            }
        } catch (error) {
            console.log("Me fetch error");
        }
    };
    const fetchAllUser = async () => {
        try {
            const res = await fetch("${import.meta.env.VITE_API_URL}/api/users/getusers", {
                credentials: "include",
            });

            const data = await res.json();
            // console.log("Fetched all users:", data);

            if (res.ok) {
                setAllUsers(data);
            }
        } catch (error) {
            console.log("All users fetch error");
        }
    };



    const fetchAdmin = async () => {
        try {
            const res = await fetch("${import.meta.env.VITE_API_URL}/api/users/getAdmin", {
                credentials: "include",
            });

            const data = await res.json();
            // console.log("Fetched admin:", data);

            if (res.ok) {
                setAdmin(data.admin);
            }
        } catch (error) {
            console.log("Admin fetch error");
        } finally {
            setLoading(false);
        }
    };

    const logout = async () => {
        try {
            const res = await fetch(
                `${import.meta.env.VITE_API_URL}/api/auth/logout`,
                {
                    method: "POST",
                    credentials: "include",
                }
            );

            const data = await res.json();

            if (data.success) {
                setMe(null);
                setAdmin(null);
            }

        } catch (error) {
            console.log("Logout error");
        }
    };



    useEffect(() => {
        // Get Logged-in User
        fetchMe();
        // Get Admin
        fetchAdmin();

        fetchAllUser();
    }, []);


    return (
        <AuthContext.Provider
            value={{
                me,
                admin,
                allUsers,
                loading,
                logout,
                isCustomer: me?.role === "customer",
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};


export const useAuth = () => useContext(AuthContext);