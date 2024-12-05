/* eslint-disable react/prop-types */
import { CPagination, CPaginationItem } from '@coreui/react'
import React from 'react'
import './index.css'

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  totalItems,
  itemsPerPage,
}) {
  return (
    <div className="d-flex justify-content-end align-items-center">
      <span style={{ marginRight: 10 }}>
        Showing {currentPage !== totalPages ? itemsPerPage : totalItems % itemsPerPage} of{' '}
        {totalItems}
      </span>
      <div className="clickable">
        <CPagination aria-label="Page navigation example" size="sm">
          {/* First Page */}
          <CPaginationItem
            aria-label="First"
            onClick={() => onPageChange(1)}
            disabled={currentPage === 1}
          >
            &laquo;
          </CPaginationItem>

          {/* Previous Page */}
          <CPaginationItem
            aria-label="Previous"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            &lt;
          </CPaginationItem>

          {/* First 4 Pages */}
          {[...Array(Math.min(4, totalPages))].map((_, index) => (
            <CPaginationItem
              key={index + 1}
              active={currentPage === index + 1}
              onClick={() => onPageChange(index + 1)}
            >
              {index + 1}
            </CPaginationItem>
          ))}

          {/* Show next page (page 5) when on page 4 */}
          {currentPage === 4 && totalPages > 4 && (
            <CPaginationItem active={currentPage === 5} onClick={() => onPageChange(5)}>
              5
            </CPaginationItem>
          )}

          {/* Dots if needed between first 4 and middle pages */}
          {currentPage > 5 && <CPaginationItem disabled>. . .</CPaginationItem>}

          {/* Show Previous, Current, and Next Pages */}
          {currentPage > 4 && currentPage < totalPages - 3 && (
            <>
              {/* Previous Page */}
              {currentPage - 1 > 4 && (
                <CPaginationItem onClick={() => onPageChange(currentPage - 1)}>
                  {currentPage - 1}
                </CPaginationItem>
              )}

              {/* Current Page */}
              <CPaginationItem active>{currentPage}</CPaginationItem>

              {/* Next Page */}
              {currentPage + 1 < totalPages - 3 && (
                <CPaginationItem onClick={() => onPageChange(currentPage + 1)}>
                  {currentPage + 1}
                </CPaginationItem>
              )}
            </>
          )}

          {/* Dots if needed between middle and last 4 pages */}
          {currentPage < totalPages - 4 && <CPaginationItem disabled>...</CPaginationItem>}

          {/* Last 4 Pages */}
          {totalPages > 4 &&
            [...Array(4)].map((_, index) => (
              <CPaginationItem
                key={totalPages - 3 + index}
                active={currentPage === totalPages - 3 + index}
                onClick={() => onPageChange(totalPages - 3 + index)}
              >
                {totalPages - 3 + index}
              </CPaginationItem>
            ))}

          {/* Next Page */}
          <CPaginationItem
            aria-label="Next"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            &gt;
          </CPaginationItem>

          {/* Last Page */}
          <CPaginationItem
            aria-label="Last"
            onClick={() => onPageChange(totalPages)}
            disabled={currentPage === totalPages}
          >
            &raquo;
          </CPaginationItem>
        </CPagination>
      </div>
    </div>
  )
}
