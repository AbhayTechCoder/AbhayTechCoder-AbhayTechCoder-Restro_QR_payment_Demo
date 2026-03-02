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
                // 👇 Same item found → increase quantity
                return prev.map(i =>
                    i._id === item._id
                        ? { ...i, quantity: i.quantity + 1 }
                        : i
                );
            }

            // 👇 New item → add with quantity 1
            return [...prev, { ...item, quantity: 1 }];
        });
    };

    // INCREASE
    const increaseQty = (id) => {
        setCartItems(prev =>
            prev.map(item =>
                item._id === id
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            )
        );
    };

    // DECREASE
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

    const totalAmount = cartItems.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
    );

    return (
        <CartContext.Provider
            value={{
                cartItems,
                tableNumber,
                setTableNumber,
                addToCart,
                increaseQty,
                decreaseQty,
                totalAmount
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);