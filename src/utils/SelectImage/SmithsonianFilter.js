/* eslint-disable no-unused-vars */
/* eslint-disable operator-linebreak */
/* eslint-disable no-shadow */
/* eslint-disable react/jsx-curly-newline */
/* eslint-disable implicit-arrow-linebreak */
import React, { useState, useEffect } from 'react';
import { Accordion, Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SearchInputMdSvg from 'iconLibrary/mainContainer/SearchInputMdSvg';

const dataJson = [
  {
    value: 'Culture',
    data: [
      { id: 1, name: 'African American Museum (22,640)' },
      { id: 2, name: 'African Art Museum (70,441)' },
      { id: 3, name: 'Air and Space Museum (48,084)' },
      { id: 4, name: 'American Art Museum (87,497)' },
    ],
  },
  {
    value: 'Data',
    data: [
      { id: 1, name: 'African American Museum (22,640)' },
      { id: 2, name: 'African Art Museum (70,441)' },
      { id: 3, name: 'Air and Space Museum (48,084)' },
      { id: 4, name: 'American Art Museum (87,497)' },
    ],
  },
  {
    value: 'Media Type',
    data: [
      { id: 1, name: 'African American Museum (22,640)' },
      { id: 2, name: 'African Art Museum (70,441)' },
      { id: 3, name: 'Air and Space Museum (48,084)' },
      { id: 4, name: 'American Art Museum (87,497)' },
    ],
  },
  {
    value: 'Museum/Unit',
    data: [
      { id: 1, name: 'African American Museum (22,640)' },
      { id: 2, name: 'African Art Museum (70,441)' },
      { id: 3, name: 'Air and Space Museum (48,084)' },
      { id: 4, name: 'American Art Museum (87,497)' },
    ],
  },
  {
    value: 'Place',
    data: [
      { id: 1, name: 'African American Museum (22,640)' },
      { id: 2, name: 'African Art Museum (70,441)' },
      { id: 3, name: 'Air and Space Museum (48,084)' },
      { id: 4, name: 'American Art Museum (87,497)' },
    ],
  },
  {
    value: 'Resource Type',
    data: [
      { id: 1, name: 'African American Museum (22,640)' },
      { id: 2, name: 'African Art Museum (70,441)' },
      { id: 3, name: 'Air and Space Museum (48,084)' },
      { id: 4, name: 'American Art Museum (87,497)' },
    ],
  },
  {
    value: 'Topic',
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
    date: false,
    online_media_type: false,
    data_source: false,
    place: false,
    object_type: false,
    topic: false,
  });
  const [activeCulture, setActiveCulture] = useState([]);
  const [activeDate, setActiveDate] = useState([]);
  const [activeMediaType, setActiveMediaType] = useState([]);
  const [activeMuseumUnit, setActiveMuseumUnit] = useState([]);
  const [activePlace, setActivePlace] = useState([]);
  const [activeResourceType, setActiveResourceType] = useState([]);
  const [activeTopic, setActiveTopic] = useState([]);

  const [searchValue, setSearchValue] = useState();

  const [cultures, setCulture] = useState([]);
  const [dates, setDates] = useState([]);
  const [mediaTypes, setMediaTypes] = useState([]);
  const [museumUnits, setMuseumUnits] = useState([]);
  const [places, setPlaces] = useState([]);
  const [resourceTypes, setResourceTypes] = useState([]);
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    setCulture(dataJson[0].data);
    setDates(dataJson[1].data);
    setMediaTypes(dataJson[2].data);
    setMuseumUnits(dataJson[3].data);
    setPlaces(dataJson[4].data);
    setResourceTypes(dataJson[5].data);
    setTopics(dataJson[6].data);
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
                onClick={() => {
                  setToggleStates({
                    ...toggleStates,
                    culture: !toggleStates.culture,
                    date: false,
                    online_media_type: false,
                    data_source: false,
                    place: false,
                    object_type: false,
                    topic: false,
                  });
                  setCulture(dataJson[0].data);
                  setSearchValue('');
                }}
              >
                Culture
                <FontAwesomeIcon className="ml-2" icon={toggleStates.culture ? 'chevron-up' : 'chevron-down'} />
              </Accordion.Toggle>
            </Card>
            {toggleStates.culture && (
              <Card className="card-detail-list-options">
                <Accordion.Collapse eventKey="0">
                  <Card.Body>
                    <div className="card-detail-list-search-icon">
                      <div className="card-detail-list-search">
                        <input
                          type="text"
                          placeholder="Search..."
                          value={searchValue}
                          onChange={(e) => {
                            setSearchValue(e.target.value);
                            if (e.target.value.length > 3) {
                              setCulture(dataJson[0].data?.filter((search) => search.name.toLowerCase().match(e.target.value.toLowerCase()) && search));
                            }
                            if (e.target.value.length < 1) {
                              setCulture(dataJson[0].data);
                            }
                          }}
                        />
                      </div>
                      <div className="card-detail-list-icon">
                        <SearchInputMdSvg primaryColor="#515151" />
                      </div>
                    </div>
                    {/* cultures?.length !== 0 && */}
                    {cultures?.length !== 0 &&
                      cultures?.map((data) => (
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
                onClick={() => {
                  setSearchValue('');
                  setDates(dataJson[1].data);
                  setToggleStates({
                    ...toggleStates,
                    culture: false,
                    date: !toggleStates.date,
                    online_media_type: false,
                    data_source: false,
                    place: false,
                    object_type: false,
                    topic: false,
                  });
                }}
              >
                Date
                <FontAwesomeIcon className="ml-2" icon={toggleStates.data ? 'chevron-up' : 'chevron-down'} />
              </Accordion.Toggle>
            </Card>
            {toggleStates.date && (
              <Card className="card-detail-list-options">
                <Accordion.Collapse eventKey="1">
                  <Card.Body>
                    <div className="card-detail-list-search-icon">
                      <div className="card-detail-list-search">
                        <input
                          type="text"
                          placeholder="Search..."
                          value={searchValue}
                          onChange={(e) => {
                            setSearchValue(e.target.value);
                            if (e.target.value.length > 3) {
                              setDates(dataJson[1].data.filter((search) => search.name.toLowerCase().match(e.target.value.toLowerCase()) && search));
                            }
                            if (e.target.value.length < 1) {
                              setDates(dataJson[1].data);
                            }
                          }}
                        />
                      </div>
                      <div className="card-detail-list-icon">
                        <SearchInputMdSvg primaryColor="#515151" />
                      </div>
                    </div>
                    {/* cultures?.length !== 0 && */}
                    {dates?.length !== 0 &&
                      dates?.map((data) => (
                        <div
                          className="list-item-keys"
                          key={data.id}
                          value={data.id}
                          onClick={() => {
                            if (activeDate.includes(data.id)) {
                              if (data.subject === 'Career & Technical Education') {
                                setActiveDate(
                                  activeDate.filter((index) => {
                                    if (index === 'Career & Technical Education' || index === 'Career and Technical Education') {
                                      return false;
                                    }
                                    return true;
                                  }),
                                );
                              } else {
                                setActiveDate(activeDate.filter((index) => index !== data.id));
                              }
                            } else {
                              setActiveDate([...activeDate, data.id]);
                            }
                          }}
                        >
                          <div className="card-detail-list-text-icon">
                            {activeDate.includes(data.id) ? (
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
                onClick={() => {
                  setSearchValue('');
                  setMediaTypes(dataJson[2].data);
                  setToggleStates({
                    ...toggleStates,
                    culture: false,
                    date: false,
                    online_media_type: !toggleStates.online_media_type,
                    data_source: false,
                    place: false,
                    object_type: false,
                    topic: false,
                  });
                }}
              >
                Media Type
                <FontAwesomeIcon className="ml-2" icon={toggleStates.online_media_type ? 'chevron-up' : 'chevron-down'} />
              </Accordion.Toggle>
            </Card>
            {toggleStates.online_media_type && (
              <Card className="card-detail-list-options">
                <Accordion.Collapse eventKey="2">
                  <Card.Body>
                    <div className="card-detail-list-search-icon">
                      <div className="card-detail-list-search">
                        <input
                          type="text"
                          placeholder="Search..."
                          value={searchValue}
                          onChange={(e) => {
                            setSearchValue(e.target.value);
                            if (e.target.value.length > 3) {
                              setMediaTypes(dataJson[2].data?.filter((search) => search.name.toLowerCase().match(e.target.value.toLowerCase()) && search));
                            }
                            if (e.target.value.length < 1) {
                              setMediaTypes(dataJson[2].data);
                            }
                          }}
                        />
                      </div>
                      <div className="card-detail-list-icon">
                        <SearchInputMdSvg primaryColor="#515151" />
                      </div>
                    </div>
                    {/* cultures?.length !== 0 && */}
                    {mediaTypes?.length !== 0 &&
                      mediaTypes?.map((data) => (
                        <div
                          className="list-item-keys"
                          key={data.id}
                          value={data.id}
                          onClick={() => {
                            if (activeMediaType.includes(data.id)) {
                              if (data.subject === 'Career & Technical Education') {
                                setActiveMediaType(
                                  activeMediaType.filter((index) => {
                                    if (index === 'Career & Technical Education' || index === 'Career and Technical Education') {
                                      return false;
                                    }
                                    return true;
                                  }),
                                );
                              } else {
                                setActiveMediaType(activeMediaType.filter((index) => index !== data.id));
                              }
                            } else {
                              setActiveMediaType([...activeMediaType, data.id]);
                            }
                          }}
                        >
                          <div className="card-detail-list-text-icon">
                            {activeMediaType.includes(data.id) ? (
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
                onClick={() => {
                  setSearchValue('');
                  setMuseumUnits(dataJson[3].data);
                  setToggleStates({
                    ...toggleStates,
                    culture: false,
                    date: false,
                    online_media_type: false,
                    data_source: !toggleStates.data_source,
                    place: false,
                    object_type: false,
                    topic: false,
                  });
                }}
              >
                Museum/Unit
                <FontAwesomeIcon className="ml-2" icon={toggleStates.data_source ? 'chevron-up' : 'chevron-down'} />
              </Accordion.Toggle>
            </Card>
            {toggleStates.data_source && (
              <Card className="card-detail-list-options">
                <Accordion.Collapse eventKey="3">
                  <Card.Body>
                    <div className="card-detail-list-search-icon">
                      <div className="card-detail-list-search">
                        <input
                          type="text"
                          placeholder="Search..."
                          value={searchValue}
                          onChange={(e) => {
                            setSearchValue(e.target.value);
                            if (e.target.value.length > 3) {
                              setMuseumUnits(dataJson[3].data?.filter((search) => search.name.toLowerCase().match(e.target.value.toLowerCase()) && search));
                            }
                            if (e.target.value.length < 1) {
                              setMuseumUnits(dataJson[3].data);
                            }
                          }}
                        />
                      </div>
                      <div className="card-detail-list-icon">
                        <SearchInputMdSvg primaryColor="#515151" />
                      </div>
                    </div>
                    {/* cultures?.length !== 0 && */}
                    {museumUnits?.length !== 0 &&
                      museumUnits?.map((data) => (
                        <div
                          className="list-item-keys"
                          key={data.id}
                          value={data.id}
                          onClick={() => {
                            if (activeMuseumUnit.includes(data.id)) {
                              if (data.subject === 'Career & Technical Education') {
                                setActiveMuseumUnit(
                                  activeMuseumUnit.filter((index) => {
                                    if (index === 'Career & Technical Education' || index === 'Career and Technical Education') {
                                      return false;
                                    }
                                    return true;
                                  }),
                                );
                              } else {
                                setActiveMuseumUnit(activeMuseumUnit.filter((index) => index !== data.id));
                              }
                            } else {
                              setActiveMuseumUnit([...activeMuseumUnit, data.id]);
                            }
                          }}
                        >
                          <div className="card-detail-list-text-icon">
                            {activeMuseumUnit.includes(data.id) ? (
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
                onClick={() => {
                  setSearchValue('');
                  setPlaces(dataJson[4].data);
                  setToggleStates({
                    ...toggleStates,
                    culture: false,
                    date: false,
                    online_media_type: false,
                    data_source: false,
                    place: !toggleStates.place,
                    object_type: false,
                    topic: false,
                  });
                }}
              >
                Place
                <FontAwesomeIcon className="ml-2" icon={toggleStates.place ? 'chevron-up' : 'chevron-down'} />
              </Accordion.Toggle>
            </Card>
            {toggleStates.place && (
              <Card className="card-detail-list-options">
                <Accordion.Collapse eventKey="4">
                  <Card.Body>
                    <div className="card-detail-list-search-icon">
                      <div className="card-detail-list-search">
                        <input
                          type="text"
                          placeholder="Search..."
                          value={searchValue}
                          onChange={(e) => {
                            setSearchValue(e.target.value);
                            if (e.target.value.length > 3) {
                              setPlaces(dataJson[4].data?.filter((search) => search.name.toLowerCase().match(e.target.value.toLowerCase()) && search));
                            }
                            if (e.target.value.length < 1) {
                              setPlaces(dataJson[4].data);
                            }
                          }}
                        />
                      </div>
                      <div className="card-detail-list-icon">
                        <SearchInputMdSvg primaryColor="#515151" />
                      </div>
                    </div>
                    {places?.length !== 0 &&
                      places?.map((data) => (
                        <div
                          className="list-item-keys"
                          key={data.id}
                          value={data.id}
                          onClick={() => {
                            if (activePlace.includes(data.id)) {
                              if (data.subject === 'Career & Technical Education') {
                                setActivePlace(
                                  activePlace.filter((index) => {
                                    if (index === 'Career & Technical Education' || index === 'Career and Technical Education') {
                                      return false;
                                    }
                                    return true;
                                  }),
                                );
                              } else {
                                setActivePlace(activePlace.filter((index) => index !== data.id));
                              }
                            } else {
                              setActivePlace([...activePlace, data.id]);
                            }
                          }}
                        >
                          <div className="card-detail-list-text-icon">
                            {activePlace.includes(data.id) ? (
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
                onClick={() => {
                  setSearchValue('');
                  setResourceTypes(dataJson[5].data);
                  setToggleStates({
                    ...toggleStates,
                    culture: false,
                    date: false,
                    online_media_type: false,
                    data_source: false,
                    place: false,
                    object_type: !toggleStates.object_type,
                    topic: false,
                  });
                }}
              >
                Resource Type
                <FontAwesomeIcon className="ml-2" icon={toggleStates.object_type ? 'chevron-up' : 'chevron-down'} />
              </Accordion.Toggle>
            </Card>
            {toggleStates.object_type && (
              <Card className="card-detail-list-options">
                <Accordion.Collapse eventKey="5">
                  <Card.Body>
                    <div className="card-detail-list-search-icon">
                      <div className="card-detail-list-search">
                        <input
                          type="text"
                          placeholder="Search..."
                          value={searchValue}
                          onChange={(e) => {
                            setSearchValue(e.target.value);
                            if (e.target.value.length > 3) {
                              setResourceTypes(dataJson[5].data?.filter((search) => search.name.toLowerCase().match(e.target.value.toLowerCase()) && search));
                            }
                            if (e.target.value.length < 1) {
                              setResourceTypes(dataJson[5].data);
                            }
                          }}
                        />
                      </div>
                      <div className="card-detail-list-icon">
                        <SearchInputMdSvg primaryColor="#515151" />
                      </div>
                    </div>
                    {/* cultures?.length !== 0 && */}
                    {resourceTypes?.length !== 0 &&
                      resourceTypes?.map((data) => (
                        <div
                          className="list-item-keys"
                          key={data.id}
                          value={data.id}
                          onClick={() => {
                            if (activeResourceType.includes(data.id)) {
                              if (data.subject === 'Career & Technical Education') {
                                setActiveResourceType(
                                  activeResourceType.filter((index) => {
                                    if (index === 'Career & Technical Education' || index === 'Career and Technical Education') {
                                      return false;
                                    }
                                    return true;
                                  }),
                                );
                              } else {
                                setActiveResourceType(activeResourceType.filter((index) => index !== data.id));
                              }
                            } else {
                              setActiveResourceType([...activeResourceType, data.id]);
                            }
                          }}
                        >
                          <div className="card-detail-list-text-icon">
                            {activeResourceType.includes(data.id) ? (
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
                onClick={() => {
                  setSearchValue('');
                  setResourceTypes(dataJson[6].data);
                  setToggleStates({
                    ...toggleStates,
                    culture: false,
                    date: false,
                    online_media_type: false,
                    data_source: false,
                    place: false,
                    object_type: false,
                    topic: !toggleStates.topic,
                  });
                }}
              >
                Topic
                <FontAwesomeIcon className="ml-2" icon={toggleStates.topic ? 'chevron-up' : 'chevron-down'} />
              </Accordion.Toggle>
            </Card>
            {toggleStates.topic && (
              <Card className="card-detail-list-options">
                <Accordion.Collapse eventKey="6">
                  <Card.Body>
                    <div className="card-detail-list-search-icon">
                      <div className="card-detail-list-search">
                        <input
                          type="text"
                          placeholder="Search..."
                          value={searchValue}
                          onChange={(e) => {
                            setSearchValue(e.target.value);
                            if (e.target.value.length > 3) {
                              setTopics(dataJson[6].data?.filter((search) => search.name.toLowerCase().match(e.target.value.toLowerCase()) && search));
                            }
                            if (e.target.value.length < 1) {
                              setTopics(dataJson[6].data);
                            }
                          }}
                        />
                      </div>
                      <div className="card-detail-list-icon">
                        <SearchInputMdSvg primaryColor="#515151" />
                      </div>
                    </div>
                    {/* cultures?.length !== 0 && */}
                    {topics?.length !== 0 &&
                      topics?.map((data) => (
                        <div
                          className="list-item-keys"
                          key={data.id}
                          value={data.id}
                          onClick={() => {
                            if (activeTopic.includes(data.id)) {
                              if (data.subject === 'Career & Technical Education') {
                                setActiveTopic(
                                  activeTopic.filter((index) => {
                                    if (index === 'Career & Technical Education' || index === 'Career and Technical Education') {
                                      return false;
                                    }
                                    return true;
                                  }),
                                );
                              } else {
                                setActiveTopic(activeTopic.filter((index) => index !== data.id));
                              }
                            } else {
                              setActiveTopic([...activeTopic, data.id]);
                            }
                          }}
                        >
                          <div className="card-detail-list-text-icon">
                            {activeTopic.includes(data.id) ? (
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
