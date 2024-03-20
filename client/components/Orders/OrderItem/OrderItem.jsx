import React from "react";
import { useTheme } from "../../../contexts/ThemeContext";

export default function OrderItem(props) {
  const { theme } = useTheme();

  return (
    <div
      className="card mb-3"
      style={{
        backgroundColor: theme === "dark" ? "#101010" : "white",
        color: theme === "dark" ? "white" : "#101010",
        borderColor: theme === "dark" ? "white" : "",
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
          </div>
        </div>
      </div>
    </div>
  );
}
