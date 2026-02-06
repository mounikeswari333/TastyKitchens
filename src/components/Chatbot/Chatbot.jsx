import React, { useState } from "react";
import "./Chatbot.css";

const defaultMessages = [
  {
    id: 1,
    sender: "bot",
    text: "Hi! Ask me for food suggestions or food info.",
  },
];

const qaList = [
  {
    keywords: ["suggest", "food", "items"],
    reply:
      "Here are some popular choices you might love: Biryani, Pizza, Burger, Dosa, Fried Rice, and Noodles.",
  },
  {
    keywords: ["suggest", "veg"],
    reply:
      "You can try Paneer Butter Masala, Veg Biryani, Masala Dosa, Veg Fried Rice, or Chole Bhature.",
  },
  {
    match: (text) =>
      text.includes("suggest") &&
      (text.includes("non-veg") ||
        text.includes("non veg") ||
        text.includes("nonveg")),
    reply:
      "Popular non-veg items include Chicken Biryani, Butter Chicken, Chicken Fried Rice, Mutton Curry, and Fish Fry.",
  },
  {
    keywords: ["popular", "dishes"],
    reply:
      "Customer favorites include Hyderabadi Biryani, Pizza, Burgers, Shawarma, and South Indian Meals.",
  },
  {
    keywords: ["suggest", "healthy"],
    reply:
      "Idli, Veg Salad, Grilled Chicken, Vegetable Soup, and Fruit Bowl are healthy options.",
  },
  {
    keywords: ["tell", "biryani"],
    reply:
      "Biryani is a flavorful rice dish cooked with aromatic spices and vegetables or meat. It is one of the most loved dishes.",
  },
  {
    keywords: ["tell", "pizza"],
    reply:
      "Pizza is an Italian dish with a baked base topped with cheese, vegetables, or meat. Perfect for quick cravings.",
  },
  {
    keywords: ["tell", "burger"],
    reply:
      "Burgers consist of a bun filled with a patty, vegetables, sauces, and cheese. They are filling and tasty.",
  },
  {
    keywords: ["suggest", "snacks"],
    reply:
      "You can try Samosa, French Fries, Pakoda, Sandwich, or Spring Rolls.",
  },
  {
    keywords: ["suggest", "beverages"],
    reply:
      "Cold Coffee, Milkshake, Fresh Lime Soda, and Fruit Juice are popular beverages.",
  },
  {
    keywords: ["breakfast", "suggest"],
    reply:
      "Idli, Dosa, Upma, Poha, or Bread Omelette are great breakfast options.",
  },
  {
    keywords: ["lunch", "suggest"],
    reply:
      "Veg Meals, Chicken Biryani, Dal Rice, or Fried Rice are good lunch choices.",
  },
  {
    keywords: ["dinner", "suggest"],
    reply: "Chapati with Curry, Dosa, or Soup are perfect dinner options.",
  },
];

const unsupportedKeywords = [
  "order",
  "delivery",
  "deliveries",
  "refund",
  "refunds",
  "payment",
  "payments",
  "login",
  "account",
  "track",
  "tracking",
];

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState(defaultMessages);

  const toggleChat = () => {
    setIsOpen((prev) => !prev);
  };

  const addMessage = (sender, text) => {
    setMessages((prev) => [
      ...prev,
      { id: Date.now() + Math.random(), sender, text },
    ]);
  };

  const getBotReply = (message) => {
    const normalized = message.toLowerCase();

    const isUnsupported = unsupportedKeywords.some((keyword) =>
      normalized.includes(keyword),
    );
    if (isUnsupported) {
      return "Our team will reach out to you soon.";
    }

    const matched = qaList.find((item) => {
      if (item.match) {
        return item.match(normalized);
      }

      return item.keywords.every((keyword) => normalized.includes(keyword));
    });
    if (matched) {
      return matched.reply;
    }

    return "I can help you with food suggestions and food information. Our team will reach out to you soon.";
  };

  const handleSend = () => {
    const trimmed = inputValue.trim();
    if (!trimmed) {
      return;
    }

    addMessage("user", trimmed);
    setInputValue("");

    const reply = getBotReply(trimmed);
    addMessage("bot", reply);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="chatbot">
      <button type="button" className="chatbot-toggle" onClick={toggleChat}>
        AI
      </button>

      <div className={`chatbot-window ${isOpen ? "open" : ""}`}>
        <div className="chatbot-header">
          <div>
            <h3>Foodie Bot</h3>
            <p>Quick food tips</p>
          </div>
          <button type="button" onClick={toggleChat} className="chatbot-close">
            x
          </button>
        </div>

        <div className="chatbot-messages">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`chatbot-message ${message.sender}`}
            >
              {message.text}
            </div>
          ))}
        </div>

        <div className="chatbot-input">
          <input
            type="text"
            placeholder="Ask about food..."
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button type="button" onClick={handleSend}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
