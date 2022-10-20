/* eslint-disable no-unused-vars */
/* eslint-disable operator-linebreak */
/* eslint-disable no-shadow */
/* eslint-disable react/jsx-curly-newline */
/* eslint-disable implicit-arrow-linebreak */
import React, { useState, useEffect } from 'react';
import { Accordion, Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const dataCulture = [
  {
    value: 'Culture',
    data: [
      { id: 1, name: 'African American Museum (22,640)' },
      { id: 2, name: 'African Art Museum (70,441)' },
      { id: 3, name: 'Air and Space Museum (48,084)' },
      { id: 4, name: 'American Art Museum (87,497)' },
    ],
  },
];
const SmithsonianFilter = () => {
  const [toggleStates, setToggleStates] = useState({
    culture: true,
    date: true,
    online_media_type: false,
    data_source: false,
    place: false,
    object_type: false,
    topic: false,
  });
  const [activeCulture, setActiveCulture] = useState([]);
  const [cultures, setCulture] = useState([]);
  useEffect(() => {
    setCulture(dataCulture);
  }, []);
  return (
    <div className="smithsonian_filter_menu_detail">
      <div className="refine-search">
        <Accordion defaultActiveKey="0">
          <div>
            <Card className="card-detail-header">
              <Accordion.Toggle
                as={Card.Header}
                eventKey="0"
                onClick={() =>
                  setToggleStates({
                    ...toggleStates,
                    culture: !toggleStates.culture,
                    date: true,
                    online_media_type: false,
                    data_source: false,
                    place: false,
                    object_type: false,
                    topic: false,
                  })
                }
              >
                Culture
                <FontAwesomeIcon className="ml-2" icon={toggleStates.culture ? 'chevron-up' : 'chevron-down'} />
              </Accordion.Toggle>
            </Card>
            {toggleStates.culture && (
              <Card className="card-detail-list-options">
                <Accordion.Collapse eventKey="0">
                  <Card.Body>
                    {/* cultures?.length !== 0 && */}
                    {cultures?.length !== 0 &&
                      cultures[0]?.data?.map((data) => (
                        <div
                          className="list-item-keys"
                          key={data.id}
                          value={data.id}
                          onClick={() => {
                            if (activeCulture.includes(data.id)) {
                              if (data.subject === 'Career & Technical Education') {
                                setActiveCulture(
                                  activeCulture.filter((index) => {
                                    if (index === 'Career & Technical Education' || index === 'Career and Technical Education') {
                                      return false;
                                    }
                                    return true;
                                  }),
                                );
                              } else {
                                setActiveCulture(activeCulture.filter((index) => index !== data.id));
                              }
                            } else {
                              setActiveCulture([...activeCulture, data.id]);
                            }
                          }}
                        >
                          <div className="card-detail-list-text-icon">
                            {activeCulture.includes(data.id) ? (
                              <FontAwesomeIcon className="card-detail-list-icon" icon="check-square" />
                            ) : (
                              <FontAwesomeIcon className="card-detail-list-icon" icon="square" />
                            )}
                            <span>{data.name}</span>
                          </div>
                        </div>
                      ))}
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
            )}
          </div>

          <div>
            <Card className="card-detail-header">
              <Accordion.Toggle
                as={Card.Header}
                eventKey="1"
                onClick={() =>
                  setToggleStates({
                    ...toggleStates,
                    culture: !toggleStates.culture,
                    date: true,
                    online_media_type: false,
                    data_source: false,
                    place: false,
                    object_type: false,
                    topic: false,
                  })
                }
              >
                Date (Search By Century)
                <FontAwesomeIcon className="ml-2" icon={toggleStates.culture ? 'chevron-up' : 'chevron-down'} />
              </Accordion.Toggle>
            </Card>
            {toggleStates.culture && (
              <Card className="card-detail-list-options">
                <Accordion.Collapse eventKey="1">
                  <Card.Body>
                    {/* cultures?.length !== 0 && */}
                    {cultures?.length !== 0 &&
                      cultures[0]?.data?.map((data) => (
                        <div
                          className="list-item-keys"
                          key={data.id}
                          value={data.id}
                          onClick={() => {
                            if (activeCulture.includes(data.id)) {
                              if (data.subject === 'Career & Technical Education') {
                                setActiveCulture(
                                  activeCulture.filter((index) => {
                                    if (index === 'Career & Technical Education' || index === 'Career and Technical Education') {
                                      return false;
                                    }
                                    return true;
                                  }),
                                );
                              } else {
                                setActiveCulture(activeCulture.filter((index) => index !== data.id));
                              }
                            } else {
                              setActiveCulture([...activeCulture, data.id]);
                            }
                          }}
                        >
                          <div className="card-detail-list-text-icon">
                            {activeCulture.includes(data.id) ? (
                              <FontAwesomeIcon className="card-detail-list-icon" icon="check-square" />
                            ) : (
                              <FontAwesomeIcon className="card-detail-list-icon" icon="square" />
                            )}
                            <span>{data.name}</span>
                          </div>
                        </div>
                      ))}
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
            )}
          </div>

          <div>
            <Card className="card-detail-header">
              <Accordion.Toggle
                as={Card.Header}
                eventKey="2"
                onClick={() =>
                  setToggleStates({
                    ...toggleStates,
                    culture: !toggleStates.culture,
                    date: true,
                    online_media_type: false,
                    data_source: false,
                    place: false,
                    object_type: false,
                    topic: false,
                  })
                }
              >
                Media Type
                <FontAwesomeIcon className="ml-2" icon={toggleStates.culture ? 'chevron-up' : 'chevron-down'} />
              </Accordion.Toggle>
            </Card>
            {toggleStates.culture && (
              <Card className="card-detail-list-options">
                <Accordion.Collapse eventKey="2">
                  <Card.Body>
                    {/* cultures?.length !== 0 && */}
                    {cultures?.length !== 0 &&
                      cultures[0]?.data?.map((data) => (
                        <div
                          className="list-item-keys"
                          key={data.id}
                          value={data.id}
                          onClick={() => {
                            if (activeCulture.includes(data.id)) {
                              if (data.subject === 'Career & Technical Education') {
                                setActiveCulture(
                                  activeCulture.filter((index) => {
                                    if (index === 'Career & Technical Education' || index === 'Career and Technical Education') {
                                      return false;
                                    }
                                    return true;
                                  }),
                                );
                              } else {
                                setActiveCulture(activeCulture.filter((index) => index !== data.id));
                              }
                            } else {
                              setActiveCulture([...activeCulture, data.id]);
                            }
                          }}
                        >
                          <div className="card-detail-list-text-icon">
                            {activeCulture.includes(data.id) ? (
                              <FontAwesomeIcon className="card-detail-list-icon" icon="check-square" />
                            ) : (
                              <FontAwesomeIcon className="card-detail-list-icon" icon="square" />
                            )}
                            <span>{data.name}</span>
                          </div>
                        </div>
                      ))}
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
            )}
          </div>

          <div>
            <Card className="card-detail-header">
              <Accordion.Toggle
                as={Card.Header}
                eventKey="3"
                onClick={() =>
                  setToggleStates({
                    ...toggleStates,
                    culture: !toggleStates.culture,
                    date: true,
                    online_media_type: false,
                    data_source: false,
                    place: false,
                    object_type: false,
                    topic: false,
                  })
                }
              >
                Museum/Unit
                <FontAwesomeIcon className="ml-2" icon={toggleStates.culture ? 'chevron-up' : 'chevron-down'} />
              </Accordion.Toggle>
            </Card>
            {toggleStates.culture && (
              <Card className="card-detail-list-options">
                <Accordion.Collapse eventKey="3">
                  <Card.Body>
                    {/* cultures?.length !== 0 && */}
                    {cultures?.length !== 0 &&
                      cultures[0]?.data?.map((data) => (
                        <div
                          className="list-item-keys"
                          key={data.id}
                          value={data.id}
                          onClick={() => {
                            if (activeCulture.includes(data.id)) {
                              if (data.subject === 'Career & Technical Education') {
                                setActiveCulture(
                                  activeCulture.filter((index) => {
                                    if (index === 'Career & Technical Education' || index === 'Career and Technical Education') {
                                      return false;
                                    }
                                    return true;
                                  }),
                                );
                              } else {
                                setActiveCulture(activeCulture.filter((index) => index !== data.id));
                              }
                            } else {
                              setActiveCulture([...activeCulture, data.id]);
                            }
                          }}
                        >
                          <div className="card-detail-list-text-icon">
                            {activeCulture.includes(data.id) ? (
                              <FontAwesomeIcon className="card-detail-list-icon" icon="check-square" />
                            ) : (
                              <FontAwesomeIcon className="card-detail-list-icon" icon="square" />
                            )}
                            <span>{data.name}</span>
                          </div>
                        </div>
                      ))}
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
            )}
          </div>

          <div>
            <Card className="card-detail-header">
              <Accordion.Toggle
                as={Card.Header}
                eventKey="4"
                onClick={() =>
                  setToggleStates({
                    ...toggleStates,
                    culture: !toggleStates.culture,
                    date: true,
                    online_media_type: false,
                    data_source: false,
                    place: false,
                    object_type: false,
                    topic: false,
                  })
                }
              >
                Place
                <FontAwesomeIcon className="ml-2" icon={toggleStates.culture ? 'chevron-up' : 'chevron-down'} />
              </Accordion.Toggle>
            </Card>
            {toggleStates.culture && (
              <Card className="card-detail-list-options">
                <Accordion.Collapse eventKey="4">
                  <Card.Body>
                    {/* cultures?.length !== 0 && */}
                    {cultures?.length !== 0 &&
                      cultures[0]?.data?.map((data) => (
                        <div
                          className="list-item-keys"
                          key={data.id}
                          value={data.id}
                          onClick={() => {
                            if (activeCulture.includes(data.id)) {
                              if (data.subject === 'Career & Technical Education') {
                                setActiveCulture(
                                  activeCulture.filter((index) => {
                                    if (index === 'Career & Technical Education' || index === 'Career and Technical Education') {
                                      return false;
                                    }
                                    return true;
                                  }),
                                );
                              } else {
                                setActiveCulture(activeCulture.filter((index) => index !== data.id));
                              }
                            } else {
                              setActiveCulture([...activeCulture, data.id]);
                            }
                          }}
                        >
                          <div className="card-detail-list-text-icon">
                            {activeCulture.includes(data.id) ? (
                              <FontAwesomeIcon className="card-detail-list-icon" icon="check-square" />
                            ) : (
                              <FontAwesomeIcon className="card-detail-list-icon" icon="square" />
                            )}
                            <span>{data.name}</span>
                          </div>
                        </div>
                      ))}
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
            )}
          </div>

          <div>
            <Card className="card-detail-header">
              <Accordion.Toggle
                as={Card.Header}
                eventKey="5"
                onClick={() =>
                  setToggleStates({
                    ...toggleStates,
                    culture: !toggleStates.culture,
                    date: true,
                    online_media_type: false,
                    data_source: false,
                    place: false,
                    object_type: false,
                    topic: false,
                  })
                }
              >
                Resource Type
                <FontAwesomeIcon className="ml-2" icon={toggleStates.culture ? 'chevron-up' : 'chevron-down'} />
              </Accordion.Toggle>
            </Card>
            {toggleStates.culture && (
              <Card className="card-detail-list-options">
                <Accordion.Collapse eventKey="5">
                  <Card.Body>
                    {/* cultures?.length !== 0 && */}
                    {cultures?.length !== 0 &&
                      cultures[0]?.data?.map((data) => (
                        <div
                          className="list-item-keys"
                          key={data.id}
                          value={data.id}
                          onClick={() => {
                            if (activeCulture.includes(data.id)) {
                              if (data.subject === 'Career & Technical Education') {
                                setActiveCulture(
                                  activeCulture.filter((index) => {
                                    if (index === 'Career & Technical Education' || index === 'Career and Technical Education') {
                                      return false;
                                    }
                                    return true;
                                  }),
                                );
                              } else {
                                setActiveCulture(activeCulture.filter((index) => index !== data.id));
                              }
                            } else {
                              setActiveCulture([...activeCulture, data.id]);
                            }
                          }}
                        >
                          <div className="card-detail-list-text-icon">
                            {activeCulture.includes(data.id) ? (
                              <FontAwesomeIcon className="card-detail-list-icon" icon="check-square" />
                            ) : (
                              <FontAwesomeIcon className="card-detail-list-icon" icon="square" />
                            )}
                            <span>{data.name}</span>
                          </div>
                        </div>
                      ))}
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
            )}
          </div>

          <div>
            <Card className="card-detail-header">
              <Accordion.Toggle
                as={Card.Header}
                eventKey="6"
                onClick={() =>
                  setToggleStates({
                    ...toggleStates,
                    culture: !toggleStates.culture,
                    date: true,
                    online_media_type: false,
                    data_source: false,
                    place: false,
                    object_type: false,
                    topic: false,
                  })
                }
              >
                Topic
                <FontAwesomeIcon className="ml-2" icon={toggleStates.culture ? 'chevron-up' : 'chevron-down'} />
              </Accordion.Toggle>
            </Card>
            {toggleStates.culture && (
              <Card className="card-detail-list-options">
                <Accordion.Collapse eventKey="6">
                  <Card.Body>
                    {/* cultures?.length !== 0 && */}
                    {cultures?.length !== 0 &&
                      cultures[0]?.data?.map((data) => (
                        <div
                          className="list-item-keys"
                          key={data.id}
                          value={data.id}
                          onClick={() => {
                            if (activeCulture.includes(data.id)) {
                              if (data.subject === 'Career & Technical Education') {
                                setActiveCulture(
                                  activeCulture.filter((index) => {
                                    if (index === 'Career & Technical Education' || index === 'Career and Technical Education') {
                                      return false;
                                    }
                                    return true;
                                  }),
                                );
                              } else {
                                setActiveCulture(activeCulture.filter((index) => index !== data.id));
                              }
                            } else {
                              setActiveCulture([...activeCulture, data.id]);
                            }
                          }}
                        >
                          <div className="card-detail-list-text-icon">
                            {activeCulture.includes(data.id) ? (
                              <FontAwesomeIcon className="card-detail-list-icon" icon="check-square" />
                            ) : (
                              <FontAwesomeIcon className="card-detail-list-icon" icon="square" />
                            )}
                            <span>{data.name}</span>
                          </div>
                        </div>
                      ))}
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
            )}
          </div>
        </Accordion>
      </div>
    </div>
  );
};

export default SmithsonianFilter;
