/* eslint-disable react/prop-types */
/* eslint-disable */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Accordion, Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Swal from 'sweetalert2';

const SearchLibrary = (props) => {
  const {
    currentOrganization,
    simpleSearchAction,
    searchIndependentActivitiesAction,
    setToggleStates,
    toggleStates,
    searchInput,
    searchType,
    activeSubject,
    activeEducation,
    activeAuthorTag,
    activeType,
    authorName,
    fromdate,
    todate,
    fromTeam,
    setActiveTab,
    setSearchInput,
    setSearchType,
    setActiveEducation,
    setActiveSubject,
    setActiveAuthorTag,
    setAuthor,
    setFromDate,
    setToDate,
    setTotalCount,
    history,
    dispatch,
    permission,
    activities,
    activeMainSearchType,
    setSearch,
    setNoWords,
    noWords,
    setisLoader,
  } = props;

  const onSubmit = async () => {
    setisLoader(true);
    setFromDate(undefined);
    setToDate(undefined);
    setSearch(null);
    setActiveTab(fromTeam ? 'projects' : 'total');
    if (searchInput?.length > 255) {
      Swal.fire('Character limit should be less than 255.');
    } else if (activeMainSearchType === 'Projects') {
      // Swal.fire({
      //   title: 'Searching...', // add html attribute if you want or remove
      //   html: 'We are fetching results for you!',
      //   allowOutsideClick: false,
      //   onBeforeOpen: () => {
      //     Swal.showLoading();
      //   },
      // });
      const dataSend = {
        phrase: searchInput?.trim(),
        subjectArray: activeSubject,
        gradeArray: activeEducation,
        authorTagsArray: activeAuthorTag,
        standardArray: activeType,
        author: authorName || undefined,
        fromDate: fromdate || undefined,
        toDate: todate || undefined,
        type: searchType,
        from: 0,
        size: 20,
        no_words: noWords || undefined,
      };
      console.log(dataSend);
      const result = await dispatch(simpleSearchAction(dataSend));
      setTotalCount(result.meta?.total);
      const tempEducation = [];
      const tempSubject = [];
      const tempTag = [];
      const tempAuthor = [];
      if (activeEducation) {
        activeEducation.forEach((edu) => {
          if (String(edu).includes('&')) {
            const temp = String(edu).replace('&', 'and');
            tempEducation.push(temp);
          } else {
            tempEducation.push(edu);
          }
        });
        setActiveEducation(tempEducation);
      }
      if (activeSubject) {
        activeSubject.forEach((sub) => {
          if (String(sub).includes('&')) {
            const temp = String(sub).replace('&', 'and');
            tempSubject.push(temp);
          } else {
            tempSubject.push(sub);
          }
        });
        setActiveSubject(tempSubject);
      }
      if (activeAuthorTag) {
        activeAuthorTag.forEach((sub) => {
          if (String(sub).includes('&')) {
            const temp = String(sub).replace('&', 'and');
            tempAuthor.push(temp);
          } else {
            tempAuthor.push(sub);
          }
        });
        setActiveAuthorTag(tempAuthor);
      }
      if (!fromTeam) {
        // eslint-disable-next-line max-len
        // history.push(
        //   `/org/${
        //     currentOrganization?.domain
        //   }/search?q=${searchInput.trim()}&type=${searchType}&grade=${tempSubject}&education=${tempEducation}&authorTag=${tempTag}&h5p=${activeType}&author=${authorName}`,
        // );
      }
    } else if (activeMainSearchType === 'Independent activities') {
      // Swal.fire({
      //   title: 'Searching...', // add html attribute if you want or remove
      //   html: 'We are fetching results for you!',
      //   allowOutsideClick: false,
      //   onBeforeOpen: () => {
      //     Swal.showLoading();
      //   },
      // });
      let dataSend;
      // eslint-disable-next-line prefer-const
      dataSend = {
        query: searchInput?.trim(),
        subjectArray: activeSubject,
        gradeArray: activeEducation,
        authorTagsArray: activeAuthorTag,
        authors: authorName || undefined,
        standardArray: activeType,
        from: 0,
        size: 20,
        no_words: noWords || undefined,
      };
      const result = await dispatch(searchIndependentActivitiesAction(dataSend, 'showcase_activities'));
      setTotalCount(result?.meta?.total);
      const tempEducation = [];
      const tempSubject = [];
      const tempTag = [];
      if (activeEducation) {
        activeEducation.forEach((edu) => {
          if (String(edu).includes('&')) {
            const temp = String(edu).replace('&', 'and');
            tempEducation.push(temp);
          } else {
            tempEducation.push(edu);
          }
        });
        setActiveEducation(tempEducation);
      }
      if (activeSubject) {
        activeSubject.forEach((sub) => {
          if (String(sub).includes('&')) {
            const temp = String(sub).replace('&', 'and');
            tempSubject.push(temp);
          } else {
            tempSubject.push(sub);
          }
        });
        setActiveSubject(tempSubject);
      }
      if (activeAuthorTag) {
        activeAuthorTag.forEach((sub) => {
          if (String(sub).includes('&')) {
            const temp = String(sub).replace('&', 'and');
            tempTag.push(temp);
          } else {
            tempTag.push(sub);
          }
        });
        setActiveAuthorTag(tempTag);
      }
      if (!fromTeam) {
        // eslint-disable-next-line max-len
        // history.push(
        //   `/org/${
        //     currentOrganization?.domain
        //   }/search?q=${searchInput.trim()}&type=${searchType}&grade=${tempSubject}&education=${tempEducation}&authorTag=${tempTag}&h5p=${activeType}&author=${authorName}`,
        // );
      }
    }
    // setModalShow(true);
  };
  return (
    <Accordion defaultActiveKey="0">
      <Card>
        <Accordion.Toggle as={Card.Header} eventKey="0" onClick={() => setToggleStates({ ...toggleStates, searchLibrary: !toggleStates?.searchLibrary })}>
          Search Library
          <FontAwesomeIcon className="ml-2" icon={toggleStates?.searchLibrary ? 'chevron-up' : 'chevron-down'} />
        </Accordion.Toggle>

        <Accordion.Collapse eventKey="0">
          <Card.Body>
            <div className="body-search">
              <div className="author-label">Contains</div>
              <input
                // style={{ display: searchType === 'orgSearch' ? 'none' : 'block' }}
                value={searchInput}
                onChange={(e) => {
                  setSearchInput(e.target.value);
                }}
                type="search"
                placeholder="Search"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    onSubmit();
                  }
                }}
              />

              <div className="author-label">Does not contain</div>
              <div className="form-group mb-form">
                <input
                  placeholder=""
                  className="authorName"
                  value={noWords}
                  onChange={({ target }) => {
                    if (target.value) {
                      setNoWords(target.value);
                    } else {
                      setNoWords('');
                    }
                  }}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      onSubmit();
                    }
                  }}
                />
              </div>
              <div className="author-label">Author</div>
              <div className="form-group">
                <input
                  placeholder="Enter author name"
                  className="authorName"
                  value={authorName}
                  onChange={({ target }) => {
                    if (target.value) {
                      setAuthor(target.value);
                    } else {
                      setAuthor('');
                    }
                  }}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      onSubmit();
                    }
                  }}
                />
              </div>
              <div className="src-btn" onClick={() => onSubmit()}>
                <FontAwesomeIcon icon="search" />
                Search
              </div>
            </div>
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    </Accordion>
  );
};

SearchLibrary.propTypes = {
  currentOrganization: PropTypes.object.isRequired,
  simpleSearchAction: PropTypes.func.isRequired,
  searchIndependentActivitiesAction: PropTypes.func.isRequired,
  setToggleStates: PropTypes.func.isRequired,
  toggleStates: PropTypes.object.isRequired,
  searchInput: PropTypes.string.isRequired,
  searchType: PropTypes.string.isRequired,
  activeSubject: PropTypes.string.isRequired,
  activeEducation: PropTypes.string.isRequired,
  activeAuthorTag: PropTypes.string.isRequired,
  activeType: PropTypes.string.isRequired,
  authorName: PropTypes.string.isRequired,
  fromdate: PropTypes.number.isRequired,
  todate: PropTypes.number.isRequired,
  fromTeam: PropTypes.bool.isRequired,
  setActiveTab: PropTypes.func.isRequired,
  setSearchInput: PropTypes.func.isRequired,
  setSearchType: PropTypes.func.isRequired,
  setActiveEducation: PropTypes.func.isRequired,
  setActiveSubject: PropTypes.func.isRequired,
  setActiveAuthorTag: PropTypes.func.isRequired,
  setAuthor: PropTypes.func.isRequired,
  setFromDate: PropTypes.func.isRequired,
  setToDate: PropTypes.func.isRequired,
  setTotalCount: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  permission: PropTypes.object.isRequired,
  activities: PropTypes.bool,
  activeMainSearchType: PropTypes.string.isRequired,
  setSearch: PropTypes.func.isRequired,
};
SearchLibrary.defaultProps = {
  activities: false,
};

export default SearchLibrary;
