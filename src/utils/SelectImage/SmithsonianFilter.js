/* eslint-disable react/prop-types */
/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-vars */
/* eslint-disable operator-linebreak */
/* eslint-disable no-shadow */
/* eslint-disable react/jsx-curly-newline */
/* eslint-disable implicit-arrow-linebreak */
import React, { useState, useEffect } from 'react';
import { Accordion } from 'react-bootstrap';
import resourceService from 'services/resource.service';
import SmithsonianAccordion from './SmithsonianAccordion';
import smithsonianJsonData from './SmithsonianData';

const SmithsonianFilter = ({ setSmithsonianQuery }) => {
  const [toggleStates, setToggleStates] = useState({
    culture: true,
    date: false,
    online_media_type: false,
    data_source: false,
    place: false,
    object_type: false,
    topic: false,
  });
  const [toggleStatesV2, setToggleStatesV2] = useState([
    {
      key: 'culture',
      status: true,
    },
    {
      key: 'date',
      status: false,
    },
    {
      key: 'online_media_type',
      status: false,
    },
    {
      key: 'data_source',
      status: false,
    },
    {
      key: 'place',
      status: false,
    },
    {
      key: 'object_type',
      status: false,
    },
    {
      key: 'topic',
      status: false,
    },
  ]);
  const [activeCulture, setActiveCulture] = useState([]);
  const [activeDate, setActiveDate] = useState([]);
  const [activeMediaType, setActiveMediaType] = useState([]);
  const [activeMuseumUnit, setActiveMuseumUnit] = useState([]);
  const [activePlace, setActivePlace] = useState([]);
  const [activeResourceType, setActiveResourceType] = useState([]);
  const [activeTopic, setActiveTopic] = useState([]);

  // const [searchValue, setSearchValue] = useState();

  const [cultures, setCulture] = useState([]);
  const [dates, setDates] = useState([]);
  const [mediaTypes, setMediaTypes] = useState([]);
  const [museumUnits, setMuseumUnits] = useState([]);
  const [places, setPlaces] = useState([]);
  const [resourceTypes, setResourceTypes] = useState([]);
  const [topics, setTopics] = useState([]);
  const [filterForSearch, setFilterForSearch] = useState([]);
  const getSmithsonianList = async (category) => {
    const data = await resourceService.smithsonianList({ category });
    if (data?.response.terms.length > 0) {
      return data?.response.terms;
    }
    return [];
  };

  // Filter Selection
  useEffect(() => {
    // For culture

    if (activeCulture.length > 0) {
      const findIndex = filterForSearch.findIndex((_data) => _data.category === 'culture');
      if (findIndex >= 0) {
        setFilterForSearch(
          filterForSearch.map((filterData) => {
            if (filterData?.category === 'culture') {
              filterData.data = activeCulture;
            }
            return filterData;
          }),
        );
      } else {
        setFilterForSearch([...filterForSearch, { category: 'culture', data: activeCulture }]);
      }
    } else {
      const getIndex = filterForSearch.findIndex((_data) => _data.category === 'culture');
      if (getIndex >= 0) {
        // It Not working
        setFilterForSearch(filterForSearch.filter((filterData) => filterData?.category !== 'culture'));
      }
    }

    // date

    if (activeDate.length > 0) {
      const findIndex = filterForSearch.findIndex((_data) => _data.category === 'date');
      if (findIndex >= 0) {
        setFilterForSearch(
          filterForSearch.map((filterData) => {
            if (filterData?.category === 'date') {
              filterData.data = activeDate;
            }
            return filterData;
          }),
        );
      } else {
        setFilterForSearch([...filterForSearch, { category: 'date', data: activeDate }]);
      }
    }

    // online_media_type

    if (activeMediaType.length > 0) {
      const findIndex = filterForSearch.findIndex((_data) => _data.category === 'online_media_type');
      if (findIndex >= 0) {
        setFilterForSearch(
          filterForSearch.map((filterData) => {
            if (filterData?.category === 'online_media_type') {
              filterData.data = activeMediaType;
            }
            return filterData;
          }),
        );
      } else {
        setFilterForSearch([...filterForSearch, { category: 'online_media_type', data: activeMediaType }]);
      }
    }

    // data_source

    if (activeMuseumUnit.length > 0) {
      const findIndex = filterForSearch.findIndex((_data) => _data.category === 'data_source');
      if (findIndex >= 0) {
        setFilterForSearch(
          filterForSearch.map((filterData) => {
            if (filterData?.category === 'data_source') {
              filterData.data = activeMuseumUnit;
            }
            return filterData;
          }),
        );
      } else {
        setFilterForSearch([...filterForSearch, { category: 'data_source', data: activeMuseumUnit }]);
      }
    }
    // place

    if (activePlace.length > 0) {
      const findIndex = filterForSearch.findIndex((_data) => _data.category === 'place');
      if (findIndex >= 0) {
        setFilterForSearch(
          filterForSearch.map((filterData) => {
            if (filterData?.category === 'place') {
              filterData.data = activePlace;
            }
            return filterData;
          }),
        );
      } else {
        setFilterForSearch([...filterForSearch, { category: 'place', data: activePlace }]);
      }
    }
    // object_type

    if (activeResourceType.length > 0) {
      const findIndex = filterForSearch.findIndex((_data) => _data.category === 'object_type');
      if (findIndex >= 0) {
        setFilterForSearch(
          filterForSearch.map((filterData) => {
            if (filterData?.category === 'object_type') {
              filterData.data = activeResourceType;
            }
            return filterData;
          }),
        );
      } else {
        setFilterForSearch([...filterForSearch, { category: 'object_type', data: activeResourceType }]);
      }
    }
    // topic

    if (activeResourceType.length > 0) {
      const findIndex = activeTopic.findIndex((_data) => _data.category === 'topic');
      if (findIndex >= 0) {
        setFilterForSearch(
          filterForSearch.map((filterData) => {
            if (filterData?.category === 'topic') {
              filterData.data = activeTopic;
            }
            return filterData;
          }),
        );
      } else {
        setFilterForSearch([...filterForSearch, { category: 'topic', data: activeTopic }]);
      }
    }
    setSmithsonianQuery(filterForSearch);
    console.log('filerter:', filterForSearch);
  }, [activeCulture, activeDate, activeMediaType, activeMuseumUnit, activePlace, activeResourceType, activeTopic]);

  useEffect(() => {
    // async function fetchMyAPI() {
    //   const data = await getSmithsonianList('culture');
    //   setCulture(data);
    // }

    // fetchMyAPI();

    setCulture(smithsonianJsonData.culture);
    setDates(smithsonianJsonData.date);
    setMediaTypes(smithsonianJsonData.online_media_type);
    setMuseumUnits(smithsonianJsonData.data_source);
    setPlaces(smithsonianJsonData.place);
    setResourceTypes(smithsonianJsonData.object_type);
    setTopics(smithsonianJsonData.culture);
  }, []);

  return (
    <div className="smithsonian_filter_menu_detail">
      <div className="refine-search">
        <Accordion defaultActiveKey="0">
          <SmithsonianAccordion
            accordionTitle="Culture"
            category="culture"
            activeTab="culture"
            eventKey="0"
            smithsonianData={smithsonianJsonData.culture}
            toggleStatesV2={toggleStatesV2}
            setToggleStatesV2={setToggleStatesV2}
            getSmithsonianList={getSmithsonianList}
            setSmithsonianAccordionData={setCulture}
            smithsonianAccordionData={cultures}
            setActiveSmithsonianAccordion={setActiveCulture}
            activeSmithsonianAccordion={activeCulture}
          />

          <SmithsonianAccordion
            accordionTitle="Date"
            category="date"
            activeTab="date"
            eventKey="1"
            smithsonianData={smithsonianJsonData.date}
            toggleStatesV2={toggleStatesV2}
            setToggleStatesV2={setToggleStatesV2}
            getSmithsonianList={getSmithsonianList}
            setSmithsonianAccordionData={setDates}
            smithsonianAccordionData={dates}
            setActiveSmithsonianAccordion={setActiveDate}
            activeSmithsonianAccordion={activeDate}
          />

          <SmithsonianAccordion
            accordionTitle="Media Type"
            category="online_media_type"
            activeTab="online_media_type"
            eventKey="2"
            smithsonianData={smithsonianJsonData.online_media_type}
            toggleStatesV2={toggleStatesV2}
            setToggleStatesV2={setToggleStatesV2}
            getSmithsonianList={getSmithsonianList}
            setSmithsonianAccordionData={setMediaTypes}
            smithsonianAccordionData={mediaTypes}
            setActiveSmithsonianAccordion={setActiveMediaType}
            activeSmithsonianAccordion={activeMediaType}
          />

          <SmithsonianAccordion
            accordionTitle="Museum/Unit"
            category="data_source"
            activeTab="data_source"
            eventKey="3"
            smithsonianData={smithsonianJsonData.data_source}
            toggleStatesV2={toggleStatesV2}
            setToggleStatesV2={setToggleStatesV2}
            getSmithsonianList={getSmithsonianList}
            setSmithsonianAccordionData={setMuseumUnits}
            smithsonianAccordionData={museumUnits}
            setActiveSmithsonianAccordion={setActiveMuseumUnit}
            activeSmithsonianAccordion={activeMuseumUnit}
          />

          <SmithsonianAccordion
            accordionTitle="Place"
            category="place"
            activeTab="place"
            eventKey="4"
            smithsonianData={smithsonianJsonData.place}
            toggleStatesV2={toggleStatesV2}
            setToggleStatesV2={setToggleStatesV2}
            getSmithsonianList={getSmithsonianList}
            setSmithsonianAccordionData={setPlaces}
            smithsonianAccordionData={places}
            setActiveSmithsonianAccordion={setActivePlace}
            activeSmithsonianAccordion={activePlace}
          />

          <SmithsonianAccordion
            accordionTitle="Resource Type"
            category="object_type"
            activeTab="object_type"
            eventKey="5"
            smithsonianData={smithsonianJsonData.object_type}
            toggleStatesV2={toggleStatesV2}
            setToggleStatesV2={setToggleStatesV2}
            getSmithsonianList={getSmithsonianList}
            setSmithsonianAccordionData={setResourceTypes}
            smithsonianAccordionData={resourceTypes}
            setActiveSmithsonianAccordion={setActiveResourceType}
            activeSmithsonianAccordion={activeResourceType}
          />

          <SmithsonianAccordion
            accordionTitle="Topic"
            category="topic"
            activeTab="topic"
            eventKey="6"
            smithsonianData={smithsonianJsonData.topic}
            toggleStatesV2={toggleStatesV2}
            setToggleStatesV2={setToggleStatesV2}
            getSmithsonianList={getSmithsonianList}
            setSmithsonianAccordionData={setTopics}
            smithsonianAccordionData={topics}
            setActiveSmithsonianAccordion={setActiveTopic}
            activeSmithsonianAccordion={activeTopic}
          />
        </Accordion>
      </div>
    </div>
  );
};

export default SmithsonianFilter;
