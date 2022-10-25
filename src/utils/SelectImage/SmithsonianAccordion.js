/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
/* eslint-disable operator-linebreak */
/* eslint-disable object-curly-newline */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { Accordion, Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SearchInputMdSvg from 'iconLibrary/mainContainer/SearchInputMdSvg';

const SmithsonianAccordion = ({
  accordionTitle,
  category,
  activeTab,
  eventKey,
  smithsonianData,
  toggleStatesV2,
  setToggleStatesV2,
  getSmithsonianList,
  setSmithsonianAccordionData,
  smithsonianAccordionData,
  activeSmithsonianAccordion,
  setActiveSmithsonianAccordion,
}) => {
  const [searchValue, setSearchValue] = useState();
  return (
    <div>
      <Card className="card-detail-header">
        <Accordion.Toggle
          as={Card.Header}
          eventKey={eventKey}
          onClick={async () => {
            setToggleStatesV2(
              toggleStatesV2.map((data) => {
                if (data.key === activeTab) {
                  data.status = !data.status;
                } else {
                  data.status = false;
                }

                return data;
              }),
            );
            // const getData = await getSmithsonianList(category);
            setSmithsonianAccordionData(smithsonianData);

            setSearchValue('');
          }}
        >
          {accordionTitle}
          <FontAwesomeIcon className="ml-2" icon={toggleStatesV2.filter((data) => data.key === activeTab && data)[0].status ? 'chevron-up' : 'chevron-down'} />
        </Accordion.Toggle>
      </Card>
      {toggleStatesV2.filter((data) => data.key === activeTab && data)[0].status && (
        <Card className="card-detail-list-options">
          <Accordion.Collapse eventKey={eventKey}>
            <Card.Body>
              <div className="card-detail-list-search-icon">
                <div className="card-detail-list-search">
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchValue}
                    onChange={async (e) => {
                      setSearchValue(e.target.value);
                      if (e.target.value.length > 3) {
                        // setSmithsonianAccordionData(smithsonianAccordionData?.filter((search) => search.toLowerCase().match(e.target.value.toLowerCase()) && search));
                        setSmithsonianAccordionData(smithsonianData?.filter((search) => search.toLowerCase().match(e.target.value.toLowerCase()) && search));
                      }
                      if (e.target.value.length < 1) {
                        // const data = await getSmithsonianList(category);
                        // setSmithsonianAccordionData(data);
                        setSmithsonianAccordionData(smithsonianData);
                      }
                    }}
                  />
                </div>
                <div className="card-detail-list-icon">
                  <SearchInputMdSvg primaryColor="#515151" />
                </div>
              </div>

              {smithsonianAccordionData?.length !== 0 &&
                smithsonianAccordionData?.map((data, index) => (
                  <div
                    className="list-item-keys"
                    key={index}
                    value={index}
                    onClick={() => {
                      if (activeSmithsonianAccordion.includes(data)) {
                        setActiveSmithsonianAccordion(activeSmithsonianAccordion.filter((_data) => _data !== data));
                      } else {
                        setActiveSmithsonianAccordion([...activeSmithsonianAccordion, data]);
                      }
                    }}
                  >
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
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      )}
    </div>
  );
};

export default SmithsonianAccordion;
