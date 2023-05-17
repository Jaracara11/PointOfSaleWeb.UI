import Form from 'react-bootstrap/esm/Form';

export const SearchInputForm = ({ searchQuery, setSearchQuery }: any) => {
  return (
    <>
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
    </>
  );
};
