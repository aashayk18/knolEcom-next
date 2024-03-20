import React, { useState, useEffect } from "react";
import OrderItem from "./OrderItem/OrderItem";
import axios from "axios";
import Link from "next/link";
import { useTheme } from "../../contexts/ThemeContext";
import styles from "./Orders.module.css";

export default function Orders() {
  const [orderItems, setOrderItems] = useState([]);
  const [orderProducts, setOrderProducts] = useState([]);
  const [authenticated, setAuthenticated] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const expirationTime = localStorage.getItem("expirationTime");
    const fetchOrderItems = async () => {
      try {
        const response = await axios.get("http://localhost:4000/orders/fetch", {
          headers: {
            Authorization: token,
          },
        });
        setOrderItems(response.data);
      } catch (error) {
        console.error("Error fetching user orders:", error);
      }
    };

    const fetchOrderProducts = async (productId) => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/products/${productId}`
        ); // API endpoint
        return response.data;
      } catch (error) {
        console.error("Error fetching order:", error);
      }
    };

    const fetchAllOrderProducts = async () => {
      try {
        const productPromises = orderItems.map(fetchOrderProducts);
        const products = await Promise.all(productPromises);
        setOrderProducts(products);
      } catch (error) {
        console.error("Error fetching user orders:", error);
      }
    };

    fetchOrderItems();
    fetchAllOrderProducts();

    if (token && expirationTime) {
      if (expirationTime < Date.now()) {
        setAuthenticated(false);
      } else {
        setAuthenticated(true);
      }
    } else {
      setAuthenticated(false);
    }
  }, [orderItems]);

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
    <h5>Login to see your orders!</h5>
  </div>
  )
  };

  return (
    <div
      className={`${styles.container}`}
      style={{
        backgroundColor: theme === "light" ? "white" : "#131313 ",
        color: theme === "light" ? "black" : "white",
      }}
    >
      <br />
      <h1 className="mb-4">Orders</h1>
      <div className="row">
        <div className="col-md-8">
          {orderProducts.length > 0 ? (
            orderProducts.map((item, index) => (
              <OrderItem
                key={index}
                name={item.name}
                price={item.price}
                image={item.image}
                id={item.id}
              />
            ))
          ) : (
            <>
              <h5>You have no previous orders!</h5>
              <br />
              <h7>
                Once you complete any purchases, they will be displayed here.
              </h7>
            </>
          )}
        </div>
        <div className="col-md-4">
          <Link href="/" className="btn btn-secondary me-2">
            Back
          </Link>
        </div>
      </div>
    </div>
  );
}
