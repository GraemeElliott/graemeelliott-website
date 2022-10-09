import { Button } from 'react-bootstrap';

export default function Pagination({ postsPerPage, totalPosts, paginate }) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="pagination-container">
      {pageNumbers.map((number) => (
        <Button
          variant="light"
          onClick={() => paginate(number)}
          className="pagination-button"
        >
          {number}
        </Button>
      ))}
    </div>
  );
}
