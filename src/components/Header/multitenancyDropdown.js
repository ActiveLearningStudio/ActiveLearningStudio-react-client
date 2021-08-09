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
  getRoles,
} from 'store/actions/organization';
import menu from 'assets/images/menu_square.png';

export default function MultitenancyDropdown() {
  const dispatch = useDispatch();
  const history = useHistory();
  const stateHeader = useSelector((state) => state.organization);
  const auth = useSelector((state) => state.auth);
  const [selectOrg, setSelectOrg] = useState(stateHeader.currentOrganization?.name || 'Select Organization');
  useEffect(() => {
    setSelectOrg(stateHeader.currentOrganization?.name || 'Select Organization');
  }, [stateHeader.currentOrganization]);
  useMemo(() => {
    if (auth?.user) {
      dispatch(getAllOrganization());
    }
  }, [auth?.user]);

  return (
    <Dropdown className="dropdown-multitenancy">
      <Dropdown.Toggle id="dropdown-basic">
        <img src={menu} alt="organizations" />
        <div className="text" title={selectOrg}>
          {selectOrg}
        </div>
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <h2 className="title">Organizations</h2>
        {stateHeader.allOrganizations.length > 0 && stateHeader.allOrganizations.map((org) => (
          <div className="all-tg-lister">
            <Dropdown.Item onClick={async () => {
              setSelectOrg(org.name);
              await dispatch(setCurrentOrganization(org));
              await dispatch(setActiveOrganization(org));
              await dispatch(getAllPermission(org.id));
              await dispatch(getRoles());
              storageService.setItem(CURRENT_ORG, org.domain);
              history.push(`/studio/org/${org.domain}`);
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
