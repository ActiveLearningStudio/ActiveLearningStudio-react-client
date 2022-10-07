/* eslint-disable */
import React, { useState } from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import PropTypes from 'prop-types';

import Controller from './controller';
import TableData from './table';
import Userroles from './userroles';
// import Media from "./media";
// import Settings from './settings';
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
    sortCol,
    handleSort,
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
    searchQueryChangeHandlerLtiTool,
    searchLtiquery,
    setSearchQueryTeam,
    subType,
    inviteUser,
    setCurrentTab,
    setChangeIndexValue,
    changeIndexValue,
    permissionRender,
    selectedActivityType,
    setSelectedActivityType,
    libraryReqSelected,
    setLibraryReqSelected,
    setSubTypeState,
    projectFilterObj,
    setProjectFilterObj,
    filterSearch,
    setAllProjectTab,
    resetProjectFilter,
    setModalShow,
    setModalShowTeam,
    setrowData,
    setActivePageNumber,
    filteredItems,
    setCurrentActivity,
    setModalShowh5p,
    setSearchKey,
    filterLtiSettings,
    setfilterLtiSettings,
  } = props;
  return (
    <>
      <Controller
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
        selectedActivityType={selectedActivityType}
        setSelectedActivityType={setSelectedActivityType}
        libraryReqSelected={libraryReqSelected}
        setLibraryReqSelected={setLibraryReqSelected}
        setSubTypeState={setSubTypeState}
        projectFilterObj={projectFilterObj}
        setProjectFilterObj={setProjectFilterObj}
        filterSearch={filterSearch}
        resetProjectFilter={resetProjectFilter}
        setSearchQueryTeam={setSearchQueryTeam}
        filteredItems={filteredItems}
        setSearchKey={setSearchKey}
        setfilterLtiSettings={setfilterLtiSettings}
        filterLtiSettings={filterLtiSettings}
        searchQueryChangeHandlerLtiTool={searchQueryChangeHandlerLtiTool}
        searchLtiquery={searchLtiquery}
      />
      {/* {subTypeState === 'All settings' && <Settings />} */}
      {/* {subTypeState === "Media" && <Media />} */}
      {subTypeState === 'Manage Roles' ? (
        <Userroles permissionRender={permissionRender} />
      ) : (
        <TableData
          tableHead={tableHead}
          sortCol={sortCol}
          handleSort={handleSort}
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
          setAllProjectTab={setAllProjectTab}
          setModalShow={setModalShow}
          setModalShowTeam={setModalShowTeam}
          setrowData={setrowData}
          setActivePageNumber={setActivePageNumber}
          setCurrentActivity={setCurrentActivity}
          setModalShowh5p={setModalShowh5p}
          filterLtiSettings={filterLtiSettings}
        />
      )}
    </>
  );
}

Starter.propTypes = {
  manage: PropTypes.object,
  type: PropTypes.string.isRequired,
};

export default Starter;
