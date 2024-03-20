import { React, useState, useEffect } from "react";
import { useRouter } from "next/router";
import styles from "./Navbar.module.css";
import { useTheme } from "../../contexts/ThemeContext";
import { FaMoon, FaSun } from "react-icons/fa";
import Link from "next/link";

export default function Navbar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [userName, setUserName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedRating, setSelectedRating] = useState("");
  const [sortBy, setSortBy] = useState("");
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const storedUserName = localStorage.getItem("userName");
    if (storedUserName) {
      setUserName(storedUserName);
    }
  }, []);

  const handlelogout = () => {
    localStorage.clear();
  };

  const handleSearch = (event) => {
    event.preventDefault();
    router.push(`?search=${searchTerm}`);
  };

  const handleFilter = () => {
    const queryParams = new URLSearchParams();
    if (selectedCategory) {
      queryParams.append("category", selectedCategory);
    }
    if (selectedRating) {
      queryParams.append("rating", selectedRating);
    }
    if (sortBy) {
      queryParams.append("sortBy", sortBy);
    }
    router.push(`?${queryParams.toString()}`);
  };

  return (
    <nav
      className="navbar navbar-expand-lg bg-body-tertiary"
      data-bs-theme={`${theme === "dark" ? "light" : "dark"}`}
    >
      <div className="container-fluid">
        <Link className="navbar-brand" href="/">
          knolEcom
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item dropdown">
              <Link
                className="nav-link dropdown-toggle"
                href="/"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {selectedCategory ? selectedCategory : "Category"}
              </Link>
              <ul className="dropdown-menu">
                <li>
                  <button
                    className="dropdown-item"
                    onClick={() => setSelectedCategory("")}
                  >
                    All
                  </button>
                </li>
                <li>
                  <button
                    className="dropdown-item"
                    onClick={() => setSelectedCategory("Smartphones")}
                  >
                    Smartphones
                  </button>
                </li>
                <li>
                  <button
                    className="dropdown-item"
                    onClick={() => setSelectedCategory("Laptops")}
                  >
                    Laptops
                  </button>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <button
                    className="dropdown-item"
                    onClick={() => setSelectedCategory("Fragrances")}
                  >
                    Fragrances
                  </button>
                </li>
                <li>
                  <button
                    className="dropdown-item"
                    onClick={() => setSelectedCategory("Skincare")}
                  >
                    Skincare
                  </button>
                </li>
              </ul>
            </li>
            <li className="nav-item dropdown">
              <Link
                className="nav-link dropdown-toggle"
                href="/"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {selectedRating ? selectedRating : "Rating"}
              </Link>
              <ul className="dropdown-menu">
                <li>
                  <button
                    className="dropdown-item"
                    onClick={() => setSelectedRating("")}
                  >
                    All
                  </button>
                </li>
                <li>
                  <button
                    className="dropdown-item"
                    onClick={() => setSelectedRating("Above 4.5")}
                  >
                    Above 4.5
                  </button>
                </li>
                <li>
                  <button
                    className="dropdown-item"
                    onClick={() => setSelectedRating("Above 4")}
                  >
                    Above 4
                  </button>
                </li>
                <li></li>
                <li>
                  <button
                    className="dropdown-item"
                    onClick={() => setSelectedRating("Above 3.5")}
                  >
                    Above 3.5
                  </button>
                </li>
                <li>
                  <button
                    className="dropdown-item"
                    onClick={() => setSelectedRating("Above 3")}
                  >
                    Above 3
                  </button>
                </li>
              </ul>
            </li>
            <li className="nav-item dropdown">
              <Link
                className="nav-link dropdown-toggle"
                href="/"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {sortBy === "priceLTH"
                  ? "$ Low - High"
                  : sortBy === "priceHTL"
                  ? "$ High - Low"
                  : sortBy === "ratingDesc"
                  ? "Avg. Rating"
                  : "Sort by"}
              </Link>
              <ul className="dropdown-menu">
                <li>
                  <button
                    className="dropdown-item"
                    onClick={() => {
                      setSortBy("");
                    }}
                  >
                    None
                  </button>
                </li>
                <li>
                  <button
                    className="dropdown-item"
                    onClick={() => setSortBy("priceLTH")}
                  >
                    Price: Low to High
                  </button>
                </li>
                <li>
                  <button
                    className="dropdown-item"
                    onClick={() => setSortBy("priceHTL")}
                  >
                    Price: High to Low
                  </button>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <button
                    className="dropdown-item"
                    onClick={() => setSortBy("ratingDesc")}
                  >
                    Average Customer Rating: High to Low
                  </button>
                </li>
              </ul>
            </li>
          </ul>
          <button
            onClick={() => {
              handleFilter();
            }}
            className={`btn btn-outline-${theme === "dark" ? "dark" : "light"}`}
          >
            Apply Filter
          </button>
          <form className="d-flex" role="search" onSubmit={handleSearch}>
            <input
              className={`form-control me-3 ${styles.searchBar}`}
              type="search"
              placeholder="Search"
              aria-label="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="btn btn-outline-success" type="submit">
              Search
            </button>
          </form>
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                className="nav-link active"
                aria-current="page"
                href={userName ? "/" : "/login"}
              >
                {userName ? "Hey, " + userName : "Sign In"}
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" href="/orders">
                Orders
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" href="/cart">
                Cart
              </Link>
            </li>
          </ul>

          <Link onClick={toggleTheme} className={`${styles.iconLink}`}>
            {theme === "dark" ? (
              <FaSun style={{ color: "black", fontSize: "1.5em" }} />
            ) : (
              <FaMoon />
            )}
          </Link>

          <button
            onClick={() => {
              handlelogout();
              window.location.href = "/login";
            }}
            className={`btn btn-outline-${theme === "dark" ? "dark" : "light"}`}
          >
            Sign Out
          </button>
        </div>
      </div>
    </nav>
  );
}
