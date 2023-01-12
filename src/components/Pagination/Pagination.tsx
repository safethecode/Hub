import React, { useState } from 'react';
import { Button } from 'components/Button';
import { styled } from 'styles/stitches';

const PaginationWrapper = styled('div', {
  display: 'flex',
  justifyContent: 'center',
  marginBottom: '$4',
  gap: 4,
});

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChanged: (page: number) => void;
  numOfPagesShow: number;
}

export const Pagination: React.FC<PaginationProps> = ({
  totalPages,
  currentPage,
  onPageChanged,
  numOfPagesShow,
}) => {
  const [currentPageState, setCurrentPageState] = useState(currentPage);

  function handlePageChanged(newPage: number) {
    setCurrentPageState(newPage);
    onPageChanged(newPage);
  }

  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  const halfPages = Math.floor(numOfPagesShow / 2);

  const start = Math.max(currentPage - halfPages, 1);
  const end = Math.min(currentPage + halfPages, totalPages);

  const pageNumbersDisplayed = pageNumbers.slice(start - 1, end);

  return (
    <PaginationWrapper>
      <Button
        btnType="default"
        disabled={currentPageState === 1}
        onClick={() => handlePageChanged(currentPageState - 1)}
      >
        이전 페이지
      </Button>
      {pageNumbersDisplayed.map((number) => (
        <Button
          btnType={currentPage === number ? 'default' : 'outline'}
          key={number}
          onClick={() => handlePageChanged(number)}
        >
          {number}
        </Button>
      ))}
      <Button
        btnType="default"
        disabled={currentPageState === totalPages}
        onClick={() => handlePageChanged(currentPageState + 1)}
      >
        다음 페이지
      </Button>
    </PaginationWrapper>
  );
};

export default Pagination;
