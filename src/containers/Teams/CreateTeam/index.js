import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import {
  saveAndExitCreateTeam,
  showAssigningAction,
  showCreationAction,
  showInvitingAction,
} from 'store/actions/team';
import CreateTeamSidebar from './components/CreateTeamSidebar';
import Creation from './components/Creation';
import InviteTeam from './components/InviteTeam';
import AssignProject from './components/AssignProject';

import './style.scss';

// TODO: need to restructure code, clean up attributes
const CreateTeam = (props) => {
  const {
    team,
    showCreate,
    showInvite,
    showAssign,
    finishCreation,
  } = props;

  const {
    showCreation,
    showInviting,
    showAssigning,
  } = team;

  useEffect(() => {
    showCreate();
  }, [showCreate]);

  return (
    <div className="create-team">
      <div><CreateTeamSidebar team={team} /></div>

      <div style={{ flex: '100%' }}>
        {showCreation && <Creation nextStep={showInvite} />}
        {showInviting && <InviteTeam nextStep={showAssign} />}
        {showAssigning && <AssignProject finishStep={finishCreation} />}
      </div>

      <div />
    </div>
  );
};

CreateTeam.propTypes = {
  team: PropTypes.object.isRequired,
  showCreate: PropTypes.func.isRequired,
  showInvite: PropTypes.func.isRequired,
  showAssign: PropTypes.func.isRequired,
  finishCreation: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  showCreate: () => dispatch(showCreationAction()),
  showInvite: () => dispatch(showInvitingAction()),
  showAssign: () => dispatch(showAssigningAction()),
  finishCreation: () => dispatch(saveAndExitCreateTeam()),
});

const mapStateToProps = (state) => ({
  team: state.team,
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CreateTeam),
);
