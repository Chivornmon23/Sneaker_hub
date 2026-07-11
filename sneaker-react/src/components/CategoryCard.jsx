import "./CategoryCard.css";

function CategoryCard({ category }) {
  return (
    <a href="#" className="category-card">
      <img src={category.image} alt={category.name} loading="lazy" />
      <div className="category-card__overlay" />
      <div className="category-card__label">
        <div className="category-card__name">{category.name}</div>
        <div className="category-card__count">{category.count} styles</div>
      </div>
    </a>
  );
}

export default CategoryCard;
