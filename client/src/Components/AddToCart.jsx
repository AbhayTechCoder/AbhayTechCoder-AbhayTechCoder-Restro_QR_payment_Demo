


/* ================= ADD TO CART FUNCTION ================= */

const addToCart = (dish) => {
    setCartItems(prev => {
        const existingItem = prev.find(
            item => item._id === dish._id
        );

        if (existingItem) {
            return prev.map(item =>
                item._id === dish._id
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            );
        }

        return [...prev, { ...dish, quantity: 1 }];
    });
};

{/* ================= FIXED SIDEBAR ================= */ }
<OrderSidebar
    cartItems={cartItems}
    setCartItems={setCartItems}
    tableNumber={tableNumber}
    setTableNumber={setTableNumber}
/>
