import './categories.css';
import { useLoaderData } from 'react-router-dom';
import { Category } from '../../../interfaces/Category';

export const Categories = () => {
  const categories = useLoaderData() as Category[];

  return (
    <div className="categories-container container-fluid">
      <ul className="categories-list list-group">
        {categories.map((category: Category) => (
          <li
            className="list-group-item list-group-item-action"
            key={category.categoryID}
          >
            {category.categoryName}
          </li>
        ))}
      </ul>
    </div>
  );
};
