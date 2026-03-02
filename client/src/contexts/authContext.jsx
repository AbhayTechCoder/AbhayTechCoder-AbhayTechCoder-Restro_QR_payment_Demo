import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [me, setMe] = useState(null);
  const [allUsers, setAllUsers] = useState(null);
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  const BASE_URL = import.meta.env.VITE_API_URL;

  const fetchMe = async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/users/me`, {
        credentials: "include",
      });

      const data = await res.json();

      if (res.ok) {
        setMe(data);
      }
    } catch (error) {
      console.log("Me fetch error");
    }
  };

  const fetchAllUser = async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/users/getusers`, {
        credentials: "include",
      });

      const data = await res.json();

      if (res.ok) {
        setAllUsers(data);
      }
    } catch (error) {
      console.log("All users fetch error");
    }
  };

  const fetchAdmin = async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/users/getAdmin`, {
        credentials: "include",
      });

      const data = await res.json();

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
      const res = await fetch(`${BASE_URL}/api/auth/logout`, {
        method: "POST",
        credentials: "include",
      });

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
    fetchMe();
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