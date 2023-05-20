import './searchInput.css';
import Form from 'react-bootstrap/esm/Form';
import { SearchInputProps } from '../../interfaces/SearchInputProps';

export const SearchInput = ({
  searchQuery,
  setSearchQuery
}: SearchInputProps) => {
  return (
    <div className="search-input">
      <Form.Control
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <i
        className={`bi ${searchQuery ? 'bi-x-lg' : 'bi-search'}`}
        onClick={() => setSearchQuery('')}
      ></i>
    </div>
  );
};
