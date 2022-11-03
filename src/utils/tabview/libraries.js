/* eslint-disable */
import React from 'react';
import { Alert } from 'react-bootstrap';
import PropTypes from 'prop-types';

const Libraries = (props) => {
  const { libUsed } = props;

  return (
    <ol>
      {libUsed?.length > 0 ? (
        libUsed?.map((key) => {
          let url = '';
          if (key === 'react-bootstrap') {
            url = 'https://react-bootstrap.github.io/getting-started/introduction/';
          } else if (key === 'react-redux') {
            url = 'https://react-redux.js.org/';
          } else if (key === 'react-fontawesome') {
            url = 'https://fontawesome.com/v5.15/how-to-use/javascript-api/setup/library/';
          } else if (key === 'formik') {
            url = 'https://formik.org/docs/overview';
          } else if (key === 'prop-types') {
            url = 'https://reactjs.org/docs/typechecking-with-proptypes.html';
          } else if (key === 'swal') {
            url = 'https://www.npmjs.com/package/react-swal';
          } else if (key === 'react-js-pagination') {
            url = 'https://www.npmjs.com/package/react-js-pagination';
          } else if (key === 'react-router-dom') {
            url = 'https://www.npmjs.com/package/react-router-dom';
          } else if (key === 'react-placeholder') {
            url = 'https://www.npmjs.com/package/react-placeholder';
          } else if (key === 'react-beautiful-dnd') {
            url = 'https://www.npmjs.com/package/react-beautiful-dnd';
          } else if (key === 'react-slick') {
            url = 'https://www.npmjs.com/package/react-slick';
          } else if (key === 'redux-form') {
            url = 'https://www.npmjs.com/package/redux-form';
          } else if (key === 'classnames') {
            url = 'https://www.npmjs.com/package/classnames';
          } else if (key === 'lodash') {
            url = 'https://www.npmjs.com/package/react-lodash';
          } else if (key === 'validator') {
            url = 'https://www.npmjs.com/package/validator';
          } else if (key === 'query-string') {
            url = 'https://www.npmjs.com/package/query-string';
          } else if (key === 'react-animations') {
            url = 'https://www.npmjs.com/package/react-animations';
          } else if (key === 'styled-components') {
            url = 'https://www.npmjs.com/package/styled-components';
          } else if (key === 'recharts') {
            url = 'https://www.npmjs.com/package/recharts';
          } else if (key === 'tinymce-react') {
            url = 'https://www.npmjs.com/package/@tinymce/tinymce-react';
          } else if (key === 'DropdownList') {
            url = 'https://www.npmjs.com/package/react-dropdownlist';
          } else if (key === 'react-confirm-alert') {
            url = 'https://www.npmjs.com/package/react-confirm-alert';
          } else if (key === 'react-share') {
            url = 'https://www.npmjs.com/package/react-share';
          } else if (key === '_debounce') {
            url = 'https://www.npmjs.com/package/react-debounce-input';
          } else if (key === '_sortBy') {
            url = 'https://www.npmjs.com/package/lodash.sortby';
          } else if (key === 'pexels-api-wrapper') {
            url = 'https://www.npmjs.com/package/pexels-api-wrapper';
          } else if (key === 'axios') {
            url = 'https://www.npmjs.com/package/axios';
          } else if (key === '@microsoft/immersive-reader-sdk') {
            url = 'https://www.npmjs.com/package/@microsoft/immersive-reader-sdk';
          } else if (key === 'lib/placeholders') {
            url = 'https://www.npmjs.com/package/react-placeholder';
          } else if (key === 'history') {
            url = 'https://www.npmjs.com/package/react-history';
          } else if (key === 'loadable') {
            url = 'https://www.npmjs.com/package/react-loadable';
          } else if (key === 'ReactGA') {
            url = 'https://www.npmjs.com/package/react-ga';
          } else if (key === 'react-animations') {
            url = 'https://www.npmjs.com/package/react-animations';
          } else if (key === 'styled-components') {
            url = 'https://www.npmjs.com/package/styled-components';
          } else if (key === 'config') {
            url = 'https://www.npmjs.com/package/config';
          } else if (key === 'socket.io-client') {
            url = 'https://www.npmjs.com/package/socket.io-client';
          } else if (key === 'laravel-echo') {
            url = 'https://www.npmjs.com/package/laravel-echo';
          } else if (key === 'redux-thunk') {
            url = 'https://www.npmjs.com/package/redux-thunk';
          } else if (key === 'react-google-login') {
            url = 'https://www.npmjs.com/package/react-google-login';
          } else if (key === 'react-switch') {
            url = 'https://www.npmjs.com/package/react-switch';
          } else if (key === 'react-loading-skeleton') {
            url = 'https://www.npmjs.com/package/react-loading-skeleton';
          }

          return (
            <li key={key}>
              <h5>
                {key}

                <a href={url} target="_blank" rel=" noreferrer">
                  link to library
                </a>
              </h5>
            </li>
          );
        })
      ) : (
        <Alert variant="primary">No Information avaialble</Alert>
      )}
    </ol>
  );
};
export default Libraries;
Libraries.propTypes = {
  libUsed: PropTypes.array.isRequired,
};
