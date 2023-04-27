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
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [categoriesPerPage, setCategoriesPerPage] = useState<number>(10);

  const indexOfLastCategory = currentPage * categoriesPerPage;
  const indexOfFirstCategory = indexOfLastCategory - categoriesPerPage;
  const currentCategories = categories.slice(
    indexOfFirstCategory,
    indexOfLastCategory
  );

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(categories.length / categoriesPerPage); i++) {
    pageNumbers.push(i);
  }

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
          {currentCategories.map((category: Category) => (
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

      <nav>
        <ul className="pagination">
          <li key="first" className="page-item">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(1)}
              className="page-link"
            >
              First
            </button>
          </li>
          {pageNumbers.map((number) => (
            <li key={number} className="page-item">
              <button
                onClick={() => setCurrentPage(number)}
                className={`page-link ${currentPage === number && 'active'}`}
              >
                {number}
              </button>
            </li>
          ))}
          <li key="last" className="page-item">
            <button
              disabled={currentPage === pageNumbers.length}
              onClick={() => setCurrentPage(pageNumbers.length)}
              className="page-link"
            >
              Last
            </button>
          </li>
        </ul>
      </nav>

      {showModal && <CategoryModal toggle={toggleModal} />}
    </div>
  );
};
