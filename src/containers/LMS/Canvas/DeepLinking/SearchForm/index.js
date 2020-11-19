import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { searchAction } from 'store/actions/canvas';
import './style.scss';

const SearchForm = (props) => {
  const {
    match,
  } = props;

  // Init
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [match]);

  return (
    <div className="row">
        <div className="col">
            Search Form here
        </div>
    </div>
  );
};

SearchPage.propTypes = {
  match: PropTypes.object.isRequired,
  search: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    params: state.canvas.params,
});

const mapDispatchToProps = (dispatch) => ({
    search: (params) => dispatch(searchAction(params)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SearchForm));