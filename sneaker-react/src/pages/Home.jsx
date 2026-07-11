import { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import CategoryCard from "../components/CategoryCard";
import "./Home.css";

// ── Static category data ──────────────────────────────
const CATEGORIES = [
  {
    name: "Running",
    count: 48,
    image:
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=600&q=80",
  },
  {
    name: "Basketball",
    count: 32,
    image:
      "https://images.unsplash.com/photo-1579338559194-a162d19bf842?w=600&q=80",
  },
  {
    name: "Lifestyle",
    count: 67,
    image:
      "https://images.unsplash.com/photo-1595341888016-a392ef81b7de?w=600&q=80",
  },
  {
    name: "Training",
    count: 24,
    image:
      "https://images.unsplash.com/photo-1542219550-37153d387c27?w=600&q=80",
  },
];

const API_BASE = "https://dummyjson.com";

// ── Home Page ─────────────────────────────────────────
function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [showAll, setShowAll] = useState(false);

  // Fetch products on mount
  useEffect(() => {
    Promise.all([
      fetch(`${API_BASE}/products/category/mens-shoes`).then((r) => {
        if (!r.ok) throw new Error("Failed to fetch");
        return r.json();
      }),
      fetch(`${API_BASE}/products/category/womens-shoes`).then((r) => {
        if (!r.ok) throw new Error("Failed to fetch");
        return r.json();
      }),
    ])
      .then(([mens, womens]) => {
        setProducts([...mens.products, ...womens.products]);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []); // ← runs once when Home mounts

  // Decide how many products to show
  const displayed = showAll ? products : products.slice(0, 4);

  return (
    <main>
      {/* ── CATEGORIES ────────────────────────────── */}
      <section className="section">
        <div className="section__header">
          <h2 className="section__title">Shop by Category</h2>
        </div>
        <div className="category-grid">
          {CATEGORIES.map((cat) => (
            <CategoryCard key={cat.name} category={cat} />
          ))}
        </div>
      </section>

      {/* ── FEATURED PRODUCTS ─────────────────────── */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="section__header">
          <h2 className="section__title">Featured Products</h2>
          {!loading && !error && (
            <button
              className="section__link"
              onClick={() => setShowAll((prev) => !prev)}
            >
              {showAll ? "Show Less" : "View More"}
            </button>
          )}
        </div>

        <div className="product-grid">
          {loading && (
            <p className="product-grid__status">Loading products...</p>
          )}
          {error && (
            <p className="product-grid__error">
              Failed to load products. Please try again.
            </p>
          )}
          {!loading &&
            !error &&
            displayed.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
        </div>
      </section>

      {/* ── CTA BANNER ────────────────────────────── */}
      <section className="cta-banner">
        <div className="cta-banner__text">
          <p className="cta-banner__eyebrow">Members Only</p>
          <h2 className="cta-banner__title">
            Join the Hub.
            <br />
            Get More.
          </h2>
          <p className="cta-banner__sub">
            Sign up free for early access to new drops and member-only deals.
          </p>
          <a href="#" className="btn btn--white">
            Create Account
          </a>
        </div>
        <img
          className="cta-banner__image"
          src="https://images.unsplash.com/photo-1556906781-9a412961a28d?w=800&q=80"
          alt="Sneaker"
        />
      </section>
    </main>
  );
}

export default Home;
