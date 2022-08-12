/* eslint-disable */
import React, { useEffect, useMemo, useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import storageService from 'services/storage.service';
import { CURRENT_ORG } from 'constants/index';
import { getAllOrganization, setCurrentOrganization, setActiveOrganization, getAllPermission, getRoles } from 'store/actions/organization';
import { DynamicBrandingApply } from 'containers/App/DynamicBrandingApply';

import { getGlobalColor } from 'containers/App/DynamicBrandingApply';

export default function MultitenancyDropdown() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [sortedOrganizations, setSortedOrganizations] = useState([]);
  const stateHeader = useSelector((state) => state.organization);
  const auth = useSelector((state) => state.auth);
  const [selectOrg, setSelectOrg] = useState(stateHeader.currentOrganization?.name || 'Select Organization');
  const sortStateHeaderAlphabetically = () => {
    // Sort stateHeader.allOrganizations array of objects alphabetically and store in new array and return it using filter
    const sortedOrganization = stateHeader.allOrganizations.sort((a, b) => {
      const nameA = a.name.toUpperCase(); // ignore upper and lowercase
      const nameB = b.name.toUpperCase(); // ignore upper and lowercase
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      // names must be equal
      return 0;
    });
    setSortedOrganizations(sortedOrganization);
  };
  useEffect(() => {
    setSelectOrg(stateHeader.currentOrganization?.name || 'Select Organization');
    if (stateHeader?.allOrganizations.length > 0) {
      sortStateHeaderAlphabetically();
    }
  }, [stateHeader.currentOrganization, stateHeader.allOrganizations]);
  useMemo(() => {
    if (auth?.user) {
      dispatch(getAllOrganization());
    }
  }, [auth?.user]);
  const primaryColor = getGlobalColor('--main-primary-color');
  return (
    <Dropdown className="dropdown-multitenancy">
      <Dropdown.Toggle id="dropdown-basic">
        {/* <img src={menu} alt="organizations" /> */}
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M9.28366 3H4.31782C3.59167 3 3.00098 3.59076 3.00098 4.31699V9.28336C3.00098 10.0096 3.59167 10.6003 4.31782 10.6003H9.28366C10.0098 10.6003 10.6005 10.0096 10.6005 9.28336V4.31699C10.6004 3.59076 10.0098 3 9.28366 3Z"
            stroke={primaryColor}
            strokeWidth="2"
          />
          <path
            d="M19.6831 3H14.7172C13.9911 3 13.4004 3.59076 13.4004 4.31699V9.28336C13.4004 10.0096 13.9911 10.6003 14.7172 10.6003H19.6831C20.4092 10.6003 20.9999 10.0096 20.9999 9.28336V4.31699C20.9999 3.59076 20.4092 3 19.6831 3Z"
            stroke={primaryColor}
            strokeWidth="2"
          />
          <path
            d="M9.28269 13.3994H4.31685C3.59069 13.3994 3 13.9901 3 14.7163V19.6827C3 20.4089 3.59069 20.9997 4.31685 20.9997H9.28269C10.0088 20.9997 10.5995 20.4089 10.5995 19.6827V14.7163C10.5994 13.9901 10.0088 13.3994 9.28269 13.3994Z"
            stroke={primaryColor}
            strokeWidth="2"
          />
          <path
            d="M19.6821 13.3994H14.7163C13.9901 13.3994 13.3994 13.9902 13.3994 14.7164V19.6828C13.3994 20.409 13.9901 20.9998 14.7163 20.9998H19.6821C20.4083 20.9997 20.999 20.409 20.999 19.6827V14.7163C20.999 13.9901 20.4083 13.3994 19.6821 13.3994Z"
            stroke={primaryColor}
            strokeWidth="2"
          />
        </svg>
        <div className="text" title={selectOrg}>
          {/* {selectOrg} */}
          Change Organization
        </div>
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <h2 className="title">Organizations</h2>
        {stateHeader.allOrganizations.length > 0 &&
          sortedOrganizations?.map((org, key) => (
            <div key={key} className="all-tg-lister">
              <Dropdown.Item
                onClick={async () => {
                  DynamicBrandingApply(org);
                  setSelectOrg(org.name);
                  await dispatch(setCurrentOrganization(org));
                  await dispatch(setActiveOrganization(org));
                  await dispatch(getAllPermission(org.id));
                  await dispatch(getRoles());
                  storageService.setItem(CURRENT_ORG, org.domain);
                  history.push(`/org/${org.domain}/activities`);
                }}
              >
                {org.name}
              </Dropdown.Item>
              <p>
                Parent: &nbsp;
                {org?.parent?.name || 'NA'}
              </p>
              <p>
                Domain: &nbsp;
                {org?.domain || 'NA'}
              </p>
            </div>
          ))}
      </Dropdown.Menu>
    </Dropdown>
  );
}
