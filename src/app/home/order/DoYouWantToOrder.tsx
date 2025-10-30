"use client";

import React, { useState } from "react";

// Define TypeScript interfaces
interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
}

interface OrderItem extends MenuItem {
  quantity: number;
}

interface CustomerInfo {
  name: string;
  email: string;
  phone: string;
  address: string;
  specialInstructions: string;
}

const DoYouWantToOrder = () => {
  const [order, setOrder] = useState<OrderItem[]>([]);
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    name: "",
    email: "",
    phone: "",
    address: "",
    specialInstructions: "",
  });
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [hoverStates, setHoverStates] = useState<{
    menuItems: { [key: number]: boolean };
    buttons: { [key: string]: boolean };
  }>({
    menuItems: {},
    buttons: {},
  });

  const menuItems: MenuItem[] = [
    {
      id: 1,
      name: "Truffle Caviar Symphony",
      description: "Imperial beluga caviar with gold leaf and truffle essence",
      price: 285,
      category: "Appetizer",
      image: "🍽️",
    },
    {
      id: 2,
      name: "Wagyu Beef Wellington",
      description: "A5 Japanese wagyu wrapped in puff pastry with foie gras",
      price: 195,
      category: "Main Course",
      image: "🥩",
    },
    {
      id: 3,
      name: "Lobster Thermidor",
      description: "Maine lobster in brandy cream sauce with black truffle",
      price: 165,
      category: "Main Course",
      image: "🦞",
    },
    {
      id: 4,
      name: "Golden Opulence Sundae",
      description: "Tahitian vanilla bean ice cream with 23k gold flakes",
      price: 125,
      category: "Dessert",
      image: "🍨",
    },
    {
      id: 5,
      name: "Dom Pérignon Pairing",
      description: "Vintage champagne flight with artisan cheeses",
      price: 350,
      category: "Beverage",
      image: "🍾",
    },
  ];

  const addToOrder = (item: MenuItem) => {
    const existingItem = order.find((orderItem) => orderItem.id === item.id);
    if (existingItem) {
      setOrder(
        order.map((orderItem) =>
          orderItem.id === item.id
            ? { ...orderItem, quantity: orderItem.quantity + 1 }
            : orderItem
        )
      );
    } else {
      setOrder([...order, { ...item, quantity: 1 }]);
    }
  };

  const removeFromOrder = (itemId: number) => {
    setOrder(order.filter((item) => item.id !== itemId));
  };

  const updateQuantity = (itemId: number, newQuantity: number) => {
    if (newQuantity === 0) {
      removeFromOrder(itemId);
    } else {
      setOrder(
        order.map((item) =>
          item.id === itemId ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  const getTotalPrice = (): number => {
    return order.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setCustomerInfo({
      ...customerInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentStep(3);
    console.log("Order submitted:", { order, customerInfo });
  };

  const handleMouseEnter = (
    type: "menuItems" | "buttons",
    id: number | string
  ) => {
    setHoverStates((prev) => ({
      ...prev,
      [type]: { ...prev[type], [id]: true },
    }));
  };

  const handleMouseLeave = (
    type: "menuItems" | "buttons",
    id: number | string
  ) => {
    setHoverStates((prev) => ({
      ...prev,
      [type]: { ...prev[type], [id]: false },
    }));
  };

  return (
    <div className="restaurant-order-container">
      {/* Add font imports */}
      <style jsx>{`
        @import url("https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Inter:wght@300;400;500;600&display=swap");
      `}</style>

      <div className="order-header">
        <h1 className="restaurant-name">ÉLÉGANCE</h1>
        <p className="restaurant-tagline">Michelin Star Dining Experience</p>
      </div>

      <div className="order-progress">
        <div className={`progress-step ${currentStep >= 1 ? "active" : ""}`}>
          <span>1</span>
          <p>Select Dishes</p>
        </div>
        <div className={`progress-step ${currentStep >= 2 ? "active" : ""}`}>
          <span>2</span>
          <p>Your Details</p>
        </div>
        <div className={`progress-step ${currentStep >= 3 ? "active" : ""}`}>
          <span>3</span>
          <p>Confirmation</p>
        </div>
      </div>

      <div className="order-content">
        {currentStep === 1 && (
          <div className="menu-section">
            <h2>Our Culinary Masterpieces</h2>
            <div className="menu-grid">
              {menuItems.map((item: MenuItem) => (
                <div
                  key={item.id}
                  className={`menu-item-card ${
                    hoverStates.menuItems[item.id] ? "hover" : ""
                  }`}
                  onMouseEnter={() => handleMouseEnter("menuItems", item.id)}
                  onMouseLeave={() => handleMouseLeave("menuItems", item.id)}
                >
                  <div className="item-image">{item.image}</div>
                  <div className="item-content">
                    <h3>{item.name}</h3>
                    <p className="item-description">{item.description}</p>
                    <div className="item-footer">
                      <span className="item-price">${item.price}</span>
                      <button
                        className={`add-to-order-btn ${
                          hoverStates.buttons[`add-${item.id}`] ? "hover" : ""
                        }`}
                        onClick={() => addToOrder(item)}
                        onMouseEnter={() =>
                          handleMouseEnter("buttons", `add-${item.id}`)
                        }
                        onMouseLeave={() =>
                          handleMouseLeave("buttons", `add-${item.id}`)
                        }
                      >
                        Add to Order
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {order.length > 0 && (
              <div className="order-summary-preview">
                <h3>Your Order Preview</h3>
                <div className="preview-items">
                  {order.map((item: OrderItem) => (
                    <div key={item.id} className="preview-item">
                      <span>
                        {item.name} x {item.quantity}
                      </span>
                      <span>${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
                <button
                  className={`proceed-btn ${
                    hoverStates.buttons["proceed"] ? "hover" : ""
                  }`}
                  onClick={() => setCurrentStep(2)}
                  onMouseEnter={() => handleMouseEnter("buttons", "proceed")}
                  onMouseLeave={() => handleMouseLeave("buttons", "proceed")}
                >
                  Proceed to Checkout
                </button>
              </div>
            )}
          </div>
        )}

        {currentStep === 2 && (
          <div className="checkout-section">
            <div className="checkout-grid">
              <form className="customer-form" onSubmit={handleSubmitOrder}>
                <h2>Delivery Information</h2>
                <div className="form-group">
                  <label>Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={customerInfo.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    value={customerInfo.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={customerInfo.phone}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Delivery Address</label>
                  <textarea
                    name="address"
                    value={customerInfo.address}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Special Instructions</label>
                  <textarea
                    name="specialInstructions"
                    value={customerInfo.specialInstructions}
                    onChange={handleInputChange}
                    placeholder="Dietary restrictions, delivery notes..."
                  />
                </div>
                <button type="submit" className="submit-order-btn">
                  Place Your Order
                </button>
              </form>

              <div className="order-details">
                <h3>Order Summary</h3>
                <div className="order-items">
                  {order.map((item: OrderItem) => (
                    <div key={item.id} className="order-item">
                      <div className="item-info">
                        <span className="item-name">{item.name}</span>
                        <div className="quantity-controls">
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                          >
                            -
                          </button>
                          <span>{item.quantity}</span>
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <span className="item-total">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="order-total">
                  <span>Total: ${getTotalPrice().toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div className="confirmation-section">
            <div className="confirmation-content">
              <div className="success-icon">✨</div>
              <h2>Order Confirmed!</h2>
              <p className="confirmation-message">
                Thank you for your order at ÉLÉGANCE. Your culinary experience
                is being prepared with the utmost care.
              </p>
              <div className="order-details-confirm">
                <h3>Order Details</h3>
                <p>
                  <strong>Order Number:</strong> #ELG-
                  {Math.random().toString(36).substr(2, 9).toUpperCase()}
                </p>
                <p>
                  <strong>Estimated Delivery:</strong> 45-60 minutes
                </p>
                <p>
                  <strong>Total:</strong> ${getTotalPrice().toFixed(2)}
                </p>
              </div>
              <button
                className="new-order-btn"
                onClick={() => {
                  setOrder([]);
                  setCurrentStep(1);
                }}
              >
                Start New Order
              </button>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .restaurant-order-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 2rem;
          min-height: 100vh;
          background: linear-gradient(135deg, #0c0c0c 0%, #1a1a1a 100%);
          color: #e8e8e8;
          font-family: "Inter", sans-serif;
        }

        .order-header {
          text-align: center;
          margin-bottom: 3rem;
          padding: 2rem 0;
          border-bottom: 1px solid #333;
        }

        .restaurant-name {
          font-family: "Playfair Display", serif;
          font-size: 4rem;
          font-weight: 700;
          background: linear-gradient(45deg, #d4af37, #ffd700, #f0e68c);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 0.5rem;
        }

        .restaurant-tagline {
          font-size: 1.2rem;
          color: #b0b0b0;
          font-weight: 300;
          letter-spacing: 0.2em;
          text-transform: uppercase;
        }

        .order-progress {
          display: flex;
          justify-content: center;
          margin-bottom: 3rem;
          gap: 4rem;
        }

        .progress-step {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
        }

        .progress-step span {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background: #333;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          border: 2px solid #444;
          transition: all 0.3s ease;
        }

        .progress-step.active span {
          background: linear-gradient(45deg, #d4af37, #ffd700);
          color: #000;
          border-color: #d4af37;
        }

        .progress-step p {
          font-size: 0.9rem;
          color: #888;
        }

        .progress-step.active p {
          color: #d4af37;
        }

        .menu-section {
          margin-bottom: 3rem;
        }

        .menu-section h2 {
          font-family: "Playfair Display", serif;
          font-size: 2.5rem;
          text-align: center;
          margin-bottom: 2rem;
          color: #e8e8e8;
        }

        .menu-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 2rem;
          margin-bottom: 3rem;
        }

        .menu-item-card {
          background: linear-gradient(145deg, #1a1a1a, #2d2d2d);
          border-radius: 20px;
          padding: 1.5rem;
          border: 1px solid #333;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .menu-item-card::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 2px;
          background: linear-gradient(90deg, #d4af37, #ffd700);
        }

        .menu-item-card.hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 40px rgba(212, 175, 55, 0.1);
          border-color: #d4af37;
        }

        .item-image {
          font-size: 3rem;
          text-align: center;
          margin-bottom: 1rem;
        }

        .item-content h3 {
          font-family: "Playfair Display", serif;
          font-size: 1.4rem;
          margin-bottom: 0.5rem;
          color: #f0f0f0;
        }

        .item-description {
          color: #b0b0b0;
          font-size: 0.9rem;
          line-height: 1.5;
          margin-bottom: 1rem;
        }

        .item-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .item-price {
          font-size: 1.3rem;
          font-weight: 600;
          color: #d4af37;
        }

        .add-to-order-btn {
          background: linear-gradient(45deg, #d4af37, #ffd700);
          color: #000;
          border: none;
          padding: 0.75rem 1.5rem;
          border-radius: 25px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .add-to-order-btn.hover {
          transform: scale(1.05);
          box-shadow: 0 5px 15px rgba(212, 175, 55, 0.3);
        }

        .order-summary-preview {
          background: linear-gradient(145deg, #1a1a1a, #2d2d2d);
          border-radius: 15px;
          padding: 2rem;
          border: 1px solid #333;
          max-width: 500px;
          margin: 0 auto;
        }

        .order-summary-preview h3 {
          font-family: "Playfair Display", serif;
          margin-bottom: 1rem;
          color: #f0f0f0;
        }

        .preview-items {
          margin-bottom: 1.5rem;
        }

        .preview-item {
          display: flex;
          justify-content: space-between;
          padding: 0.5rem 0;
          border-bottom: 1px solid #333;
        }

        .proceed-btn {
          width: 100%;
          background: linear-gradient(45deg, #d4af37, #ffd700);
          color: #000;
          border: none;
          padding: 1rem 2rem;
          border-radius: 25px;
          font-weight: 600;
          font-size: 1.1rem;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .proceed-btn.hover {
          transform: scale(1.02);
          box-shadow: 0 5px 20px rgba(212, 175, 55, 0.4);
        }

        .checkout-grid {
          display: grid;
          grid-template-columns: 1fr 400px;
          gap: 3rem;
        }

        .customer-form {
          background: linear-gradient(145deg, #1a1a1a, #2d2d2d);
          padding: 2rem;
          border-radius: 20px;
          border: 1px solid #333;
        }

        .customer-form h2 {
          font-family: "Playfair Display", serif;
          margin-bottom: 1.5rem;
          color: #f0f0f0;
        }

        .form-group {
          margin-bottom: 1.5rem;
        }

        .form-group label {
          display: block;
          margin-bottom: 0.5rem;
          color: #d4af37;
          font-weight: 500;
        }

        .form-group input,
        .form-group textarea {
          width: 100%;
          padding: 0.75rem 1rem;
          background: #2d2d2d;
          border: 1px solid #444;
          border-radius: 10px;
          color: #e8e8e8;
          font-size: 1rem;
          transition: all 0.3s ease;
          font-family: inherit;
        }

        .form-group input:focus,
        .form-group textarea:focus {
          outline: none;
          border-color: #d4af37;
          box-shadow: 0 0 0 2px rgba(212, 175, 55, 0.1);
        }

        .form-group textarea {
          resize: vertical;
          min-height: 80px;
        }

        .submit-order-btn {
          width: 100%;
          background: linear-gradient(45deg, #d4af37, #ffd700);
          color: #000;
          border: none;
          padding: 1rem 2rem;
          border-radius: 25px;
          font-weight: 600;
          font-size: 1.1rem;
          cursor: pointer;
          transition: all 0.3s ease;
          margin-top: 1rem;
        }

        .submit-order-btn:hover {
          transform: scale(1.02);
          box-shadow: 0 5px 20px rgba(212, 175, 55, 0.4);
        }

        .order-details {
          background: linear-gradient(145deg, #1a1a1a, #2d2d2d);
          padding: 2rem;
          border-radius: 20px;
          border: 1px solid #333;
          height: fit-content;
        }

        .order-details h3 {
          font-family: "Playfair Display", serif;
          margin-bottom: 1.5rem;
          color: #f0f0f0;
        }

        .order-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem 0;
          border-bottom: 1px solid #333;
        }

        .item-info {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .quantity-controls {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .quantity-controls button {
          background: #333;
          border: none;
          color: #e8e8e8;
          width: 30px;
          height: 30px;
          border-radius: 50%;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .quantity-controls button:hover {
          background: #d4af37;
          color: #000;
        }

        .item-total {
          color: #d4af37;
          font-weight: 600;
        }

        .order-total {
          margin-top: 1.5rem;
          padding-top: 1rem;
          border-top: 2px solid #333;
          font-size: 1.3rem;
          font-weight: 600;
          text-align: right;
          color: #d4af37;
        }

        .confirmation-section {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 50vh;
        }

        .confirmation-content {
          text-align: center;
          background: linear-gradient(145deg, #1a1a1a, #2d2d2d);
          padding: 3rem;
          border-radius: 20px;
          border: 1px solid #333;
          max-width: 600px;
        }

        .success-icon {
          font-size: 4rem;
          margin-bottom: 1rem;
        }

        .confirmation-content h2 {
          font-family: "Playfair Display", serif;
          font-size: 2.5rem;
          margin-bottom: 1rem;
          color: #f0f0f0;
        }

        .confirmation-message {
          color: #b0b0b0;
          line-height: 1.6;
          margin-bottom: 2rem;
        }

        .order-details-confirm {
          background: #2d2d2d;
          padding: 1.5rem;
          border-radius: 15px;
          margin-bottom: 2rem;
          text-align: left;
        }

        .new-order-btn {
          background: linear-gradient(45deg, #d4af37, #ffd700);
          color: #000;
          border: none;
          padding: 1rem 2rem;
          border-radius: 25px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .new-order-btn:hover {
          transform: scale(1.05);
          box-shadow: 0 5px 15px rgba(212, 175, 55, 0.3);
        }

        /* Mobile Responsive */
        @media (max-width: 768px) {
          .restaurant-order-container {
            padding: 1rem;
          }

          .restaurant-name {
            font-size: 2.5rem;
          }

          .order-progress {
            gap: 1rem;
          }

          .menu-grid {
            grid-template-columns: 1fr;
          }

          .checkout-grid {
            grid-template-columns: 1fr;
          }

          .progress-step p {
            font-size: 0.8rem;
          }
        }
      `}</style>
    </div>
  );
};

export default DoYouWantToOrder;
