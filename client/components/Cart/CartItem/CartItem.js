import React from "react";
import axios from "axios";
import { useTheme } from "../../../contexts/ThemeContext";

export default function CartItem(props) {
  const { theme } = useTheme();

  const baseUrl = "https://knol-ecom-next.vercel.app";

  const deleteFromCart = async () => {
    try {
      const id = props.id;
      console.log(id);
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${baseUrl}/db/cart/delete`,
        { productId: id },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      console.log("Product removed from cart:", response.data);
    } catch (error) {
      console.error("Error removing product from cart:", error);
    }
  };

  return (
    <div
      className="card mb-3"
      style={{
        backgroundColor: theme === "dark" ? "#101010" : "white",
        color: theme === "dark" ? "white" : "#101010",
        borderColor: theme === "dark" ? "white" : ""
      }}
    >
      <div className="row g-0">
        <div className="col-md-4">
          <img
            src={props.image}
            className="img-fluid rounded-start"
            alt={props.name}
            style={{ width: "200px", height: "150px" }}
          />
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h5 className="card-name">{props.name}</h5>
            <p className="card-text">Price: ${props.price}</p>
            <button onClick={deleteFromCart} className="btn btn-danger">
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
