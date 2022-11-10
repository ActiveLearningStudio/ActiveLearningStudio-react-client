/* eslint-disable*/

import React, { useState, useEffect } from 'react';
import { Accordion } from 'react-bootstrap';

import SmithsonianAccordion from './SmithsonianAccordion';

const smithsonian_title = ['Culture', 'Date', 'Media Type', 'Museum/Unit', 'Place', 'Resource Type', 'Topic'];

const SmithsonianFilter = ({ setSmythCount, setSmithsonianQuery, smithsonianJsonData, clearSelection, setClearSelection }) => {
  const [activeSearch, setactiveSearch] = useState([]);

  useEffect(() => {
    if (activeSearch.length > 0) {
      setSmithsonianQuery(activeSearch);
    }
  }, [activeSearch]);

  useEffect(() => {
    if (clearSelection) {
      setactiveSearch([]);
      setClearSelection(false);
    }
  }, [clearSelection]);

  return (
    <div className="smithsonian_filter_menu_detail">
      <div className="refine-search">
        <Accordion defaultActiveKey="0">
          {Object.keys(smithsonianJsonData).map((data, counter) => (
            <SmithsonianAccordion
              key={counter}
              // accordionTitle={data.split('_')?.join(' ')}
              accordionTitle={smithsonian_title[counter]}
              eventKey={String(counter)}
              smithsonianData={smithsonianJsonData[data]}
              setActiveSmithsonianAccordion={setactiveSearch}
              activeSmithsonianAccordion={activeSearch}
              setSmythCount={setSmythCount}
            />
          ))}
        </Accordion>
      </div>
    </div>
  );
};

export default SmithsonianFilter;
