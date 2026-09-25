import { useState, useEffect } from "react";
import MenuItem from "./MenuItem";

function Menu() {
  const [menuData, setMenuData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("/data.json")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load menu data");
        return res.json();
      })
      .then((data) => {
        setMenuData(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="status-message">Loading menu...</p>;
  if (error) return <p className="status-message error">Error: {error}</p>;

  return (
    <div className="menu">
      {menuData.categories.map((category) => {
        const categoryItems = menuData.items.filter(
          (item) => item.category === category.id
        );
        if (categoryItems.length === 0) return null;

        return (
          <section key={category.id} className="menu-category">
            <h2 className="category-title">{category.name}</h2>
            <div className="menu-grid">
              {categoryItems.map((item) => (
                <MenuItem key={item.id} item={item} />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}

export default Menu;