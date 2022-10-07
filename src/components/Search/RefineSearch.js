import React from 'react';
import PropTypes from 'prop-types';
import { Accordion, Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const RefineSearch = (props) => {
  const {
    setToggleStates,
    toggleStates,
    setActiveAuthorTag,
    authorTags,
    educationLevels,
    subjects,
    setActiveSubject,
    activeAuthorTag,
    activityTypes,
    activeType,
    activeEducation,
    setActiveEducation,
    setActiveType,
    activeSubject,
  } = props;
  return (
    <div className="refine-search">
      <div className="headline">Refine your search</div>

      <Accordion defaultActiveKey="0">
        <Card>
          <Accordion.Toggle
            as={Card.Header}
            eventKey="0"
            onClick={() => setToggleStates({
              ...toggleStates,
              type: false,
              education: false,
              authorTag: false,
              subject: !toggleStates.subject,
            })}
          >
            Subject
            <FontAwesomeIcon className="ml-2" icon={toggleStates.subject ? 'chevron-up' : 'chevron-down'} />
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="0">
            <Card.Body>
              {subjects.length !== 0 && subjects?.data.map((data) => (
                <div
                  className="list-item-keys"
                  key={data.id}
                  value={data.id}
                  onClick={() => {
                    if (activeSubject.includes(data.id)) {
                      if (data.subject === 'Career & Technical Education') {
                        setActiveSubject(
                          activeSubject.filter((index) => {
                            if (index === 'Career & Technical Education' || index === 'Career and Technical Education') {
                              return false;
                            }
                            return true;
                          }),
                        );
                      } else {
                        setActiveSubject(activeSubject.filter((index) => index !== data.id));
                      }
                    } else {
                      setActiveSubject([...activeSubject, data.id]);
                    }
                  }}
                >
                  {activeSubject.includes(data.id) ? (
                    <FontAwesomeIcon icon="check-square" />
                  ) : (
                    <FontAwesomeIcon icon="square" />
                  )}
                  <span>{data.name}</span>
                </div>
              ))}
            </Card.Body>
          </Accordion.Collapse>
        </Card>

        <Card>
          <Accordion.Toggle
            as={Card.Header}
            eventKey="1"
            onClick={() => setToggleStates({
              ...toggleStates,
              type: false,
              subject: false,
              authorTag: false,
              education: !toggleStates.education,
            })}
          >
            Education Level
            <FontAwesomeIcon className="ml-2" icon={toggleStates.education ? 'chevron-up' : 'chevron-down'} />
          </Accordion.Toggle>

          <Accordion.Collapse eventKey="1">
            <Card.Body>
              {educationLevels.length !== 0 && educationLevels.data.map((data) => (
                <div
                  className="list-item-keys"
                  key={data.id}
                  value={data.id}
                  onClick={() => {
                    if (activeEducation.includes(data.id)) {
                      if (data.id === 'College & Beyond') {
                        setActiveEducation(
                          activeEducation.filter((index) => {
                            if (index === 'College & Beyond' || index === 'College and Beyond') {
                              return false;
                            }
                            return true;
                          }),
                        );
                      } else {
                        setActiveEducation(activeEducation.filter((index) => index !== data.id));
                      }
                    } else {
                      setActiveEducation([...activeEducation, data.id]);
                    }
                  }}
                >
                  {activeEducation.includes(data.id) ? (
                    <FontAwesomeIcon icon="check-square" />
                  ) : (
                    <FontAwesomeIcon icon="square" />
                  )}

                  <span>{data.name}</span>
                </div>
              ))}
            </Card.Body>
          </Accordion.Collapse>
        </Card>

        <Card>
          <Accordion.Toggle
            as={Card.Header}
            eventKey="2"
            onClick={() => setToggleStates({
              ...toggleStates,
              type: false,
              subject: false,
              education: false,
              authorTag: !toggleStates.authorTag,
            })}
          >
            Author Tags
            <FontAwesomeIcon className="ml-2" icon={toggleStates.authorTag ? 'chevron-up' : 'chevron-down'} />
          </Accordion.Toggle>

          <Accordion.Collapse eventKey="2">
            <Card.Body>
              {authorTags.length !== 0 && authorTags.data.map((data) => (
                <div
                  className="list-item-keys"
                  key={data.id}
                  value={data.id}
                  onClick={() => {
                    if (activeAuthorTag.includes(data.id)) {
                      if (data.name === 'College & Beyond') {
                        setActiveAuthorTag(
                          activeAuthorTag.filter((index) => {
                            if (index === 'College & Beyond' || index === 'College and Beyond') {
                              return false;
                            }
                            return true;
                          }),
                        );
                      } else {
                        setActiveAuthorTag(activeAuthorTag.filter((index) => index !== data.id));
                      }
                    } else {
                      setActiveAuthorTag([...activeAuthorTag, data.id]);
                    }
                  }}
                >
                  {activeAuthorTag.includes(data.id) ? (
                    <FontAwesomeIcon icon="check-square" />
                  ) : (
                    <FontAwesomeIcon icon="square" />
                  )}

                  <span>{data.name}</span>
                </div>
              ))}
            </Card.Body>
          </Accordion.Collapse>
        </Card>

        <Card>
          <Accordion.Toggle
            as={Card.Header}
            eventKey="3"
            onClick={() => setToggleStates({
              ...toggleStates,
              subject: false,
              education: false,
              authorTag: false,
              type: !toggleStates.type,
            })}
          >
            Type of Activity
            <FontAwesomeIcon className="ml-2" icon={toggleStates.type ? 'chevron-up' : 'chevron-down'} />
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="3">
            <Card.Body
              style={{
                'max-height': '300px',
                'overflow-y': 'auto',
              }}
            >
              {activityTypes.length !== 0 && activityTypes?.map((data) => (
                <div
                  className="list-item-keys"
                  key={data.id}
                  value={data.h5pLib}
                  onClick={() => {
                    if (activeType.includes(data.h5pLib)) {
                      // eslint-disable-next-line eqeqeq
                      setActiveType(activeType.filter((index) => index != data.h5pLib));
                    } else {
                      setActiveType([...activeType, data.h5pLib]);
                    }
                  }}
                >
                  {activeType.includes(data.h5pLib) ? <FontAwesomeIcon icon="check-square" /> : <FontAwesomeIcon icon="square" />}
                  <span>{data.title}</span>
                </div>
              ))}
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    </div>
  );
};

RefineSearch.propTypes = {
  setToggleStates: PropTypes.func.isRequired,
  toggleStates: PropTypes.object.isRequired,
  setActiveSubject: PropTypes.func.isRequired,
  setActiveEducation: PropTypes.func.isRequired,
  setActiveAuthorTag: PropTypes.func.isRequired,
  setActiveType: PropTypes.func.isRequired,
  activeSubject: PropTypes.array.isRequired,
  activeEducation: PropTypes.array.isRequired,
  activeAuthorTag: PropTypes.array.isRequired,
  activeType: PropTypes.array.isRequired,
  subjects: PropTypes.object.isRequired,
  educationLevels: PropTypes.object.isRequired,
  authorTags: PropTypes.object.isRequired,
  activityTypes: PropTypes.object.isRequired,
};

RefineSearch.defaultProps = {

};

export default RefineSearch;
