/* eslint-disable */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ExistingLibrarySearchQuery from 'components/ExistingActivitySearchContainer/ExistingLibrarySearchQuery';
import ExistingLibrarySearchResults from '../ExistingLibrarySearchResults';
import { setCompatibleLibrariesAction } from 'store/actions/existingActivitySearch';

const ExistingLibrarySearch = (props) => {
  const { libraries, setCompatibleLibraries, layout } = props;

  useEffect(() => {
    setCompatibleLibraries(libraries);
  }, []);

  return (
    <div className='row'>
      <div className='col-4'>
        <ExistingLibrarySearchQuery />
      </div>
      <div className='col-8'>
        <ExistingLibrarySearchResults layout={layout} />
      </div>      
    </div>
  );
};

ExistingLibrarySearch.propTypes = {

};

const mapDispatchToProps = (dispatch) => ({
  setCompatibleLibraries: (libraries) => dispatch(setCompatibleLibrariesAction(libraries)),
});

const mapStateToProps = (state) => ({

});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ExistingLibrarySearch));
