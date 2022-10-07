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
import ChangeOrgSvg from 'iconLibrary/header/ChangeOrgSvg';

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
        <ChangeOrgSvg primaryColor={primaryColor} />
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
                  dispatch({
                    type: 'SET_ACTIVE_ACTIVITY_SCREEN',
                    payload: '',
                  });
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
