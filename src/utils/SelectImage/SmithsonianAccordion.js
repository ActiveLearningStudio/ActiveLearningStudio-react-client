/* eslint-disable */

import React, { useState, useEffect } from 'react';
import { Accordion, Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SearchInputMdSvg from 'iconLibrary/mainContainer/SearchInputMdSvg';

const SmithsonianAccordion = ({
  accordionTitle,

  eventKey,
  smithsonianData,

  activeSmithsonianAccordion,
  setActiveSmithsonianAccordion,
}) => {
  const [searchValue, setSearchValue] = useState();

  const updateSearchList = (value) => {
    if (activeSmithsonianAccordion.includes(value)) {
      setActiveSmithsonianAccordion(activeSmithsonianAccordion.filter((data) => data !== value));
    } else {
      setActiveSmithsonianAccordion([...activeSmithsonianAccordion, value]);
    }
  };
  return (
    <div>
      <Card className="card-detail-header">
        <Accordion.Toggle as={Card.Header} eventKey={eventKey}>
          {accordionTitle}
          <FontAwesomeIcon className="ml-2" icon={true ? 'chevron-up' : 'chevron-down'} />
        </Accordion.Toggle>

        <Accordion.Collapse eventKey={eventKey} className="card-detail-list-options">
          <Card.Body>
            <div className="card-detail-list-search-icon">
              <div className="card-detail-list-search">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchValue}
                  onChange={async (e) => {
                    setSearchValue(e.target.value);
                  }}
                />
              </div>
              <div className="card-detail-list-icon">
                <SearchInputMdSvg primaryColor="#515151" />
              </div>
            </div>
            <div className="smithList">
              {searchValue
                ? smithsonianData?.map(
                    (data) =>
                      data.toLowerCase()?.includes(searchValue.toLowerCase()) && (
                        <div className="list-item-keys" key={data} v onClick={() => updateSearchList(data)}>
                          <div className="card-detail-list-text-icon">
                            {activeSmithsonianAccordion.includes(data) ? (
                              <FontAwesomeIcon className="card-detail-list-icon" icon="check-square" />
                            ) : (
                              <FontAwesomeIcon className="card-detail-list-icon" icon="square" />
                            )}
                            <span>{data}</span>
                          </div>
                        </div>
                      ),
                  )
                : smithsonianData?.map((data) => (
                    <div className="list-item-keys" key={data} onClick={() => updateSearchList(data)}>
                      <div className="card-detail-list-text-icon">
                        {activeSmithsonianAccordion.includes(data) ? (
                          <FontAwesomeIcon className="card-detail-list-icon" icon="check-square" />
                        ) : (
                          <FontAwesomeIcon className="card-detail-list-icon" icon="square" />
                        )}
                        <span>{data}</span>
                      </div>
                    </div>
                  ))}
            </div>
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    </div>
  );
};

export default SmithsonianAccordion;
