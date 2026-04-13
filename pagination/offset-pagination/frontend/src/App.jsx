import { useState } from "react";
import { useEffect } from "react";

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const response = await fetch(
        `http://localhost:8000/products?page=${page}&limit=5`,
      );
      const data = await response.json();
      setProducts(data.data);
      setTotalPages(data.meta.totalPages);
      setLoading(false);
    }
    fetchData();
  }, [page]); //whenever the page updates run the function again. and the page number we will increase with the button click .

  //if the products are loading then return loading.
  if (loading)
    return (
      <div>
        <h1>Loading data</h1>
      </div>
    );

  return (
    <div>
      <ul>
        {products.map((product) => (
          <li key={product.id}>{product.name}</li>
        ))}
      </ul>

      <div>
        {/*button with disabled logic */}
        <button
          disabled={page === 1}
          onClick={() => setPage((prev) => prev - 1)}
        >
          previous
        </button>

        <span>
          current page : {page} / total {totalPages}
        </span>

        {/*button with disabled logic */}
        <button
          disabled={page === totalPages}
          onClick={() => setPage((prev) => prev + 1)}
        >
          next
        </button>
      </div>
    </div>
  );
}

export default App;
