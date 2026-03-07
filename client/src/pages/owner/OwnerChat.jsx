import { useState, useEffect } from "react";

const OwnerChat = () => {

    const [users, setUsers] = useState([]);
    const [messages, setMessages] = useState([]);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [order, setOrder] = useState(null);

    const API = import.meta.env.VITE_API_URL;

    /* ================= LOAD ALL CHAT USERS ================= */

    useEffect(() => {

        const loadMessages = async () => {

            const res = await fetch(`${API}/api/users/admin/messages`, {
                credentials: "include"
            });

            const data = await res.json();

            if (!data.success) return;

            const grouped = {};

            data.messages.forEach(msg => {

                const senderId =
                    typeof msg.sender === "object"
                        ? msg.sender._id
                        : msg.sender;

                const receiverId =
                    typeof msg.receiver === "object"
                        ? msg.receiver._id
                        : msg.receiver;

                const customerId =
                    msg.sender.role === "admin"
                        ? receiverId
                        : senderId;

                if (!grouped[customerId]) {
                    grouped[customerId] = [];
                }

                grouped[customerId].push(msg);

            });

            const list = Object.keys(grouped).map(id => ({

                userId: id,

                username:
                    grouped[id].find(m => m.sender.role !== "admin")?.sender.username
                    || "Customer",

                messages: grouped[id]

            }));

            setUsers(list);

        };

        loadMessages();

    }, []);

    /* ================= SELECT USER ================= */

    const selectUser = async (user) => {

        setSelectedUserId(user.userId);
        setMessages(user.messages);

    };

    return (

        <div className="owner-chat-layout">

            {/* USERS */}

            <div className="chat-users">

                <h3>Customers</h3>

                {users.map(user => (

                    <div
                        key={user.userId}
                        className="chat-user"
                        onClick={() => selectUser(user)}
                    >
                        {user.username}
                    </div>

                ))}

            </div>

            {/* CHAT WINDOW */}

            <div className="chat-window">

                {selectedUserId ? (

                    messages
                        .filter(msg => {

                            const senderId =
                                typeof msg.sender === "object"
                                    ? msg.sender._id
                                    : msg.sender;

                            const receiverId =
                                typeof msg.receiver === "object"
                                    ? msg.receiver._id
                                    : msg.receiver;

                            return (
                                senderId === selectedUserId ||
                                receiverId === selectedUserId
                            );

                        })
                        .map(msg => {

                            const senderId =
                                typeof msg.sender === "object"
                                    ? msg.sender._id
                                    : msg.sender;

                            const isCustomer = senderId === selectedUserId;

                            return (

                                <div
                                    key={msg._id}
                                    className={`chat-msg ${isCustomer ? "left" : "right"}`}
                                >

                                    <p>{msg.text}</p>

                                    <span>
                                        {new Date(msg.createdAt).toLocaleTimeString()}
                                    </span>

                                </div>

                            );

                        })

                ) : (

                    <p>Select a customer</p>

                )}

            </div>

            {/* ORDER PANEL */}

            <div className="order-panel">

                {order ? (

                    <>
                        <h3>Order Info</h3>

                        <p><b>Email:</b> {order.email}</p>

                        <p><b>Table:</b> {order.tableNumber}</p>

                        <p><b>Total:</b> ₹{order.totalAmount}</p>

                        <p><b>Status:</b> {order.status}</p>

                        <p>
                            <b>Time:</b>{" "}
                            {new Date(order.createdAt).toLocaleString()}
                        </p>
                    </>

                ) : (

                    <p>No order selected</p>

                )}

            </div>

        </div>

    );

};

export default OwnerChat;