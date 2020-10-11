import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import { FadeDiv } from 'utils';
import MemberItem from './MemberItem';

const ADMIN = 'Admin';
const USER = 'User';
const members = [
  {
    firstName: 'Abby',
    lastName: 'Rose',
    role: ADMIN,
    invited: true,
    projects: [],
  },
  {
    firstName: 'Leo',
    lastName: 'Chunha',
    role: USER,
    invited: true,
    projects: [
      'Math1',
      'Logic1',
    ],
  },
  {
    firstName: 'Jitendra',
    lastName: 'Gurjar',
    role: USER,
    invited: false,
    projects: [
      'Math1',
      'Logic1',
      'Math2',
      'Logic2',
    ],
  },
  {
    firstName: 'Helen',
    lastName: 'P',
    role: USER,
    invited: false,
    projects: [
      'Math3',
    ],
  },
  {
    firstName: 'Fred',
    lastName: 'Rose',
    role: USER,
    invited: false,
    projects: [
      'Math2',
      'Logic1',
    ],
  },
  {
    firstName: 'Helen',
    lastName: 'Roy',
    role: USER,
    invited: false,
    projects: [
      'Math2',
      'Logic1',
    ],
  },
];

function InviteTeam(props) {
  const { nextStep } = props;
  const [selectedMember, setSelectedMember] = useState(null);

  return (
    <div className="row">
      <div className="col-md-12">
        <div className="team-information">
          <FadeDiv>
            <div className="row">
              <div className="col-md-12">
                <h2 className="title">Invite Team Members</h2>
              </div>
            </div>

            <div className="row">
              <div className="col-md-12">
                <div className="invite-member-wrapper">
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

                  <div className="row">
                    <div className="col-md-12">
                      <button
                        type="button"
                        className="create-team-continue-btn"
                        onClick={nextStep}
                      >
                        Continue
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </FadeDiv>
        </div>
      </div>
    </div>
  );
}

InviteTeam.propTypes = {
  nextStep: PropTypes.func.isRequired,
};

export default withRouter(InviteTeam);
