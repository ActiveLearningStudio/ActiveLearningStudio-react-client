import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import MemberItem from './MemberItem';

import './style.scss';

function TeamMemberManagement(props) {
  const { teamInfo } = props;
  const { members } = teamInfo;
  const [selectedMember, setSelectedMember] = useState(null);

  return (
    <div className="row member-manage">
      <div className="col-md-12">
        <div className="team-information">
          <div className="col-md-12">
            <div className="member-management-wrapper">
              <div className="row">
                <div className="col-md-12">
                  <div className="search-box">
                    <input
                      type="text"
                      placeholder="Filter by name"
                      onChange={() => {}}
                    />
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-12">
                  <div className="member-list">
                    {members.map((member, index) => (
                      <MemberItem
                        key={`${member.firstName}${member.lastName}`}
                        selectMe={() => setSelectedMember(index)}
                        deselectMe={() => setSelectedMember(null)}
                        selected={selectedMember === index}
                        user={member}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

TeamMemberManagement.propTypes = {
  teamInfo: PropTypes.object.isRequired,
};

TeamMemberManagement.defaultProps = {};

const mapDispatchToProps = () => ({});

const mapStateToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(TeamMemberManagement);
