import './paginationControl.css';
import { PaginationProps } from '../../interfaces/PaginationProps';

export const PaginationControl = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
  const handlePageChange = (pageNumber: number) => {
    if (pageNumber < 1 || pageNumber > totalPages) return;
    onPageChange(pageNumber);
  };

  return (
    <ul className="pagination">
      <li className={`page-item ${currentPage === 1 && 'disabled'}`}>
        <button
          className="page-link"
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          <i className="bi bi-chevron-left"></i>
        </button>
      </li>
      {[...Array(totalPages)].map((_, index) => {
        const pageNumber = index + 1;
        return (
          <li key={pageNumber} className={`page-item ${currentPage === pageNumber && 'active'}`}>
            <button className="page-link" onClick={() => handlePageChange(pageNumber)}>
              {pageNumber}
            </button>
          </li>
        );
      })}
      <li className={`page-item ${currentPage === totalPages && 'disabled'}`}>
        <button
          className="page-link"
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          <i className="bi bi-chevron-right"></i>
        </button>
      </li>
    </ul>
  );
};
