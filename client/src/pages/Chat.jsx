import { useState, useRef, useEffect } from "react";
import { useAuth } from "../contexts/authContext";

export const Chat = () => {
  const { user, loading } = useAuth();
  const [messages, setMessages] = useState([]);
  const [newMsg, setNewMsg] = useState("");
  const [editingId, setEditingId] = useState(null);

  const textareaRef = useRef(null);

  useEffect(() => {
    if (!user) return;

    const fetchMessages = async () => {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/users/message`,
        { credentials: "include" }
      );
      const data = await res.json();
      if (data.success) setMessages(data.messages);
    };

    fetchMessages();
  }, [user]);

  const handleSend = async () => {
    if (!newMsg.trim()) return;

    if (editingId) {
      // 🔥 UPDATE
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/users/message/${editingId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ text: newMsg }),
        }
      );

      const data = await res.json();
      if (data.success) {
        setMessages((prev) =>
          prev.map((msg) =>
            msg._id === editingId ? data.data : msg
          )
        );
        setEditingId(null);
      }
    } else {
      // 🔥 SEND
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/users/message`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ text: newMsg }),
        }
      );

      const data = await res.json();
      if (data.success) {
        setMessages((prev) => [...prev, data.data]);
      }
    }

    setNewMsg("");

    // Reset textarea height
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  };

  const handleDelete = async (id) => {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/api/users/message/${id}`,
      {
        method: "DELETE",
        credentials: "include",
      }
    );

    const data = await res.json();
    if (data.success) {
      setMessages((prev) =>
        prev.filter((msg) => msg._id !== id)
      );
    }
  };

  const formatTime = (date) =>
    new Date(date).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

  if (loading) return <p>Loading...</p>;

  return (
    <div className="chat-container container">
      <div className="chat-messages">
        {messages.map((msg) => {
          const senderId =
            typeof msg.sender === "object"
              ? msg.sender._id
              : msg.sender;

          const isMine = senderId === user._id;

          return (
            <div
              key={msg._id}
              className={`chat-message ${isMine ? "right" : "left"}`}
            >
              <div className="bubble">
                <p>{msg.text}</p>
                <div className="meta">
                  {msg.edited && <span>edited • </span>}
                  {formatTime(msg.createdAt)}
                </div>

                {isMine && (
                  <div className="actions">
                    <button onClick={() => {
                      setNewMsg(msg.text);
                      setEditingId(msg._id);
                    }}>
                      Edit
                    </button>

                    <button onClick={() => handleDelete(msg._id)}>
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="chat-input">
        <textarea
          ref={textareaRef}
          className="chat-textarea"
          value={newMsg}
          onChange={(e) => {
            setNewMsg(e.target.value);

            const el = textareaRef.current;
            el.style.height = "auto";

            const maxHeight = 120; // 5 rows
            el.style.height = Math.min(el.scrollHeight, maxHeight) + "px";
          }}
          placeholder="Type a message..."
        />
        <button onClick={handleSend}>
          {editingId ? "Update" : "Send"}
        </button>
      </div>
    </div>
  );
};