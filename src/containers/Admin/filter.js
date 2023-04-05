/* eslint-disable */
import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Dropdown } from 'react-bootstrap';
import filterSearchIcon from 'assets/images/svg/filter-placeholder.svg';
import { useDispatch, useSelector } from 'react-redux';
import { getGlobalColor } from 'containers/App/DynamicBrandingApply';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getRoles, roleDetail, searchUserInOrganization } from 'store/actions/organization';
import loader from 'assets/images/dotsloader.gif';
import FilterMdSvg from 'iconLibrary/mainContainer/FilterMdSvg';

const Filter = (props) => {
  const { setProjectFilterObj, projectFilterObj, setLibraryReqSelected, resetProjectFilter, filterSearch } = props;
  const dispatch = useDispatch();
  const [authorName, setAuthorName] = useState('');
  const [authorsArray, setAuthorsArray] = useState([]);
  const [loaderImgUser, setLoaderImgUser] = useState(false);
  const organization = useSelector((state) => state.organization);
  const { permission, activeOrganization } = organization;
  const primaryColor = getGlobalColor('--main-primary-color');

  const searchUserProjectFilter = useCallback(async () => {
    if (authorName.length >= 2) {
      setLoaderImgUser(true);
      const result = await dispatch(searchUserInOrganization(activeOrganization?.id, authorName));
      // console.log(result?.data, 'result');
      if (result?.data?.length > 0) {
        setLoaderImgUser(false);
        setAuthorsArray(result?.data);
      } else {
        setLoaderImgUser(false);
        setAuthorsArray([]);
      }
    } else if (authorName.length < 2) {
      setLoaderImgUser(false);
      setAuthorsArray([]);
    }
  }, [activeOrganization?.id, authorName, dispatch]);
  return (
    <>
      <div className="filter-dropdown-project">
        <Dropdown>
          <Dropdown.Toggle id="dropdown-basic">
            <FilterMdSvg primaryColor={primaryColor} />
            Filter
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <div className="authorName-project">
              <label>Author</label>
              <input type="text" value={authorName} onChange={(e) => setAuthorName(e.target.value)} />
              <img src={filterSearchIcon} alt="filterSearchIcon" className={authorName && authorsArray.length === 0 && 'close-circle'} onClick={searchUserProjectFilter} />
              {authorName && authorName.length >= 2 && authorsArray.length > 0 && (
                <div className="author-list">
                  {authorsArray?.length > 0
                    ? authorsArray?.map((author) => (
                        <div
                          className="single-author"
                          onClick={() => {
                            setProjectFilterObj({
                              ...projectFilterObj,
                              author_id: author.id,
                            });
                            setAuthorName(`${author.first_name} ${author.last_name}`);
                            setAuthorsArray([]);
                          }}
                        >
                          <div className="initial">{author.first_name[0] + author.last_name[0]}</div>
                          <div>
                            <div className="username-filter-project">{author.first_name}</div>
                            <div className="email-filter-project">{author.email}</div>
                          </div>
                        </div>
                      ))
                    : 'No user found.'}
                </div>
              )}
            </div>
            {loaderImgUser && <img src={loader} alt="loader" className="loader-img" />}
            {authorName && authorName.length < 2 && <div className="error">Enter at least 2 characters.</div>}
            <div className="createdFrom-project">
              <label>Created</label>
              <div className="row-project-filter">
                <div className="from-project">
                  <span>From</span>
                  <input
                    type="text"
                    placeholder="MM/DD/YYYY"
                    onFocus={(e) => {
                      e.target.type = 'date';
                    }}
                    value={projectFilterObj.created_from}
                    onChange={(e) => {
                      setProjectFilterObj({
                        ...projectFilterObj,
                        created_from: e.target.value,
                      });
                    }}
                  />
                </div>
                <div className="to-project">
                  <span>To</span>
                  <input
                    type="text"
                    placeholder="MM/DD/YYYY"
                    onFocus={(e) => {
                      e.target.type = 'date';
                    }}
                    value={projectFilterObj.created_to}
                    onChange={(e) => {
                      setProjectFilterObj({
                        ...projectFilterObj,
                        created_to: e.target.value,
                      });
                    }}
                  />
                </div>
              </div>
              {projectFilterObj.created_from > projectFilterObj.created_to && <div className="error">From date should be less than To date.</div>}
            </div>
            <div className="updatedOn-project">
              <label>Updated</label>
              <div className="row-project-filter">
                <div className="from-project">
                  <span>From</span>
                  <input
                    type="text"
                    placeholder="MM/DD/YYYY"
                    onFocus={(e) => {
                      e.target.type = 'date';
                    }}
                    value={projectFilterObj.updated_from}
                    onChange={(e) => {
                      setProjectFilterObj({
                        ...projectFilterObj,
                        updated_from: e.target.value,
                      });
                    }}
                  />
                </div>
                <div className="to-project">
                  <span>To</span>
                  <input
                    type="text"
                    placeholder="MM/DD/YYYY"
                    onFocus={(e) => {
                      e.target.type = 'date';
                    }}
                    value={projectFilterObj.updated_to}
                    onChange={(e) => {
                      setProjectFilterObj({
                        ...projectFilterObj,
                        updated_to: e.target.value,
                      });
                    }}
                  />
                </div>
              </div>
              {projectFilterObj.updated_from > projectFilterObj.updated_to && <div className="error">From date should be less than To date.</div>}
            </div>
            <div className="status-project">
              <div className="library-status">
                <label>Library status</label>
                <span>
                  <input
                    type="radio"
                    checked={projectFilterObj.indexing === 1 && true}
                    onChange={() => {
                      setLibraryReqSelected(true);
                      setProjectFilterObj({
                        ...projectFilterObj,
                        indexing: 1,
                      });
                    }}
                  />
                  Requested
                </span>
                <span>
                  <input
                    type="radio"
                    checked={projectFilterObj.indexing === null && true}
                    onChange={() => {
                      setLibraryReqSelected(false);
                      setProjectFilterObj({
                        ...projectFilterObj,
                        indexing: null,
                      });
                    }}
                  />
                  Not Requested
                </span>
                <span>
                  <input
                    type="radio"
                    checked={projectFilterObj.indexing === 3 && true}
                    onChange={() => {
                      setLibraryReqSelected(false);
                      setProjectFilterObj({
                        ...projectFilterObj,
                        indexing: 3,
                      });
                    }}
                  />
                  Approved
                </span>
                <span>
                  <input
                    type="radio"
                    checked={projectFilterObj.indexing === 2 && true}
                    onChange={() => {
                      setLibraryReqSelected(false);
                      setProjectFilterObj({
                        ...projectFilterObj,
                        indexing: 2,
                      });
                    }}
                  />
                  Not Approved
                </span>
              </div>
              <div className="shared-status">
                <label>Shared status</label>
                <span>
                  <input
                    type="radio"
                    checked={projectFilterObj.shared === 1 && true}
                    onChange={() =>
                      setProjectFilterObj({
                        ...projectFilterObj,
                        shared: 1,
                      })
                    }
                  />
                  Enabled
                </span>
                <span>
                  <input
                    type="radio"
                    checked={projectFilterObj.shared === 0 && true}
                    onChange={() =>
                      setProjectFilterObj({
                        ...projectFilterObj,
                        shared: 0,
                      })
                    }
                  />
                  Disabled
                </span>
              </div>
            </div>

            <div className="status-project">
              <div className="library-status" style={{borderRight:"unset"}}>
                <label>Library Preference</label>
                <span>
                  <input
                    type="radio"
                    checked={projectFilterObj.visibility === 1 && true}
                    onChange={() => {
                      setLibraryReqSelected(false);
                      setProjectFilterObj({
                        ...projectFilterObj,
                        visibility: 1,
                      });
                    }}
                  />
                  Private(only me)
                </span>
                <span>
                  <input
                    type="radio"
                    checked={projectFilterObj.visibility === 4 && true}
                    onChange={() => {
                      setLibraryReqSelected(false);
                      setProjectFilterObj({
                        ...projectFilterObj,
                        visibility: 4,
                      });
                    }}
                  />
                  Public
                </span>
                <span>
                  <input
                    type="radio"
                    checked={projectFilterObj.visibility === 3 && true}
                    onChange={() => {
                      setLibraryReqSelected(false);
                      setProjectFilterObj({
                        ...projectFilterObj,
                        visibility: 3,
                      });
                    }}
                  />
                  My Organization
                </span>
              </div>
            </div>
            <div className="filter-btn-project" onClick={() => filterSearch()}>
              {/* <img src={filterImg} alt="filter" /> */}
              <FilterMdSvg primaryColor={primaryColor} />
              Apply Filters
            </div>
            <div
              className="filter-btn-project"
              onClick={() => {
                setAuthorName('');
                resetProjectFilter();
              }}
            >
              <FontAwesomeIcon icon="sync" />
              Reset All
            </div>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </>
  );
};

Filter.propTypes = {};

export default Filter;
