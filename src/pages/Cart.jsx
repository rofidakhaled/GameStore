import React, { useState } from 'react';
import { FaTrash, FaCreditCard, FaPaypal, FaGift } from 'react-icons/fa';
import '../styles/Cart.css';

const Cart = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      title: 'Cyberpunk 2077',
      image: 'https://via.placeholder.com/150',
      price: 59.99,
      originalPrice: 59.99,
      discount: 0,
    },
    {
      id: 2,
      title: 'Red Dead Redemption 2',
      image: 'https://via.placeholder.com/150',
      price: 39.99,
      originalPrice: 59.99,
      discount: 33,
    },
    {
      id: 3,
      title: 'Elden Ring',
      image: 'https://via.placeholder.com/150',
      price: 49.99,
      originalPrice: 59.99,
      discount: 17,
    },
  ]);

  const [promoCode, setPromoCode] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('credit-card');

  const removeFromCart = (itemId) => {
    setCartItems(cartItems.filter(item => item.id !== itemId));
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + item.price, 0);
  };

  const calculateTax = () => {
    return calculateSubtotal() * 0.1; // 10% tax
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax();
  };

  return (
    <div className="cart-container">
      <main className="cart-main">
        <div className="cart-header">
          <h1>Shopping Cart</h1>
          <p>{cartItems.length} items in your cart</p>
        </div>

        <div className="cart-content">
          <div className="cart-items">
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <img src={item.image} alt={item.title} className="item-image" />
                <div className="item-details">
                  <h3>{item.title}</h3>
                  <div className="item-price">
                    <span className="current-price">${item.price.toFixed(2)}</span>
                    {item.discount > 0 && (
                      <>
                        <span className="original-price">
                          ${item.originalPrice.toFixed(2)}
                        </span>
                        <span className="discount-badge">-{item.discount}%</span>
                      </>
                    )}
                  </div>
                </div>
                <button
                  className="remove-button"
                  onClick={() => removeFromCart(item.id)}
                >
                  <FaTrash />
                </button>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <div className="summary-section">
              <h2>Payment Method</h2>
              <div className="payment-methods">
                <label className={`payment-method ${paymentMethod === 'credit-card' ? 'active' : ''}`}>
                  <input
                    type="radio"
                    name="payment"
                    value="credit-card"
                    checked={paymentMethod === 'credit-card'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <FaCreditCard />
                  <span>Credit Card</span>
                </label>
                <label className={`payment-method ${paymentMethod === 'paypal' ? 'active' : ''}`}>
                  <input
                    type="radio"
                    name="payment"
                    value="paypal"
                    checked={paymentMethod === 'paypal'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <FaPaypal />
                  <span>PayPal</span>
                </label>
                <label className={`payment-method ${paymentMethod === 'gift-card' ? 'active' : ''}`}>
                  <input
                    type="radio"
                    name="payment"
                    value="gift-card"
                    checked={paymentMethod === 'gift-card'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <FaGift />
                  <span>Gift Card</span>
                </label>
              </div>
            </div>

            <div className="summary-section">
              <h2>Promo Code</h2>
              <div className="promo-input">
                <input
                  type="text"
                  placeholder="Enter promo code"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                />
                <button className="apply-button">Apply</button>
              </div>
            </div>

            <div className="summary-section">
              <h2>Order Summary</h2>
              <div className="summary-details">
                <div className="summary-row">
                  <span>Subtotal</span>
                  <span>${calculateSubtotal().toFixed(2)}</span>
                </div>
                <div className="summary-row">
                  <span>Tax (10%)</span>
                  <span>${calculateTax().toFixed(2)}</span>
                </div>
                <div className="summary-row total">
                  <span>Total</span>
                  <span>${calculateTotal().toFixed(2)}</span>
                </div>
              </div>
            </div>

            <button className="checkout-button">
              Proceed to Checkout
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Cart;
