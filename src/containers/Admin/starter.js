/* eslint-disable */
import React, { useState } from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import PropTypes from 'prop-types';

import Controler from './controler';
import TableData from './table'

function Starter(props) {
  const { 
    paginationCounter,
    search,
    print,
    btnText,
    btnAction,
    importUser,
    filter,
    tableHead,
    type,
    headerTable,
    data,
  } = props;
  return (
    <>
      <Controler
        paginationCounter={paginationCounter}
        search={search}
        print={print}
        btnText={btnText}
        btnAction={btnAction}
        importUser={importUser}
        filter={filter}
        tableHead={tableHead}
      />
      <TableData
        tableHead={tableHead}
        type={type}
        data={data}
        
      />
    </>
          
  );
}

Starter.propTypes = {
  manage: PropTypes.object.isRequired,
  type:PropTypes.string.isRequired,
};

export default Starter;
