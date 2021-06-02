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
    size,
    setSize,
    activeRole,
    setActiveRole,
    searchQuery,
    subTypeState,
    searchQueryChangeHandler,
    searchAlertToggler,
    setActivePage,
    subType,
	setCurrentTab,
	setChangeIndexValue,
  } = props;
  return (
    <>
      <Controler
        paginationCounter={paginationCounter}
        search={search}
        print={print}
        btnText={btnText}
        type={type}
        size={size}
        activeRole={activeRole}
        setActiveRole={setActiveRole}
        setSize={setSize}
        subTypeState={subTypeState}
        btnAction={btnAction}
        searchQuery={searchQuery}
        searchQueryChangeHandler={searchQueryChangeHandler}
        importUser={importUser}
        filter={filter}
        tableHead={tableHead}
        roles={roles}
		subType={subType}
		setChangeIndexValue={setChangeIndexValue}
      />
      {roles?.length && subTypeState === "Manage Roles" ? (
        <Userroles />
      ) : (
        <TableData
          tableHead={tableHead}
          activePage={activePage}
          setActivePage={setActivePage}
          searchAlertToggler={searchAlertToggler}
          type={type}
          data={data}
          subType={subType}
		  setCurrentTab={setCurrentTab}
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
