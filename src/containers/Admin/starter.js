/* eslint-disable */
import React, { useState } from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import PropTypes from 'prop-types';

import Controler from './controler';
import TableData from './table';
import Userroles from './userroles';

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
    data,
    roles,
    activePage,
    setActivePage,
    meta,
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
        roles={roles}
      />
      {roles?.length ? (
       <Userroles />
      ):(
      <TableData
        tableHead={tableHead}
        activePage={activePage}
        setActivePage={setActivePage}
        type={type}
        data={data}
        meta={meta}
      />
      )}
    </>

  );
}

Starter.propTypes = {
  manage: PropTypes.object.isRequired,
  type:PropTypes.string.isRequired,
};

export default Starter;
