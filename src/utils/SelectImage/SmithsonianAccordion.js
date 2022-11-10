/* eslint-disable */

import React, { useState, useEffect } from 'react';
import { Accordion, Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SearchInputMdSvg from 'iconLibrary/mainContainer/SearchInputMdSvg';
import SquareSmSvg from 'iconLibrary/mainContainer/SquareSmSvg';
import { getGlobalColor } from 'containers/App/DynamicBrandingApply';
import SquareCheckSmSvg from 'iconLibrary/mainContainer/SquareCheckSmSvg';
import ChevronDownSmSvg from 'iconLibrary/mainContainer/ChevronDownSmSvg';
import ChevronRightSmSvg from 'iconLibrary/mainContainer/ChevronRightSmSvg';

const SmithsonianAccordion = ({
  accordionTitle,
  setSmythCount,
  eventKey,
  smithsonianData,

  activeSmithsonianAccordion,
  setActiveSmithsonianAccordion,
}) => {
  const [searchValue, setSearchValue] = useState();

  const updateSearchList = (value) => {
    setSmythCount(0);
    if (activeSmithsonianAccordion.includes(value)) {
      setActiveSmithsonianAccordion(activeSmithsonianAccordion.filter((data) => data !== value));
    } else {
      setActiveSmithsonianAccordion([...activeSmithsonianAccordion, value]);
    }
  };
  const primaryColor = getGlobalColor('--main-primary-color');
  const paragraphColor = getGlobalColor('--main-paragraph-text-color');
  return (
    <div>
      <Card className="card-detail-header">
        <Accordion.Toggle as={Card.Header} eventKey={eventKey}>
          {accordionTitle}

          {true ? <ChevronDownSmSvg primaryColor={primaryColor} /> : <ChevronRightSmSvg primaryColor={primaryColor} />}
          {/* <FontAwesomeIcon className="ml-2" icon={true ? 'chevron-up' : 'chevron-down'} /> */}
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
                <SearchInputMdSvg primaryColor={paragraphColor} />
              </div>
            </div>
            <div className="smithList">
              {searchValue
                ? smithsonianData?.map(
                    (data) =>
                      data.toLowerCase()?.includes(searchValue.toLowerCase()) && (
                        <div className="list-item-keys" key={data} onClick={() => updateSearchList(data)}>
                          <div className="card-detail-list-text-icon">
                            {activeSmithsonianAccordion.includes(data) ? (
                              // <FontAwesomeIcon className="card-detail-list-icon" icon="check-square" />
                              <SquareCheckSmSvg primaryColor={primaryColor} />
                            ) : (
                              <SquareSmSvg primaryColor={primaryColor} />
                              // <FontAwesomeIcon className="card-detail-list-icon" icon="square" />
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
                          // <FontAwesomeIcon className="card-detail-list-icon" icon="check-square" />
                          <SquareCheckSmSvg primaryColor={primaryColor} />
                        ) : (
                          <SquareSmSvg primaryColor={primaryColor} />
                          // <FontAwesomeIcon className="card-detail-list-icon" icon="square" />
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
