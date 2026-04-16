import "./app.css";
import React, { useCallback } from "react";
import { useEffect } from "react";
import { useState } from "react";

function App() {
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("");

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();

      if (category) params.append("category", category);
      if (minPrice) {
        const numberMinPrice = Number(minPrice);
        if (!isNaN(numberMinPrice)) params.append("minPrice", minPrice);
      }
      if (maxPrice) {
        const numberMaxPrice = Number(maxPrice);
        if (!isNaN(numberMaxPrice)) params.append("maxPrice", maxPrice);
      }
      if (search) params.append("search", search);
      const url = `http://localhost:8000/products?${params.toString()}`;

      const res = await fetch(url);
      const data = await res.json();

      setCategories(data.categories);
      setProducts(data.data);
    } catch (err) {
      console.error("something wend wrong", err);
    } finally {
      setLoading(false);
    }
  }, [category, search, minPrice, maxPrice]);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function clearFilters() {
    setSearch("");
    setCategory("");
    setMaxPrice("");
    setMinPrice("");
  }

  return (
    <div>
      <div>
        <select
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
          }}
        >
          <option value="">all</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>

        <input
          type="text"
          value={minPrice}
          placeholder="minimum price"
          onChange={(e) => {
            setMinPrice(e.target.value);
          }}
        />

        <input
          type="text"
          value={maxPrice}
          placeholder="maximum price"
          onChange={(e) => {
            setMaxPrice(e.target.value);
          }}
        />

        <input
          type="text"
          placeholder="search any product"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
        <button onClick={() => fetchData()}>update results</button>
        <button onClick={clearFilters}>clear</button>
      </div>

      <div>
        {loading ? (
          <div>loading....</div>
        ) : (
          <ul>
            {products.map((product) => (
              <div className="product">
                <li key={product._id}>{product.name}</li>
              </div>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default App;
