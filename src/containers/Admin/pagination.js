/* eslint-disable */
import React from 'react';
import { useDispatch } from 'react-redux';
import Pagination from 'react-js-pagination';

const PaginationAdmin = ({ type, setCurrentTab, subTypeState, subType, data, activePage, setActivePage, updatePageNumber, localstatePagination }) => {
  const dispatch = useDispatch();
  return (
    <div className="pagination-top">
      {data?.meta && (
        <div className="pagination_state">
          Showing {data?.meta?.from} - {data?.meta?.to} of {data?.meta?.total}
        </div>
      )}
      <div className="main-pagination">
        {type === 'Stats' && subTypeState === 'Report' && (
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
        {type === 'Organization' && (
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
            firstPageText="First"
            lastPageText="Last"
          />
        )}
        {type === 'Stats' && subTypeState === 'Queues: Logs' && (
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
        {type === 'Stats' && subTypeState === 'Queues: Jobs' && (
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
        {type === 'Users' && (
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
            firstPageText="First"
            lastPageText="Last"
          />
        )}
        {type === 'IndActivities' && (
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
            firstPageText="First"
            lastPageText="Last"
          />
        )}
        {type === 'Projects' && subType === 'All Projects' && (
          <Pagination
            activePage={activePage}
            pageRangeDisplayed={5}
            itemsCountPerPage={data?.meta?.per_page}
            totalItemsCount={data?.meta?.total}
            onChange={(e) => {
              window.scrollTo(0, 0);
              setCurrentTab('All Projects');
              setActivePage(e);
              dispatch(updatePageNumber(e));
            }}
            // Editing
            firstPageText="First"
            lastPageText="Last"
          />
        )}
        {type === 'Projects' && subType === 'Exported Projects' && (
          <Pagination
            activePage={activePage}
            pageRangeDisplayed={5}
            itemsCountPerPage={localstatePagination?.meta?.per_page}
            totalItemsCount={localstatePagination?.meta?.total}
            onChange={(e) => {
              window.scrollTo(0, 0);
              setCurrentTab('Exported Projects');
              setActivePage(e);
              dispatch(updatePageNumber(e));
            }}
            firstPageText="First"
            lastPageText="Last"
          />
        )}
        {type === 'Projects' && subType === 'Library requests' && (
          <Pagination
            activePage={activePage}
            pageRangeDisplayed={5}
            itemsCountPerPage={localstatePagination?.meta?.per_page}
            totalItemsCount={localstatePagination?.meta?.total}
            onChange={(e) => {
              window.scrollTo(0, 0);
              setCurrentTab('Library requests');
              setActivePage(e);
              dispatch(updatePageNumber(e));
            }}
            firstPageText="First"
            lastPageText="Last"
          />
        )}
        {type === 'Activities' && subType === 'Activity Types' && data?.meta && (
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
            firstPageText="First"
            lastPageText="Last"
          />
        )}
        {type === 'Activities' && subType === 'Activity Items' && (
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
            firstPageText="First"
            lastPageText="Last"
          />
        )}
        {type === 'Activities' && subType === 'Subjects' && (
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
            firstPageText="First"
            lastPageText="Last"
          />
        )}
        {type === 'Activities' && subType === 'Education Level' && (
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
            firstPageText="First"
            lastPageText="Last"
          />
        )}
        {type === 'Activities' && subType === 'Author Tags' && (
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
            firstPageText="First"
            lastPageText="Last"
          />
        )}
        {type === 'Activities' && subType === 'Activity Layouts' && (
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
            firstPageText="First"
            lastPageText="Last"
          />
        )}
        {type === 'LMS' && (
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
            firstPageText="First"
            lastPageText="Last"
          />
        )}
        {type === 'DefaultSso' && (
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
            firstPageText="First"
            lastPageText="Last"
          />
        )}
        {type === 'Video Integration' && subType === 'BrightCove API Settings' && (
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
            firstPageText="First"
            lastPageText="Last"
          />
        )}
        {type === 'Video Integration' && (
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
            firstPageText="First"
            lastPageText="Last"
          />
        )}
        {type === 'Teams' && (
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
      </div>
    </div>
  );
};

export default PaginationAdmin;
