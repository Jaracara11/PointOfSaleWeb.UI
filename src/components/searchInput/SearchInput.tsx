import './searchInput.css';
import { SearchInputProps } from '../../interfaces/SearchInputProps';

export const SearchInput = ({ searchQuery, setSearchQuery }: SearchInputProps) => {
  return (
    <div className="search-input">
      <input
        className="form-control"
        type="search"
        placeholder="Search..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <i className={`bi ${searchQuery ? 'bi-x-lg' : 'bi-search'}`} onClick={() => setSearchQuery('')}></i>
    </div>
  );
};
