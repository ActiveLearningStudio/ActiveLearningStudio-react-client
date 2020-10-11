import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

import { FadeDiv, required, maxLength } from 'utils';
import InputField from 'components/InputField';
import TextareaField from 'components/TextareaField';

const maxLength255 = maxLength(255);

let Creation = (props) => {
  const { handleSubmit } = props;

  return (
    <div className="row">
      <div className="col-md-10">
        <div className="team-information">
          <FadeDiv>
            <div className="row">
              <div className="col-md-12">
                <h2 className="title">Create Team</h2>
                <h2 className="describe">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Praesent vehicula scelerisque lacus quis sagittis.
                  Aenean et nulla ac mauris fringilla placerat ac eu turpis.
                </h2>
              </div>
            </div>

            <div className="row">
              <div className="col-md-12">
                <div className="create-team-wrapper">
                  <form
                    className="create-team-form"
                    onSubmit={handleSubmit}
                    autoComplete="off"
                  >
                    <div className="row">
                      <div className="col-md-12 team-info-input">
                        <div className="team-name">
                          <Field
                            name="teamName"
                            component={InputField}
                            label="Team Name"
                            validate={[required]}
                          />
                        </div>

                        <div className="team-description">
                          <Field
                            name="description"
                            component={TextareaField}
                            label="Team Description"
                            validate={[maxLength255]}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-12">
                        <button type="submit" className="create-team-continue-btn">
                          Continue
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </FadeDiv>
        </div>
      </div>
    </div>
  );
};

Creation.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  // nextStep: PropTypes.func.isRequired,
};

Creation = reduxForm({
  form: 'CreateTeamForm',
  enableReinitialize: true,
  onSubmit: (values, dispatch, props) => {
    try {
      const { nextStep } = props;
      nextStep();
    } catch (e) {
      console.log(e.message);
    }
  },
})(Creation);

const mapDispatchToProps = () => ({});

const mapStateToProps = (state) => ({
  team: state.team,
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Creation),
);
