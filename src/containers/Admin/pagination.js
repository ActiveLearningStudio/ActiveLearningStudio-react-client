/* eslint-disable */
import React from "react";
import { useDispatch } from "react-redux";
import Pagination from "react-js-pagination";

const PaginationAdmin = ({
  type,
  setCurrentTab,
  subTypeState,
  subType,
  data,
  activePage,
  setActivePage,
  updatePageNumber,
  localstatePagination,
}) => {
  const dispatch = useDispatch();
  return (
    <div className="pagination-top">
      <div className="pagination_state">
        Showing {data?.meta?.from} - {data?.meta?.to} of {data?.meta?.total}
      </div>
      <div className="main-pagination">
        {type === "Stats" && subTypeState === "Report" && (
          <Pagination
            activePage={activePage}
            pageRangeDisplayed={5}
            itemsCountPerPage={data?.meta?.per_page}
            totalItemsCount={data?.meta?.total}
            onChange={(e) => {
              // setCurrentTab("index");
              window.scrollTo(0, 0);
              setActivePage(e);
            }}
          />
        )}
        {type === "Stats" && subTypeState === "Queues: Logs" && (
          <Pagination
            activePage={activePage}
            pageRangeDisplayed={5}
            itemsCountPerPage={data?.meta?.per_page}
            totalItemsCount={data?.meta?.total}
            onChange={(e) => {
              // setCurrentTab("index");
              window.scrollTo(0, 0);
              setActivePage(e);
            }}
          />
        )}
        {type === "Stats" && subTypeState === "Queues: Jobs" && (
          <Pagination
            activePage={activePage}
            pageRangeDisplayed={5}
            itemsCountPerPage={data?.meta?.per_page}
            totalItemsCount={data?.meta?.total}
            onChange={(e) => {
              // setCurrentTab("index");
              window.scrollTo(0, 0);
              setActivePage(e);
            }}
          />
        )}
        {type === "Users" && (
          <Pagination
            activePage={activePage}
            pageRangeDisplayed={5}
            itemsCountPerPage={data?.meta?.per_page}
            totalItemsCount={data?.meta?.total}
            onChange={(e) => {
              // setCurrentTab("all");
              window.scrollTo(0, 0);
              setActivePage(e);
            }}
            firstPageText="Previous"
            lastPageText="Next"
          />
        )}
        {type === "Project" && subType === "all" && (
          <Pagination
            activePage={activePage}
            pageRangeDisplayed={5}
            itemsCountPerPage={data?.meta?.per_page}
            totalItemsCount={data?.meta?.total}
            onChange={(e) => {
              window.scrollTo(0, 0);
              setCurrentTab("all");
              setActivePage(e);
              dispatch(updatePageNumber(e));
            }}
            // Editing
            firstPageText="Previous"
            lastPageText="Next"
          />
        )}
        {type === "Project" && subType === "Exported Projects" && (
          <Pagination
            activePage={activePage}
            pageRangeDisplayed={5}
            itemsCountPerPage={localstatePagination?.meta?.per_page}
            totalItemsCount={localstatePagination?.meta?.total}
            onChange={(e) => {
              window.scrollTo(0, 0);
              setCurrentTab("Exported Projects");
              setActivePage(e);
              dispatch(updatePageNumber(e));
            }}
            firstPageText="Previous"
            lastPageText="Next"
          />
        )}
        {type === "Project" && subType === "index" && (
          <Pagination
            activePage={activePage}
            pageRangeDisplayed={5}
            itemsCountPerPage={localstatePagination?.meta?.per_page}
            totalItemsCount={localstatePagination?.meta?.total}
            onChange={(e) => {
              window.scrollTo(0, 0);
              setCurrentTab("index");
              setActivePage(e);
              dispatch(updatePageNumber(e));
            }}
            firstPageText="Previous"
            lastPageText="Next"
          />
        )}
        {type === "Activities" && subType === "Activity Types" && (
          <Pagination
            activePage={activePage}
            pageRangeDisplayed={5}
            itemsCountPerPage={data?.meta?.per_page}
            totalItemsCount={data?.meta?.total}
            onChange={(e) => {
              // setCurrentTab("index");
              window.scrollTo(0, 0);
              setActivePage(e);
            }}
            firstPageText="Previous"
            lastPageText="Next"
          />
        )}
        {type === "Activities" && subType === "Activity Items" && (
          <Pagination
            activePage={activePage}
            pageRangeDisplayed={5}
            itemsCountPerPage={data?.meta?.per_page}
            totalItemsCount={data?.meta?.total}
            onChange={(e) => {
              // setCurrentTab("index");
              window.scrollTo(0, 0);
              setActivePage(e);
            }}
            firstPageText="Previous"
            lastPageText="Next"
          />
        )}
        {type === "LMS" && (
          <Pagination
            activePage={activePage}
            pageRangeDisplayed={5}
            itemsCountPerPage={data?.meta?.per_page}
            totalItemsCount={data?.meta?.total}
            onChange={(e) => {
              // setCurrentTab("index");
              window.scrollTo(0, 0);
              setActivePage(e);
            }}
            firstPageText="Previous"
            lastPageText="Next"
          />
        )}
        {type === "DefaultSso" && (
          <Pagination
            activePage={activePage}
            pageRangeDisplayed={5}
            itemsCountPerPage={data?.meta?.per_page}
            totalItemsCount={data?.meta?.total}
            onChange={(e) => {
              // setCurrentTab("index");
              window.scrollTo(0, 0);
              setActivePage(e);
            }}
            firstPageText="Previous"
            lastPageText="Next"
          />
        )}
      </div>
    </div>
  );
};

export default PaginationAdmin;
