import './categories.css';
import { useLoaderData } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import { Category } from '../../../interfaces/Category';
import { useState } from 'react';
import { CategoryModal } from '../../../components/categoryModal/CategoryModal';
import { UserAuth } from '../../../context/UserContext';

export const Categories = () => {
  const { user } = UserAuth();
  const categories = useLoaderData() as Category[];
  const [showModal, setShowModal] = useState<boolean>(false);
  const toggleModal = () => setShowModal((prev) => !prev);

  return (
    <div className="categories-container container-fluid">
      <h1>Categories</h1>
      {user.role === 'Admin' && (
        <button
          className="mb-3 btn btn-dark"
          onClick={() => {
            toggleModal();
          }}
        >
          <i className="bi bi-plus-lg"></i>
          &nbsp;Add New Category
        </button>
      )}

      <Table hover>
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
      </Table>

      {showModal && <CategoryModal toggle={toggleModal} />}
    </div>
  );
};
