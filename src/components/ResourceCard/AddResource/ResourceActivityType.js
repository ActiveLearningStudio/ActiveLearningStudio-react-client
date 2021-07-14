import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';

import { required, FadeDiv } from 'utils';
import {
  loadResourceTypesAction,
  showSelectActivityAction,
  onChangeActivityTypeAction,
} from 'store/actions/resource';
import InputField from 'components/InputField';
// import AddResourceSidebar from './AddResourceSidebar';

import './style.scss';

const ResourceActivityTypeField = (props) => (
  <InputField {...props} showLabel={false} />
);

let ResourceActivityType = (props) => {
  const {
    resource,
    loadResourceTypes,
    selectType,
    type,
    setActiveView,
  } = props;
  const { types: activityTypes } = resource;

  useEffect(() => {
    loadResourceTypes();
  }, [loadResourceTypes]);

  const { handleSubmit, onChangeActivityType } = props;

  const activityTypesContent = activityTypes?.map((activityType) => (
    <div className="col-md-3" key={activityType.id}>
      <label className="activity-label">
        <Field
          name="activityType"
          component={ResourceActivityTypeField}
          type="radio"
          value={`${activityType.id}`}
          onChange={() => {
            onChangeActivityType(activityType.id);
            selectType([...type, 'select']);
            setActiveView('select');
          }}
          validate={[required]}
        />

        <div className="activity-item">
          <div
            className="activity-img"
            style={{ backgroundImage: `url(${global.config.resourceUrl}${activityType.image})` }}
          />

          <div className="activity-content">
            <span>{activityType.title}</span>
          </div>
        </div>
      </label>
    </div>
  ));

  return (
    <div className="row">
      {/* <div className="col-md-3">
        <AddResourceSidebar {...props} />
      </div> */}
      <div className="col-md-12">
        <div className="resource-activity">
          <FadeDiv>
            <div className="row">
              <div className="col-md-12">
                <h2 className="title">Pick Activity Type</h2>

                <div className="activity-content">
                  <p>
                    Create memorable learning experiences from one of the
                    activity types below:
                  </p>
                </div>
              </div>
            </div>

            <form
              className="row meta-form"
              onSubmit={handleSubmit}
              autoComplete="off"
            >
              {activityTypesContent}
            </form>
          </FadeDiv>
        </div>
      </div>
    </div>
  );
};

ResourceActivityType.propTypes = {
  resource: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  loadResourceTypes: PropTypes.func.isRequired,
  onChangeActivityType: PropTypes.func.isRequired,
  selectType: PropTypes.func.isRequired,
  type: PropTypes.array.isRequired,
  setActiveView: PropTypes.func.isRequired,
};

ResourceActivityType = reduxForm({
  form: 'activityTypeForm',
  enableReinitialize: true,
  onSubmit: async (values, dispatch, props) => {
    try {
      props.onChangeActivityType();
      const data = values.activityType;
      props.showSelectActivity(data);
    } catch (e) {
      // console.log(e.message);
    }
  },
  onChange: (values, dispatch, props) => {
    // props.onChangeActivityType(values.activityType);
    const data = values.activityType;
    props.showSelectActivity(data);
    // props.submit();
  },
})(ResourceActivityType);

const mapDispatchToProps = (dispatch) => ({
  loadResourceTypes: () => dispatch(loadResourceTypesAction()),
  showSelectActivity: (activityType) => dispatch(showSelectActivityAction(activityType)),
  onChangeActivityType: (activityTypeId) => dispatch(onChangeActivityTypeAction(activityTypeId)),
});

const mapStateToProps = (state) => ({
  resource: state.resource,
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ResourceActivityType),
);
