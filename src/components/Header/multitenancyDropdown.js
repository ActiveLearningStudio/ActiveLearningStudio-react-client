import React from 'react';
import { Dropdown } from 'react-bootstrap';

export default function MultitenancyDropdown() {
  return (
    <Dropdown className="dropdown-multitenancy">
      <Dropdown.Toggle id="dropdown-basic">
        <p>Organization</p>
        Lake Valley Island Education District
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item href="#/action-1">Manage Organization</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}
