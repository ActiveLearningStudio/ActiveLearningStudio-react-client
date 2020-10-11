import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { reduxForm } from 'redux-form';

import { FadeDiv } from 'utils';

const projectData = [
  {
    thumbUrl: '',
    title: 'Globalization, Robots And You',
  },
  {
    thumbUrl: '',
    title: 'Training Like a Super Hero',
  },
  {
    thumbUrl: '',
    title: 'Voices of History',
  },
];

let AssignProject = ({ handleSubmit }) => {
  const projectCard = (project) => (
    <div key={project.title} className="assign-project-item">
      <img src={project.thumbUrl} alt={project.thumbUrl} />

      <label className="container">
        <input
          type="radio"
          name="action"
          className="assign-project-radio"
          value={project.title}
        />

        <span className="checkmark" />
      </label>

      <div className="assign-project-title">{project.title}</div>
    </div>
  );

  return (
    <div className="row">
      <div className="col-md-12">
        <div className="team-information">
          <FadeDiv>
            <div className="row">
              <div className="col-md-12">
                <h2 className="title">Add/Assign Project</h2>
              </div>
            </div>

            <div className="row">
              <div className="col-md-12">
                <div className="assign-project-wrapper">
                  <form
                    className="create-team-form"
                    autoComplete="off"
                    onSubmit={handleSubmit}
                  >
                    <div className="row">
                      <div className="col-md-12 assign-projects">
                        {projectData.map((project) => projectCard(project))}
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-12">
                        <button type="submit" className="create-team-submit-btn">Save & Finish</button>
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

AssignProject.propTypes = {
  // finishStep: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

AssignProject.defaultProps = {};

AssignProject = reduxForm({
  form: 'finishCreateTeamForm',
  enableReinitialize: true,
  onSubmit: (values, dispatch, props) => {
    try {
      const { finishStep } = props;
      finishStep();
      window.location.href = '/teams';
    } catch (e) {
      console.log(e.message);
    }
  },
})(AssignProject);

const mapDispatchToProps = () => ({});

const mapStateToProps = (state) => ({
  team: state.team,
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AssignProject),
);
