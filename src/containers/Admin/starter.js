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
    jobType,
    SetJobType,
    logType,
    SetLogType,
    size,
    setSize,
    activeRole,
    setActiveRole,
    searchQueryActivities,
    setSearchQueryActivities,
    searchQuery,
    searchQueryProject,
    setSearchQueryProject,
    searchQueryStats,
    setSearchQueryStats,
    setSearchQuery,
    subTypeState,
    setAllProjectIndexTab,
    searchQueryChangeHandler,
    searchProjectQueryChangeHandler,
    searchActivitiesQueryHandler,
    searchUserReportQueryHandler,
    searchAlertToggler,
    searchAlertTogglerStats,
    setActivePage,
    subType,
    inviteUser,
    setCurrentTab,
    setChangeIndexValue,
    changeIndexValue,
    permissionRender,
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
        jobType={jobType}
        SetJobType={SetJobType}
        logType={logType}
        SetLogType={SetLogType}
        searchQueryActivities={searchQueryActivities}
        setSearchQueryActivities={setSearchQueryActivities}
        searchQuery={searchQuery}
        searchQueryProject={searchQueryProject}
        setSearchQueryProject={setSearchQueryProject}
        searchQueryStats={searchQueryStats}
        setSearchQueryStats={setSearchQueryStats}
        setSearchQuery={setSearchQuery}
        setActivePage={setActivePage}
        searchProjectQueryChangeHandler={searchProjectQueryChangeHandler}
        searchActivitiesQueryHandler={searchActivitiesQueryHandler}
        searchUserReportQueryHandler={searchUserReportQueryHandler}
        searchQueryChangeHandler={searchQueryChangeHandler}
        importUser={importUser}
        setAllProjectIndexTab={setAllProjectIndexTab}
        filter={filter}
        tableHead={tableHead}
        inviteUser={inviteUser}
        roles={roles}
        subType={subType}
        setChangeIndexValue={setChangeIndexValue}

      />
      {subTypeState === 'All settings' && <Settings /> }
      {subTypeState === "Manage Roles" ? (
        <Userroles permissionRender={permissionRender} />
      ) : (
        <TableData
          tableHead={tableHead}
          activePage={activePage}
          setActivePage={setActivePage}
          searchAlertToggler={searchAlertToggler}
          searchAlertTogglerStats={searchAlertTogglerStats}
          type={type}
          jobType={jobType}
          data={data}
          subType={subType}
          changeIndexValue={changeIndexValue}
          setAllProjectIndexTab={setAllProjectIndexTab}
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
