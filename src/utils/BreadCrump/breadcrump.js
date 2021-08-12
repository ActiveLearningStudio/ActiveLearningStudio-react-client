import React from 'react';
import PropTypes from 'prop-types';
import Swal from 'sweetalert2';
import { setActiveTab } from 'store/actions/admin';
import { useDispatch, useSelector } from 'react-redux';
import * as actionTypes from 'store/actionTypes';
import {
  getOrganization,
  clearOrganizationState,
  getRoles,
} from 'store/actions/organization';

import './breadcrump.scss';

const Breadcrump = ({ text }) => {
  const { paginations } = useSelector((state) => state.ui);
  const dispatch = useDispatch();
  return (
    <div className="utility curriki-Breadcrump">
      {text}
      {paginations && paginations.map((bread, counter) => (
        <a
          href="#"
          className=""
          key={bread.id}
          onClick={async () => {
            Swal.fire({
              title: 'Please Wait !',
              html: 'Updating View ...',
              allowOutsideClick: false,
              onBeforeOpen: () => {
                Swal.showLoading();
              },
            });
            dispatch({
              type: actionTypes.ADD_SUBORG_LIST,
              payload: null,
            });
            await dispatch(getOrganization(bread.id));
            Swal.close();
            dispatch(clearOrganizationState());
            dispatch(getRoles());
            dispatch({
              type: actionTypes.UPDATE_PAGINATION,
              payload: paginations?.slice(0, counter + 1),
            });
            dispatch(setActiveTab('Organization'));
          }}
        >
          {bread.name}
          &nbsp;&gt;&nbsp;
        </a>
      ))}
    </div>
  );
};
Breadcrump.propTypes = {
  text: PropTypes.string.isRequired,
};
export default Breadcrump;
