/* eslint-disable */
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Image } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { existingActivitySearchGetAction } from 'store/actions/search';
import './style.scss';

const ExistingActivityCard = (props) => {
  const { activity, getActivityData, className } = props;

  const handleAddClick = (e) => {
    console.log('add clicked');
    getActivityData(activity.id);
  };

  return (
    <div className={`row existing-activity-card ${className}`}>
      <div className='col-3'>
        <Image src="https://images.pexels.com/photos/2917442/pexels-photo-2917442.jpeg?auto=compress&cs=tinysrgb&dpr=1&fit=crop&h=200&w=280" fluid rounded />
      </div>
      <div className='col-7'>
        <h3>{activity.title}</h3>
        <p>{activity.description}</p>
        <p>{`By: ${activity.user.first_name} ${activity.user.first_name}`}</p>
      </div>
      <div className='col-2'>
        <button className="btn btn-primary" onClick={handleAddClick}>
          <FontAwesomeIcon className="mr-2" icon="plus" />
          Add
        </button>
      </div>
    </div>
  );
};

ExistingActivityCard.propTypes = {

};

ExistingActivityCard.defaultProps = {

};

const mapDispatchToProps = (dispatch) => ({
  getActivityData: (activityId) => dispatch(existingActivitySearchGetAction(activityId)),  
});

const mapStateToProps = (state) => ({

});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ExistingActivityCard));
