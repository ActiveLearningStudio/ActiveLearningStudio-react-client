import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import Browse from 'containers/LMS/Canvas/DeepLinking/Browse';
import SearchForm from 'containers/LMS/Canvas/DeepLinking/SearchForm';
import SearchResults from 'containers/LMS/Canvas/DeepLinking/SearchResults';
import PreviewActivity from 'containers/LMS/Canvas/DeepLinking/PreviewActivity';
import logo from 'assets/images/logo.png';
import './style.scss';

const SearchPage = (props) => {
  const {
    match,
    currentPage,
    searchPreviewActivity,
  } = props;
  const [section, setSection] = useState('browse');
  // Init
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [match]);

  return (
    <div className="container canvas-search-page">
      <div className="row">
        <div className="col">
          {searchPreviewActivity === null && (
            <ul className="nav nav-pills nav-fill mt-3">
              <li className="nav-item">
                <a className={section === 'browse' ? 'nav-link active' : 'nav-link'} href="#" onClick={() => setSection('browse')}>Browse</a>
              </li>
              <li className="nav-item">
                <a className={section === 'search' ? 'nav-link active' : 'nav-link'} href="#" onClick={() => setSection('search')}>Search</a>
              </li>
            </ul>
          )}
        </div>
        <div className="col text-right">
          <img className="mt-3" src={logo} alt="Curriki Studio Logo" />
        </div>
      </div>
      <div className="row">
        <div className="col">
          {searchPreviewActivity === null && section === 'browse' && <Browse /> }
          {searchPreviewActivity === null && section === 'search' && (
            <>
              { currentPage === 'search' && <SearchForm /> }
              { currentPage === 'results' && <SearchResults /> }
            </>
          )}
          {searchPreviewActivity && <PreviewActivity /> }
        </div>
      </div>
    </div>
  );
};

SearchPage.defaultProps = {
  searchPreviewActivity: null,
};

SearchPage.propTypes = {
  match: PropTypes.object.isRequired,
  currentPage: PropTypes.string.isRequired,
  searchPreviewActivity: PropTypes.object,
};

const mapStateToProps = (state) => ({
  currentPage: state.canvas.currentPage,
  searchPreviewActivity: state.canvas.searchPreviewActivity,
});

export default withRouter(connect(mapStateToProps)(SearchPage));
