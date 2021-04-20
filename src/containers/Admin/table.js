/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import Pagination from 'react-js-pagination';

function Table(props) {
  const {tableHead, data, type, activePage, setActivePage, meta} = props;

  return (
    <div className="table-data">
      <table>
        <thead>
          {tableHead?.map((head) => <th>{head}</th>)}
        </thead>
        <tbody>
          {type === 'Stats' && data?.map((row) => (
            <tr>
              <td>{row.name}</td>
              <td>{row.email}</td>
              <td>{row.age}</td>
              <td>{row.project}</td>
              <td>{row.counter}</td>
              <td>{row.flow}</td>
            </tr>
          ))}
          {type === 'Users' && data?.map((row) => (
            <tr>
              <td>{row.date ? row.date : 'Not available'}</td>
              <td>{row.firstName}</td>
              <td>{row.lastName}</td>
              <td>{row.email}</td>
              <td>{row.organization}</td>
              <td>{row.organization_type}</td>
              <td>{row.organization_role}</td>
              <td>
                <a href="#" style={{ float: 'left' }}> Edit </a>
                <a href="#" style={{ float: 'right' }}>Delete</a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination-top">
        <div className="pagination_state">
          Showing {activePage} to {meta?.per_page} of {meta?.total} results
        </div>
        <div class="main-pagination">
          {type === 'Users'
          &&
          <Pagination
            activePage={activePage}
            pageRangeDisplayed={5}
            CountPerPage={meta?.per_page}
            totalItemsCount={meta?.total}
            onChange={(e) => {
              setActivePage(e);
            }}
          />
          }
        </div>
      </div>
    </div>
  );
}

Table.propTypes = {
  headers: PropTypes.array.isRequired,
  data:PropTypes.object.isRequired,
};

export default Table;
