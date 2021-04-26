import React, { useEffect, useMemo, useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import storageService from 'services/storage.service';
import { CURRENT_ORG } from 'constants/index';
import {
  getAllOrganization,
  setCurrentOrganization,
  setActiveOrganization,
  getAllPermission,
} from 'store/actions/organization';
import menu from 'assets/images/menu_square.png';

export default function MultitenancyDropdown() {
  const dispatch = useDispatch();
  const history = useHistory();
  const stateHeader = useSelector((state) => state.organization);
  const [selectOrg, setSelectOrg] = useState(stateHeader.currentOrganization?.name || 'Select Organization');
  useEffect(() => {
    setSelectOrg(stateHeader.currentOrganization?.name || 'Select Organization');
  }, [stateHeader.currentOrganization]);
  useMemo(() => {
    dispatch(getAllOrganization());
  }, []);

  return (
    <Dropdown className="dropdown-multitenancy">
      <Dropdown.Toggle id="dropdown-basic">
        <img src={menu} alt="organizations" />
        <div className="text" title={selectOrg}>
          My Subscriptions
        </div>
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <h2 className="title">My subscriptions</h2>
        {stateHeader.allOrganizations.length > 0 && stateHeader.allOrganizations.map((org) => (
          <div className="all-tg-lister">
            <Dropdown.Item onClick={() => {
              setSelectOrg(org.name);
              dispatch(setCurrentOrganization(org));
              dispatch(setActiveOrganization(org));
              dispatch(getAllPermission(org.id));
              storageService.setItem(CURRENT_ORG, org.domain);
              history.push(`/org/${org.domain}`);
            }}
            >
              {org.name}
            </Dropdown.Item>
            <p>
              Parent:
              &nbsp;
              {org?.parent?.name || 'NA'}
            </p>
            <p>
              Domain:
              &nbsp;
              {org?.domain || 'NA'}
            </p>
          </div>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
}
