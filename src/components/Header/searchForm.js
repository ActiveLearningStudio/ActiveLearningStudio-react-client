import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { Dropdown } from 'react-bootstrap';
// import { Formik } from "formik";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { simpleSearchAction } from 'store/actions/search';

function SearchForm() {
  const history = useHistory();
  const dispatcher = useDispatch();

  const [simpleSearch, setSimpleSearch] = useState();

  return (
    <Dropdown>
      <div className="search-block navbtn">
        <input
          onChange={(e) => {
            setSimpleSearch(e.target.value);
          }}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              if(!simpleSearch){
                Swal.fire("Input field is empty")
              }
              else if(simpleSearch.length>255){
                Swal.fire("character limit should be less then 255 ")
              }
              else{
              dispatcher(simpleSearchAction(simpleSearch, 0, 1000));
              localStorage.setItem('loading', 'true');
              history.push('/search');
              
            }
            }
            return true;
          }}
          value={simpleSearch}
          type="text"
          className="search-term"
          placeholder="Search existing content"
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
              phrase: "",
              subject: "",
              grade: "",
              standard: "",
              email: "",
              words: "",
              no_words: "",
            }}
            validate={(values) => {
              const errors = {};
              return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
              dispatcher(advancedSearches(values));
              history.push("/search");
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
                    type="text"
                    name="phrase"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.phrase}
                    placeholder="Enter search phrase"
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    name="subject"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.subject}
                    placeholder="Subject + Subject Area"
                  />
                </div>
                <div className="form-group dual">
                  <input
                    type="text"
                    name="grade"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.grade}
                    placeholder="Grade Level"
                  />
                  <input
                    type="text"
                    name="standard"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.standard}
                    placeholder="Standard"
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    name="email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                    placeholder="From User:Enter Email"
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    name="words"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.words}
                    placeholder="Has the words"
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    name="no_words"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.no_words}
                    placeholder="Doesn't have the words"
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
