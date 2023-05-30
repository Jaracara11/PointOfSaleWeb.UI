import './categories.css';
import Table from 'react-bootstrap/Table';
import { Category } from '../../../interfaces/inventory/Category';
import { useState } from 'react';
import { CategoryModal } from '../../../components/modals/categoryModal/CategoryModal';
import { UserAuth } from '../../../context/UserContext';
import { PaginationControl } from '../../../components/paginationControl/PaginationControl';
import { LoadingSpinner } from '../../../components/loadingSpinner/LoadingSpinner';
import { useGetCategories } from '../../../hooks/categories.hooks';
import { SearchInput } from '../../../components/searchInput/SearchInput';
import { validateUserRolePermission } from '../../../services/user.Service';
import Button from 'react-bootstrap/esm/Button';

export const Categories = () => {
  const { user } = UserAuth() || {};
  const categoriesQuery = useGetCategories();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [searchCategoryQuery, setSearchCategoryQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  const toggleModal = () => setShowModal((prev) => !prev);

  ///////////////////////////Pagination////////////////////////////////
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [categoriesPerPage] = useState<number>(10);

  const filteredCategories = (categoriesQuery.data || []).filter((category) =>
    category.categoryName.toLowerCase().includes(searchCategoryQuery.trim().toLowerCase())
  );

  const totalPages = Math.ceil(filteredCategories.length / categoriesPerPage);

  const indexOfLastCategory = Math.min(currentPage * categoriesPerPage, filteredCategories.length);
  const indexOfFirstCategory = (currentPage - 1) * categoriesPerPage;

  const currentCategories = filteredCategories.slice(indexOfFirstCategory, indexOfLastCategory);
  /////////////////////////Pagination End//////////////////////////////

  if (categoriesQuery.isLoading) return <LoadingSpinner />;

  return (
    <div className="categories-container container-fluid">
      <h1 className="title">Categories</h1>
      <div className="btn-panel">
        {user && validateUserRolePermission(['Admin', 'Manager']) && (
          <Button
            variant="dark"
            onClick={() => {
              setSelectedCategory(null);
              toggleModal();
            }}
          >
            <i className="bi bi-plus-lg"></i>
            &nbsp;Add New Category
          </Button>
        )}
        <SearchInput searchQuery={searchCategoryQuery} setSearchQuery={setSearchCategoryQuery} />
      </div>

      {categoriesQuery.data && (
        <>
          <Table hover>
            <thead>
              <tr>
                <th>Name</th>
                <th></th>
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
                    {validateUserRolePermission(['Admin', 'Manager']) && (
                      <Button
                        variant="outline-dark"
                        onClick={() => {
                          setSelectedCategory(category);
                          toggleModal();
                        }}
                      >
                        <i className="bi bi-pencil"></i>&nbsp;Edit
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <PaginationControl
            currentPage={currentPage}
            totalPages={totalPages || 0}
            onPageChange={setCurrentPage}
          />
        </>
      )}

      {showModal && <CategoryModal toggle={toggleModal} category={selectedCategory} />}
    </div>
  );
};
