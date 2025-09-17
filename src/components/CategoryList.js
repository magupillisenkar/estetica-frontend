import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from '../redux/categoriesSlice';

function CategoryList({ onSelectCategory }) {
  const dispatch = useDispatch();
  const { categories, loading } = useSelector(state => state.categories);
  const [activeCategory, setActiveCategory] = useState(null);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleTabClick = (catId) => {
    setActiveCategory(catId);
    onSelectCategory(catId);
  };

  if (loading) return <p>Loading categories...</p>;

  return (
    <ul className="nav nav-tabs mb-3">
      <li className="nav-item">
        <button
          className={`nav-link ${activeCategory === null ? 'active' : ''}`}
          onClick={() => handleTabClick(null)}
        >
          All
        </button>
      </li>
      {categories.map(cat => (
        <li key={cat._id} className="nav-item">
          <button
            className={`nav-link ${activeCategory === cat._id ? 'active' : ''}`}
            onClick={() => handleTabClick(cat._id)}
          >
            {cat.name}
          </button>
        </li>
      ))}
    </ul>
  );
}

export default CategoryList;
