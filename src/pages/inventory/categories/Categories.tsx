import './categories.css';
import Table from 'react-bootstrap/Table';
import { Category } from '../../../interfaces/inventory/Category';
import { useState } from 'react';
import { CategoryModal } from '../../../components/modals/categoryModal/CategoryModal';
import { UserAuth } from '../../../context/UserContext';
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

  const filteredCategories = (categoriesQuery.data || []).filter((category) =>
    category.categoryName.toLowerCase().includes(searchCategoryQuery.trim().toLowerCase())
  );

  if (categoriesQuery.isLoading) return <LoadingSpinner />;

  return (
    <div className="categories-container">
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
              {filteredCategories.map((category: Category) => (
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
        </>
      )}

      {showModal && <CategoryModal toggle={toggleModal} category={selectedCategory} />}
    </div>
  );
};
