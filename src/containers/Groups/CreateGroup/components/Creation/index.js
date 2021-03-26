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
    <div className="group-information">
      <FadeDiv>
        <div className="title-box">
          <h2 className="title">
            {editMode ? 'Edit ' : 'Create '}
            Group
          </h2>
          <div className="title-cross" />
        </div>

        <div className="create-group-wrapper">
          <h2 className="describe">
            {editMode ? ' Editing your group information ' : 'Start your group by adding a name and description'}
          </h2>

          <div className="creation-panel">
            <form className="create-group-form" onSubmit={handleSubmit}>
              <div className="group-info-input">
                <div className="group-name">
                  <Field
                    name="name"
                    component={InputField}
                    label="Group Name"
                    type="text"
                    validate={[required, maxName]}
                  />
                </div>

                <div className="group-description">
                  <Field
                    name="description"
                    component={TextareaField}
                    label="Group Description"
                    validate={[required, maxDescription]}
                  />
                </div>
              </div>

              <button type="submit" className="create-group-continue-btn">
                Continue
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
  handleSubmit: PropTypes.func.isRequired,
  editMode: PropTypes.bool.isRequired,
};

Creation = reduxForm({
  form: 'CreateGroupForm',
  enableReinitialize: true,
  onSubmit: (values, dispatch, props) => {
    try {
      const { updateGroup, nextStep } = props;
      updateGroup(values);
      nextStep();
    } catch (e) {
      console.log(e.message);
    }
  },
})(Creation);

const mapStateToProps = (state) => ({
  initialValues: {
    name: (state.group.selectedGroup && state.group.selectedGroup.name)
      ? state.group.selectedGroup.name
      : '',
    description: (state.group.selectedGroup && state.group.selectedGroup.description)
      ? state.group.selectedGroup.description
      : '',
  },
  group: state.group.selectedGroup,
});

export default connect(mapStateToProps)(Creation);
