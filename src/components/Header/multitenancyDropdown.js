import React, { useEffect, useMemo, useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { getAllOrganization, setActiveOrganization } from 'store/actions/organization';

export default function MultitenancyDropdown() {
  const dispatch = useDispatch();
  const history = useHistory();
  const stateHeader = useSelector((state) => state.organization);
  const [selectOrg, setSelectOrg] = useState(stateHeader.activeOrganization?.name || 'Select Organization');
  useEffect(() => {
    setSelectOrg(stateHeader.activeOrganization?.name || 'Select Organization');
  }, [stateHeader.activeOrganization]);
  useMemo(() => {
    dispatch(getAllOrganization());
  }, []);

  return (
    <Dropdown className="dropdown-multitenancy">
      <Dropdown.Toggle id="dropdown-basic">
        <p>
          Organization
        </p>
        {selectOrg}
      </Dropdown.Toggle>
      <Dropdown.Menu>
        {stateHeader.allOrganizations.length > 0 && stateHeader.allOrganizations.map((org) => (
          <Dropdown.Item onClick={() => {
            setSelectOrg(org.name);
            dispatch(setActiveOrganization(org));
            history.push(`/org/${org.domain}`);
          }}
          >
            {org.name}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
}
