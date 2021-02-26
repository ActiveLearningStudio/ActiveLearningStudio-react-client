import React from 'react';
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { updateOrganizationScreen } from 'store/actions/organization';
import childOrgImage from 'assets/images/child-organization-image.png';

export default function AllOrganizations() {
  const dispatch = useDispatch();

  return (
    <div className="all-organizations">
      <div className="organizations-create">
        <h3>Organizations</h3>
        <div className="button-create" onClick={() => dispatch(updateOrganizationScreen('create-org'))}>
          Create Organization
        </div>
      </div>
      <div className="box-all-organization">
        <div className="search-all">
          <div className="input-with-icon">
            <input className="form-search" type="text" placeholder="Search organization" />
            <FontAwesomeIcon icon="search" />
          </div>
          <div className="filter">
            Filter1
          </div>
          <div className="filter">
            Filter2
          </div>
        </div>
        <div className="paginationbox">
          <div className="count-pages">
            1-20 of 100
          </div>
        </div>
        <div className="all-list">
          <div className="org-block">
            <img src={childOrgImage} alt="" />
            <div className="meta-info">
              <div className="info">
                <div>
                  <h4>Technical institute</h4>
                  <h5>Admin: Leo Cuhna</h5>
                </div>
                <p>Ed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium</p>
              </div>
              <div className="meta">
                <span className="data-values">20 User</span>
                <span className="data-values">10 Group</span>
                <span className="data-values">3 Teams</span>
                <span className="data-values">15 Projects</span>
              </div>
            </div>
            <div className="crud">
              <div className="submit">Manage</div>
              <div className="submit">Edit</div>
              <div className="submit">Delete</div>
            </div>
          </div>
          <div className="org-block">
            <img src={childOrgImage} alt="" />
            <div className="meta-info">
              <div className="info">
                <div>
                  <h4>Technical institute</h4>
                  <h5>Admin: Leo Cuhna</h5>
                </div>
                <p>Ed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium</p>
              </div>
              <div className="meta">
                <span className="data-values">20 User</span>
                <span className="data-values">10 Group</span>
                <span className="data-values">3 Teams</span>
                <span className="data-values">15 Projects</span>
              </div>
            </div>
            <div className="crud">
              <div className="submit">Manage</div>
              <div className="submit">Edit</div>
              <div className="submit">Delete</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
