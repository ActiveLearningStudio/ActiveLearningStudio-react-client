import React, { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { Formik } from 'formik';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { simpleSearchAction } from 'store/actions/search';
import { loadResourceTypesAction } from 'store/actions/resource';
import {
  educationLevels,
  subjects,
} from 'components/ResourceCard/AddResource/dropdownData';

function SearchForm() {
  const history = useHistory();
  const dispatcher = useDispatch();

  // const [simpleSearch, setSimpleSearch] = useState();
  const [activityTypes, setActivityTypes] = useState([]);
  const [value, setValue] = useState(0);
  const activityTypesState = useSelector((state) => state.resource.types);

  useEffect(() => {
    if (activityTypesState.length === 0) {
      dispatcher(loadResourceTypesAction());
    }
  }, []);

  const compare = (a, b) => {
    // Use toUpperCase() to ignore character casing
    const bandA = a.title.toUpperCase();
    const bandB = b.title.toUpperCase();

    let comparison = 0;
    if (bandA > bandB) {
      comparison = 1;
    } else if (bandA < bandB) {
      comparison = -1;
    }
    return comparison;
  };

  useEffect(() => {
    const allItems = [];
    activityTypesState.map((data) => data.activityItems.map((itm) => allItems.push(itm)));
    setActivityTypes(allItems.sort(compare));
  }, [activityTypesState]);

  const closeModel = useRef();
  return (
    <Formik
      initialValues={{
        phrase: '',
        subjectArray: [],
        subject: '',
        grade: '',
        gradeArray: [],
        standard: '',
        standardArray: [],
        email: '',
        words: '',
        no_words: undefined,
        type: 'public',
        toDate: undefined,
        fromDate: undefined,
        from: 0,
        size: 100,
        model: 'activities',
      }}
      validate={(values) => {
        const errors = {};
        if (!values.phrase) {
          errors.phrase = 'required';
        }
        return errors;
      }}
      onSubmit={(values, { resetForm }) => {
        Swal.showLoading();
        dispatcher(simpleSearchAction(values));
        closeModel.current.click();
        history.push(`/studio/search?type=${values.type}&grade=${values.subjectArray}&education=${values.gradeArray}&h5p=${values.standardArray}`);
        resetForm({
          phrase: '',
          subjectArray: [],
          subject: '',
          grade: '',
          gradeArray: [],
          standard: '',
          standardArray: [],
          email: '',
          words: '',
          no_words: undefined,
          type: 'public',
          toDate: undefined,
          fromDate: undefined,
          from: 0,
          size: 20,
          model: undefined,
        });
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
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
            <div className="error">
              {errors.phrase && touched.phrase && errors.phrase}
            </div>
          </div>

          <div className="form-group">
            <select
              name="subject"
              placeholder="Subject + Subject Area"
              onChange={(e) => {
                handleChange(e);
                values.subjectArray.push(e.target.value);
              }}
              onBlur={handleBlur}
              value={values.subject}
            >
              <option value="Subject + Subject Area">
                {' '}
                Subject + Subject Area
              </option>
              {subjects.map((data) => (
                <option key={data.value} value={data.subject}>
                  {data.subject}
                </option>
              ))}
            </select>
          </div>

          {values.subjectArray.length > 0 && (
            <div className="form-group wrap-keyword" data-name={value}>
              {values.subjectArray.map((data) => (
                <div className="keywords-de">
                  {data}
                  <div
                    className="iocns"
                    onClick={() => {
                      // eslint-disable-next-line no-param-reassign
                      values.subjectArray = values.subjectArray.filter((index) => index !== data);
                      setValue(value + 1);
                    }}
                  >
                    <FontAwesomeIcon icon="times" />
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="form-group">
            <select
              name="grade"
              placeholder="Grade Level"
              onChange={(e) => {
                handleChange(e);
                values.gradeArray.push(e.target.value);
              }}
              value={values.grade}
            >
              <option value="Education Level">Education Level</option>
              {educationLevels.map((data) => (
                <option key={data.value} value={data.name}>
                  {data.name}
                </option>
              ))}
            </select>
          </div>

          {values.gradeArray.length > 0 && (
            <div className="form-group wrap-keyword">
              {values.gradeArray.map((data) => (
                <div className="keywords-de" data-name={value}>
                  {data}
                  <div
                    className="iocns"
                    onClick={() => {
                      // eslint-disable-next-line no-param-reassign
                      values.gradeArray = values.gradeArray.filter((index) => index !== data);
                      setValue(value + 1);
                    }}
                  >
                    <FontAwesomeIcon icon="times" />
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="form-group">
            <select
              name="standard"
              placeholder="Standard"
              onChange={(e) => {
                handleChange(e);
                if (!values.standardArray.includes(e.target.value)) {
                  values.standardArray.push(e.target.value);
                }
              }}
              onBlur={handleBlur}
              value={values.standard}
            >
              <option value="Standard">Type of Activity</option>
              {activityTypes.map((data) => (
                <option key={data.id} value={data.h5pLib}>
                  {data.title}
                </option>
              ))}
            </select>
          </div>
          <div className="dual_activity">
            <button type="submit">Search</button>
          </div>
        </form>
      )}
    </Formik>
  );
}

export default SearchForm;
