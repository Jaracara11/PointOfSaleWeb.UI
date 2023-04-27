export const Pagination = ({ currentPage, totalPages, onPageChange }: any) => {
  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const handlePageChange = (pageNumber: number) => {
    if (pageNumber < 1 || pageNumber > totalPages) return;
    onPageChange(pageNumber);
  };

  return (
    <nav>
      <ul className="pagination">
        <li className={`page-item ${currentPage === 1 && 'disabled'}`}>
          <button
            className="page-link"
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            Previous
          </button>
        </li>
        {pageNumbers.map((number) => (
          <li
            key={number}
            className={`page-item ${currentPage === number && 'active'}`}
          >
            <button
              className="page-link"
              onClick={() => handlePageChange(number)}
            >
              {number}
            </button>
          </li>
        ))}
        <li className={`page-item ${currentPage === totalPages && 'disabled'}`}>
          <button
            className="page-link"
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
};
