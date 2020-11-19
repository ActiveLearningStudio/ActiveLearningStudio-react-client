import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import SearchForm from 'containers/LMS/Canvas/DeepLinking/SearchForm';
import './style.scss';

const SearchPage = (props) => {
  const {
    match,
    currentPage,
  } = props;

  // Init
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [match]);

  return (
    <div className="container canvas-search-page">
      <div className="row">
        <div className="col">
            { currentPage === 'search' && <SearchForm /> }
        </div>
      </div>
    </div>
  );
};

SearchPage.propTypes = {
  match: PropTypes.object.isRequired,
  currentPage: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
    currentPage: state.canvas.currentPage,
});

export default withRouter(connect(mapStateToProps)(SearchPage));
