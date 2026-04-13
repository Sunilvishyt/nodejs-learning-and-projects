import { useEffect, useRef, useState } from "react";
import "./app.css";

export default function App() {
  const [items, setItems] = useState([]);
  const [hasNext, setHasNext] = useState(true);
  const [nextCursor, setNextCursor] = useState(null);
  const loaderRef = useRef(null);

  async function fetchMore() {
    if (!hasNext) return;
    const response = await fetch(
      `http://localhost:8000/api/products/cursor?limit=5${nextCursor ? `&cursor=${nextCursor}` : ""}`,
    );
    const data = await response.json();
    setItems((prev) => [...prev, ...data.data]);
    setNextCursor(data.nextCursor);
    setHasNext(!!data.nextCursor);
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) fetchMore();
      },
      { threshold: 1.0 },
    );
    if (loaderRef.current) observer.observe(loaderRef.current);
    return () => {
      observer.disconnect();
    };
  }, [nextCursor, hasNext]);

  return (
    <div>
      <div>
        {items.map((item) => (
          <div className="item">{item.name}</div>
        ))}
      </div>
      <div ref={loaderRef} className={hasNext ? "loader" : "end-of-products"}>
        {hasNext ? "loading more....." : "End of products"}
      </div>
    </div>
  );
}
