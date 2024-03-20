import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "../components/Product/ProductCard/ProductCard";
import { useRouter } from "next/router";
import { useTheme } from "../contexts/ThemeContext";
import styles from "../styles/Home.module.css";

export default function Home() {
  const [products, setProducts] = useState([]);
  const { theme } = useTheme();
  const router = useRouter();

  const baseUrl = "https://knol-ecom-next.vercel.app";

  useEffect(() => {
    async function fetchProducts() {
      try {
        const { search, category, rating, sortBy } = router.query;

        let url = `${baseUrl}/api/products`;

        let isFirstParam = true;

        if (search) {
          url += `${isFirstParam ? "?" : "&"}search=${search}`;
          isFirstParam = false;
        }

        if (category) {
          url += `${isFirstParam ? "?" : "&"}category=${category}`;
          isFirstParam = false;
        }

        if (rating) {
          url += `${isFirstParam ? "?" : "&"}rating=${rating}`;
          isFirstParam = false;
        }

        if (sortBy) {
          url += `${isFirstParam ? "?" : "&"}sortBy=${sortBy}`;
          isFirstParam = false;
        } 
        
        const response = await axios.get(url, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        });
        if (response.data.message === "Invalid token.") {
          router.push("/login");
        } else {
          setProducts(response.data);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }

    fetchProducts();
  }, [router, router.query]);

  return (
    <div className={`${styles.outer}`} style={{ backgroundColor: theme === "light" ? "white" : "#131313 "}}>
      <div className="container text-center mt-5">
        <h1 className={`mb-3 ${styles.title}`} style={{ color: theme === "light" ? "black" : "white" }}>
          Products
        </h1>
        <div className="row">
          {products.map((product) => (
            <div className="col-md-3 mb-4" key={product.id}>
              <ProductCard
                name={product.name}
                id={product.id}
                price={product.price}
                desc={product.desc}
                rating={product.rating}
                img={product.img}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
