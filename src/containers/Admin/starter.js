/* eslint-disable */
import React, { useState } from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import PropTypes from 'prop-types';

import Controler from './controler';
import TableData from './table';
import Userroles from './userroles';
import Settings from './settings';
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
    searchProjectQueryChangeHandler,
    searchActivitiesQueryHandler,
    searchAlertToggler,
    setActivePage,
    subType,
    inviteUser,
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
        searchProjectQueryChangeHandler={searchProjectQueryChangeHandler}
        searchActivitiesQueryHandler={searchActivitiesQueryHandler}
        searchQueryChangeHandler={searchQueryChangeHandler}
        importUser={importUser}
        filter={filter}
        tableHead={tableHead}
        inviteUser={inviteUser}
        roles={roles}
        subType={subType}
        setChangeIndexValue={setChangeIndexValue}
      />
      {subTypeState === 'All settings' && <Settings /> }
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
          subTypeState={subTypeState}
          setCurrentTab={setCurrentTab}
        />
      )}
    </>
  );
}

Starter.propTypes = {
  manage: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
};

export default Starter;
