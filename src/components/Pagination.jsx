import React from "react";
import ReactPaginate from "react-paginate";
import { useDispatch } from "react-redux";
import { setCurrentPage } from "../stores/slices/productsSlice";

export default function Pagination({ currentPage, limit, totalCount }) {
  const dispatch = useDispatch();
  const totalPage = Math.ceil(totalCount / limit);

  return (
    <ReactPaginate
      breakLabel="..."
      nextLabel=">"
      previousLabel="<"
      pageRangeDisplayed={2}
      pageCount={totalPage}
      onPageChange={(event) =>
        dispatch(setCurrentPage(event.selected))}
      forcePage={currentPage}
      className="pagination"
      renderOnZeroPageCount={null}
    />
  );
}
