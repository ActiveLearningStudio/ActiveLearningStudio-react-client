import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { Dropdown } from 'react-bootstrap';
// import { Formik } from 'formik';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { simpleSearchAction } from 'store/actions/search';

function SearchForm() {
  const history = useHistory();
  const dispatcher = useDispatch();

  const [simpleSearch, setSimpleSearch] = useState();

  return (
    <Dropdown>
      <div className="search-block navbtn">
        <input
          className="search-term"
          placeholder="Search existing content"
          value={simpleSearch}
          onChange={(e) => {
            setSimpleSearch(e.target.value);
          }}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              if (!simpleSearch.trim()) {
                Swal.fire('Search field is required');
              } else if (simpleSearch.length > 255) {
                Swal.fire('Character limit should be less than 255 ');
              } else {
                dispatcher(simpleSearchAction(simpleSearch.trim(), 0, 1000));
                localStorage.setItem('loading', 'true');
                history.push('/search');
              }
            }
            return true;
          }}
        />

        <Dropdown.Toggle variant="" id="dropdown-basic">
          <FontAwesomeIcon icon="chevron-down" />
        </Dropdown.Toggle>
      </div>

      {/*
      <Dropdown.Menu>
        <div className="overlay-search-form">
          <h4>Advanced Search</h4>
          <Formik
            initialValues={{
              phrase: '',
              subject: '',
              grade: '',
              standard: '',
              email: '',
              words: '',
              no_words: '',
            }}
            validate={(values) => {
              const errors = {};
              return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
              dispatcher(advancedSearches(values));
              history.push('/search');
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
            }) => (
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <input
                    name="phrase"
                    placeholder="Enter search phrase"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.phrase}
                  />
                </div>
                <div className="form-group">
                  <input
                    name="subject"
                    placeholder="Subject + Subject Area"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.subject}
                  />
                </div>
                <div className="form-group dual">
                  <input
                    name="grade"
                    placeholder="Grade Level"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.grade}
                  />
                  <input
                    name="standard"
                    placeholder="Standard"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.standard}
                  />
                </div>
                <div className="form-group">
                  <input
                    name="email"
                    placeholder="From User:Enter Email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                  />
                </div>
                <div className="form-group">
                  <input
                    name="words"
                    placeholder="Has the words"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.words}
                  />
                </div>
                <div className="form-group">
                  <input
                    name="no_words"
                    placeholder="Doesn't have the words"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.no_words}
                  />
                </div>
                <div className="dual_activity">
                  <button type="submit" disabled={isSubmitting}>
                    Submit
                  </button>
                </div>
              </form>
            )}
          </Formik>
        </div>
      </Dropdown.Menu>
      */}
    </Dropdown>
  );
}

export default SearchForm;
