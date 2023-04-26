import './categories.css';
import { useLoaderData } from 'react-router-dom';
import { Category } from '../../../interfaces/Category';
import { useState } from 'react';
import { CategoryModal } from '../../../components/categoryModal/CategoryModa';

export const Categories = () => {
  const categories = useLoaderData() as Category[];
  const [showModal, setShowModal] = useState<boolean>(false);
  const toggleModal = () => setShowModal((prev) => !prev);

  return (
    <div className="categories-container container-fluid">
      <h1>Categories</h1>
      <button
        className="mb-3 btn btn-dark"
        onClick={() => {
          toggleModal();
        }}
      >
        <i className="bi bi-plus-lg"></i>
        &nbsp;Add New Category
      </button>

      <table className="table table-hover">
        <thead>
          <tr>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category: Category) => (
            <tr key={category.categoryID}>
              <td>
                <i className="bi bi-dot"></i>
                {category.categoryName}
              </td>
              <td>
                <button className="btn btn-outline-dark">
                  <i className="bi bi-pencil"></i>&nbsp;Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && <CategoryModal toggle={toggleModal} />}
    </div>
  );
};
