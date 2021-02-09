import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import Browse from 'containers/LMS/Canvas/DeepLinking/Browse';
import SearchForm from 'containers/LMS/Canvas/DeepLinking/SearchForm';
import SearchResults from 'containers/LMS/Canvas/DeepLinking/SearchResults';
import logo from 'assets/images/logo.png';
import './style.scss';

const SearchPage = (props) => {
  const {
    match,
    currentPage,
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
          <ul className="nav nav-pills nav-fill mt-3">
            <li className="nav-item">
              <a className={section === 'browse' ? 'nav-link active' : 'nav-link'} href="#" onClick={() => setSection('browse')}>Browse</a>
            </li>
            <li className="nav-item">
              <a className={section === 'search' ? 'nav-link active' : 'nav-link'} href="#" onClick={() => setSection('search')}>Search</a>
            </li>
          </ul>
        </div>
        <div className="col text-right">
          <img className="mt-3" src={logo} alt="Curriki Studio Logo" />
        </div>
      </div>
      <div className="row">
        <div className="col">
          {section === 'browse' && <Browse /> }
          {section === 'search' && (
            <>
              { currentPage === 'search' && <SearchForm /> }
              { currentPage === 'results' && <SearchResults /> }
            </>
          )}
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
