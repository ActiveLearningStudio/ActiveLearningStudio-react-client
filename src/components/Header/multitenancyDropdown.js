import React from 'react';
import { Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function MultitenancyDropdown() {
  return (
    <Dropdown className="dropdown-multitenancy">
      <Dropdown.Toggle id="dropdown-basic">
        <p>Organization</p>
        Lake Valley Island Education District
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item as={Link} to="/manage-organizations">Manage Organization</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}
