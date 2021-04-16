/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';

function Table(props) {
  const {tableHead, data, type} = props;
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
        </tbody>
      </table>
      <div className="pagination">
        <div className="pagination_state">
          Showing 25 out of 1000 results
        </div>
        <div class="main-pagination">
          main pagination
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
