import './categories.css';
import Table from 'react-bootstrap/Table';
import { useQuery } from '@tanstack/react-query';
import { Category } from '../../../interfaces/Category';
import { useState } from 'react';
import { CategoryModal } from '../../../components/categoryModal/CategoryModal';
import { UserAuth } from '../../../context/UserContext';
import { Pagination } from '../../../components/pagination/Pagination';
import { getAllCategories } from '../../../repository/categoryRepository';
import { LoadingSpinner } from '../../../components/loadingSpinner/LoadingSpinner';
import { handleErrorResponse } from '../../../services/error.Service';

export const Categories = () => {
  const { user } = UserAuth();
  const categoriesQuery = useQuery({
    queryKey: ['categories'],
    queryFn: getAllCategories,
    onError: (error) => handleErrorResponse(error, '')
  });
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );

  const toggleModal = () => setShowModal((prev) => !prev);

  ///////////////////////////Pagination////////////////////////////////
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [categoriesPerPage] = useState<number>(10);
  const totalPages =
    categoriesQuery.data &&
    Math.ceil(categoriesQuery.data.length / categoriesPerPage);
  const indexOfLastCategory = currentPage * categoriesPerPage;
  const indexOfFirstCategory = indexOfLastCategory - categoriesPerPage;
  const currentCategories = categoriesQuery.data?.slice(
    indexOfFirstCategory,
    indexOfLastCategory
  );

  if (categoriesQuery.isLoading) return <LoadingSpinner />;

  return (
    <div className="categories-container container-fluid">
      <h1>Categories</h1>
      {user.role === 'Admin' && (
        <button
          className="mb-3 btn btn-dark"
          onClick={() => {
            setSelectedCategory(null);
            toggleModal();
          }}
        >
          <i className="bi bi-plus-lg"></i>
          &nbsp;Add New Category
        </button>
      )}

      {categoriesQuery.data && (
        <>
          <Table hover>
            <thead>
              <tr>
                <th>Name</th>
              </tr>
            </thead>
            <tbody>
              {currentCategories?.map((category: Category) => (
                <tr key={category.categoryID}>
                  <td>
                    <i className="bi bi-dot"></i>
                    {category.categoryName}
                  </td>
                  <td>
                    <button
                      className="btn btn-outline-dark"
                      onClick={() => {
                        setSelectedCategory(category);
                        toggleModal();
                      }}
                    >
                      <i className="bi bi-pencil"></i>&nbsp;Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </>
      )}

      {showModal && (
        <CategoryModal toggle={toggleModal} category={selectedCategory} />
      )}
    </div>
  );
};
