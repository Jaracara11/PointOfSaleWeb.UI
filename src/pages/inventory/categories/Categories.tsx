import './categories.css';
import { useLoaderData } from 'react-router-dom';
import { Category } from '../../../interfaces/Category';

export const Categories = () => {
  const categories = useLoaderData() as Category[];

  return (
    <div className="categories-container container-fluid">
      <h1>Categories</h1>
      <table className="table table-hover">
        <thead>
          <tr>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category: Category) => (
            <tr key={category.categoryID}>
              <td>{category.categoryName}</td>
              <td>
                <button className="btn btn-outline-dark">Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
