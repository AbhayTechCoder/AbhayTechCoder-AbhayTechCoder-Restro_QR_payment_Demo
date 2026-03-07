import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {

    const [cartItems, setCartItems] = useState([]);
    const [tableNumber, setTableNumber] = useState("");

    // ADD TO CART
    const addToCart = (item) => {
        setCartItems(prev => {

            const existingItem = prev.find(i => i._id === item._id);

            if (existingItem) {
                return prev.map(i =>
                    i._id === item._id
                        ? { ...i, quantity: i.quantity + 1 }
                        : i
                );
            }

            return [...prev, { ...item, quantity: 1 }];
        });
    };

    // INCREASE QTY
    const increaseQty = (id) => {
        setCartItems(prev =>
            prev.map(item =>
                item._id === id
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            )
        );
    };

    // DECREASE QTY
    const decreaseQty = (id) => {
        setCartItems(prev =>
            prev
                .map(item =>
                    item._id === id
                        ? { ...item, quantity: item.quantity - 1 }
                        : item
                )
                .filter(item => item.quantity > 0)
        );
    };

    // TOTAL AMOUNT
    const totalAmount = cartItems.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
    );

    // ✅ CLEAR CART (Payment ke baad use hoga)
    const clearCart = () => {
        setCartItems([]);
        setTableNumber("");
    };

    return (
        <CartContext.Provider
            value={{
                cartItems,
                tableNumber,
                setTableNumber,
                addToCart,
                increaseQty,
                decreaseQty,
                totalAmount,
                clearCart   // 👈 important
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);