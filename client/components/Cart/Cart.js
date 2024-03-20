import React, { useState, useEffect } from "react";
import CartItem from "./CartItem/CartItem";
import axios from "axios";
import { useRouter } from "next/router";
import Link from "next/link";
import { useTheme } from "../../contexts/ThemeContext";
import styles from "./Cart.module.css";

export default function Cart() {
  const [authenticated, setAuthenticated] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartProducts, setCartProducts] = useState([]);
  const router = useRouter();
  const { theme } = useTheme();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const expirationTime = localStorage.getItem("expirationTime");
    const fetchCartItems = async () => {
      try {
        const response = await axios.get("http://localhost:4000/db/cart", {
          headers: {
            Authorization: token,
          },
        });
        setCartItems(response.data);
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };

    const fetchCartProducts = async (productId) => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/products/${productId}`
        );
        return response.data;
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    const fetchAllCartProducts = async () => {
      try {
        const productPromises = cartItems.map(fetchCartProducts);
        const products = await Promise.all(productPromises);
        setCartProducts(products);
      } catch (error) {
        console.error("Error fetching cart products:", error);
      }
    };

    fetchCartItems();
    fetchAllCartProducts();

    if (token && expirationTime) {
      if (expirationTime < Date.now()) {
        setAuthenticated(false);
      } else {
        setAuthenticated(true);
      }
    } else {
      setAuthenticated(false);
    }
  }, [cartItems]);

  const placeOrder = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.post("http://localhost:4000/orders/place", cartItems, {
        headers: {
          Authorization: token,
        },
      });

      setCartItems([]);
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };

  if (!authenticated) {
    return (
      <div
      className={`${styles.container}`}
      style={{
        backgroundColor: theme === "light" ? "white" : "#131313",
        color: theme === "light" ? "black" : "white",
      }}
    >
    <br />
    <h5>Login to see your cart!</h5>
  </div>
  )
  };

  return (
    <div
      className={`${styles.container}`}
      style={{
        backgroundColor: theme === "light" ? "white" : "#131313",
        color: theme === "light" ? "black" : "white",
      }}
    >
      <br />
      <h1 className="mb-4">Cart 🛒</h1>
      <div className="row">
        <div className="col-md-8">
          {cartProducts.length > 0 ? (
            cartProducts.map((item, index) => (
              <CartItem
                key={index}
                name={item.name}
                price={item.price}
                image={item.image}
                id={item._id}
              />
            ))
          ) : (
            <>
              <br />
              <h5>Cart is empty!</h5>
              <h7>Add some items to the cart to see them here.</h7>
            </>
          )}
        </div>

        <div className="col-md-4">
          <div className="card mb-4" style={{ backgroundColor: "white" }}>
            <div className="card-body">
              <h5 className="card-title">Total:</h5>
              <p className="card-text">
                $ {cartProducts.reduce((total, item) => total + item.price, 0)}
              </p>
            </div>
          </div>
          <Link href="/" className="btn btn-secondary me-2">
            Back
          </Link>
          <button
            onClick={() => {
              placeOrder();
              alert("Your order has been placed!");
              router.push("/orders");
            }}
            className="btn btn-primary"
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
}
