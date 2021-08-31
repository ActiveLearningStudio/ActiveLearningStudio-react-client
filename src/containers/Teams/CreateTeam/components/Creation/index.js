import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

import { FadeDiv, required, maxLength } from 'utils';
import InputField from 'components/InputField';
import TextareaField from 'components/TextareaField';

import './style.scss';

const maxName = maxLength(80);
const maxDescription = maxLength(1000);

let Creation = (props) => {
  const { handleSubmit, editMode } = props;

  return (
    <div className="team-information">
      <FadeDiv>
        <div className="title-box">
          <h2 className="title">
            {editMode ? 'Edit ' : 'Create '}
            Team
          </h2>
          <div className="title-cross" />
        </div>

        <div className="create-team-wrapper">
          <h2 className="describe">
            {editMode ? ' Editing your team information ' : ' Start your team by adding a name and description '}
          </h2>

          <div className="creation-panel">
            <form className="create-team-form" onSubmit={handleSubmit}>
              <div className="team-info-input">
                <div className="team-name">
                  <Field
                    name="name"
                    component={InputField}
                    label="Team Name"
                    type="text"
                    validate={[required, maxName]}
                  />
                </div>

                <div className="team-description">
                  <Field
                    name="description"
                    component={TextareaField}
                    label="Team Description"
                    validate={[required, maxDescription]}
                  />
                </div>
              </div>

              <button
                type="submit"
                className="create-team-continue-btn"
              //   onClick={() => {
              //     if (editMode) {
              //       handleSubmitInEditMode();
              //     }
              // }}
              >
                {editMode ? 'Update' : 'Continue'}
              </button>
            </form>
          </div>
        </div>
      </FadeDiv>
    </div>
  );
};

Creation.propTypes = {
  // updateTeam: PropTypes.func.isRequired,
  // nextStep: PropTypes.func.isRequired,
  // handleSubmitInEditMode: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  editMode: PropTypes.bool.isRequired,
};

Creation = reduxForm({
  form: 'CreateTeamForm',
  enableReinitialize: true,
  onSubmit: async (values, dispatch, props) => {
    try {
      const {
        updateTeam,
        nextStep,
        editMode,
        handleSubmitInEditMode,
      } = props;
      await updateTeam(values);
      if (editMode) {
        handleSubmitInEditMode();
      }
      if (!editMode) {
        nextStep();
      }
    } catch (e) {
      console.log(e.message);
    }
  },
})(Creation);

const mapStateToProps = (state) => ({
  initialValues: {
    name: (state.team.selectedTeam && state.team.selectedTeam.name)
      ? state.team.selectedTeam.name
      : '',
    description: (state.team.selectedTeam && state.team.selectedTeam.description)
      ? state.team.selectedTeam.description
      : '',
  },
  team: state.team.selectedTeam,
});

export default connect(mapStateToProps)(Creation);
