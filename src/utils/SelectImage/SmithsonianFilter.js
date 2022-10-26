/* eslint-disable*/

import React, { useState, useEffect } from 'react';
import { Accordion } from 'react-bootstrap';

import SmithsonianAccordion from './SmithsonianAccordion';

const SmithsonianFilter = ({ setSmithsonianQuery, smithsonianJsonData }) => {
  const [activeSearch, setactiveSearch] = useState([]);

  useEffect(() => {
    if (activeSearch.length > 0) {
      setSmithsonianQuery(activeSearch);
    }
  }, [activeSearch]);

  return (
    <div className="smithsonian_filter_menu_detail">
      <div className="refine-search">
        <Accordion defaultActiveKey="0">
          {Object.keys(smithsonianJsonData).map((data, counter) => (
            <SmithsonianAccordion
              key={counter}
              accordionTitle={data.split('_')?.join(' ')}
              eventKey={String(counter)}
              smithsonianData={smithsonianJsonData[data]}
              setActiveSmithsonianAccordion={setactiveSearch}
              activeSmithsonianAccordion={activeSearch}
            />
          ))}
        </Accordion>
      </div>
    </div>
  );
};

export default SmithsonianFilter;
