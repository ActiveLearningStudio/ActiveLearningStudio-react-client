/* eslint-disable */

import React, { useState, useEffect } from "react";

import { Accordion, Card, Dropdown, Alert } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import Player from "./player";
import searchIcon from "../../assets/images/svg/search.svg";
import Elipsis from "../../assets/images/svg/elipsis.svg";

import PreviewSm from "../../assets/images/svg/PreviewSmSvg";
import PlusSm from "../../assets/images/svg/PlusSmSvg";
import Arrow from "../../assets/images/svg/arrow.svg";

// import './style.scss';
// import './project.scss';

const tokenDummy =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwbGF0Zm9ybVVybCI6Imh0dHBzOi8vY2FudmFzLmluc3RydWN0dXJlLmNvbSIsImNsaWVudElkIjoiMjA4ODMwMDAwMDAwMDAwMTM4IiwiZGVwbG95bWVudElkIjoiMTgwOmE1MTJjY2Y0ZGE4NTFlMzA1MjZmYTJlZWEyZjEyN2I1YjA0MmQ1N2QiLCJwbGF0Zm9ybUNvZGUiOiJsdGlhSFIwY0hNNkx5OWpZVzUyWVhNdWFXNXpkSEoxWTNSMWNtVXVZMjl0TWpBNE9ETXdNREF3TURBd01EQXdNVE00TVRnd09tRTFNVEpqWTJZMFpHRTROVEZsTXpBMU1qWm1ZVEpsWldFeVpqRXlOMkkxWWpBME1tUTFOMlElM0QiLCJjb250ZXh0SWQiOiJodHRwcyUzQSUyRiUyRmNhbnZhcy5pbnN0cnVjdHVyZS5jb20yMDg4MzAwMDAwMDAwMDAxMzgxODAlM0FhNTEyY2NmNGRhODUxZTMwNTI2ZmEyZWVhMmYxMjdiNWIwNDJkNTdkYTE2NGM4YTMzYzljZmNjODQxM2I4YjA5ZWQ5N2E3MjU0MDhiMDI2OV9ORiIsInVzZXIiOiJjZmZkZTQ2ZC04NjlmLTQzMmEtODVkNC1jNmFmZDVhZmE5MmIiLCJzIjoiZWRjOWUwNjY1NDMxMTdiMzU0NzhhN2JhMWYwYmI2ZmFkYjE4NTgzNGJkZjhmNDJlY2QiLCJpYXQiOjE3MDQ4ODc1NjZ9.AYhjI5axoZlWnQJkhG2gXJyjgF5Cg2NjxhAwtZL0ZAM";

function findNodeByName(root, name) {
  const queue = [root];
  while (queue.length > 0) {
    const current = queue.shift();

    if (current.name === name) {
      return current;
    }

    if (current.children) {
      for (let i = 0; i < current.children.length; i++) {
        queue.push(current.children[i]);
      }
    }
  }

  return null;
}

const ListingModal = () => {
  const [allData, setAlldata] = useState();
  const [startSearching, setStartSearching] = useState("");
  const [allDataRaw, setAllDataRaw] = useState(null);
  const [allCollection, setallCollection] = useState(null);
  const [loading, setloading] = useState(false);
  const [showdetail, setShowdetail] = useState("");
  const [selectedC2e, setSelectedC2e] = useState();
  const [apiError, setApiError] = useState();

  const searchCollection = () => {
    setloading(true);
    setAllDataRaw();
    const url = new URL(
      process.env.REACT_APP_API_DOMAIN_URL +
        process.env.REACT_APP_RESORCES_URL
    );
    // const params = {
    //   page: 1,
    //   limit: 10,
    //   query: startSearching || "",
    // };
    url.searchParams.append("page", 1);
    url.searchParams.append("limit", 10);
    url.searchParams.append("query", startSearching || "");

    // Making a GET fetch request
    fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${tokenDummy}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) =>
        // console.log(response);
        // if (!response.ok) {
        //   throw new Error("Network response was not ok");
        // }

        response.json()
      )
      .then((data) => {
        if (data.error) {
          throw data;
        }
        if (startSearching) {
          // getFinalTree();
          // setallCollection(sortSearch(data?.data));
        }
        setAllDataRaw(data?.data);
        getFinalTree(data?.data);
        setloading(false);
      })
      .catch(async (error) => {
        setApiError(error);
      });
  };

  const handleClose = () => setShowdetail(false);

  useEffect(() => {
    if (!startSearching) {
      searchCollection();
    }
  }, [startSearching]);

  const getFinalTree = (data) => {
    const tree = {
      name: "ere",
      description: data?.description,
      metaEmail: data?.metadata?.email,
      children: [],
    };

    for (const row of data) {
      let parent = null;

      for (const crumb of row.breadcrumb.itemListElement) {
        let newNode = null;
        let result;
        if (crumb.position === 0) {
          result =
            row.breadcrumb.itemListElement[crumb.position]?.item
              ?.name;
        } else if (crumb.position === 1) {
          result =
            row.breadcrumb.itemListElement[crumb.position]?.item
              ?.name +
            row.breadcrumb.itemListElement[crumb.position - 1]?.item
              ?.name;
        } else if (crumb.position === 2) {
          result =
            row.breadcrumb.itemListElement[crumb.position]?.item
              ?.name +
            row.breadcrumb.itemListElement[crumb.position - 1]?.item
              ?.name +
            row.breadcrumb.itemListElement[crumb.position - 2]?.item
              ?.name;
        } else if (crumb.position === 3) {
          result =
            row.breadcrumb.itemListElement[crumb.position]?.item
              ?.name +
            row.breadcrumb.itemListElement[crumb.position - 1]?.item
              ?.name +
            row.breadcrumb.itemListElement[crumb.position - 2]?.item
              ?.name +
            row.breadcrumb.itemListElement[crumb.position - 3]?.item
              ?.name;
        } else if (crumb.position === 4) {
          result =
            row.breadcrumb.itemListElement[crumb.position]?.item
              ?.name +
            row.breadcrumb.itemListElement[crumb.position - 1]?.item
              ?.name +
            row.breadcrumb.itemListElement[crumb.position - 2]?.item
              ?.name +
            row.breadcrumb.itemListElement[crumb.position - 3]?.item
              ?.name +
            row.breadcrumb.itemListElement[crumb.position - 4]?.item
              ?.name;
        }
        const existingNode = findNodeByName(tree, result);

        if (existingNode) {
          newNode = existingNode;
        } else {
          newNode = {
            name: result,
            originalName: crumb.item.name,
            children: [],
          };
          if (parent) {
            // If parent exists, push  there
            parent.children.push(newNode);
          } else {
            tree.children.push(newNode);
          }
        }
        parent = newNode;
      }
      const leaf = {
        name: row.title,
        description: row?.description,
        children: [],
      };

      parent.children.push(leaf);
    }
    setAlldata(sortJsonByName(tree));
  };

  return (
    <>
      <div className="modal-header-custom">
        Link Resource from External Tool
      </div>
      <div className="content-wrapper content-wrapper-project small-grid">
        <div
          className="my-project-cards-top-search-filter search-project-filter "
          style={{ margin: "0 0 16px" }}
        >
          <div
            className="search-project-box"
            style={{
              width: startSearching ? "100%" : "100%",
              justifyContent: startSearching
                ? "space-between"
                : "flex-start",
            }}
          >
            <div
              className="search-bar"
              style={{ width: startSearching ? "100%" : "100%" }}
            >
              <input
                style={{
                  width: startSearching ? "100%" : "100%",
                }}
                className="input-search"
                type="search"
                placeholder="Search C2E Titles"
                value={startSearching}
                onChange={(e) => {
                  setStartSearching(e.target.value);
                }}
                onKeyUp={(e) => {
                  if (startSearching?.length && e.key === "Enter") {
                    setallCollection(null);
                    searchCollection();
                    setApiError("");
                  }
                }}
              />
              <div className="inner-filter-box">
                <div
                  onClick={() => {
                    if (startSearching?.length) {
                      setallCollection(null);
                      searchCollection();
                      setApiError("");
                    }
                  }}
                >
                  <img src={searchIcon} alt="search" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          {allDataRaw ? (
            allDataRaw?.length ? (
              allData?.children?.map((coll) => (
                <F
                  data={coll}
                  allDataRaw={allDataRaw}
                  token={tokenDummy}
                  setShowdetail={setShowdetail}
                  showdetail={showdetail}
                  setSelectedC2e={setSelectedC2e}
                />
              ))
            ) : (
              <Alert variant="warning">No Result found!</Alert>
            )
          ) : apiError ? (
            <>
              <Alert variant="warning">
                <div
                  className=""
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <div>
                    <div>
                      There is an issue with your C2E Player
                      Configuration. Please contact your LMS
                      Administrator and provide the following
                      information:
                    </div>
                    <br />
                    {apiError?.details?.message && (
                      <strong>
                        {apiError?.details?.message?.toUpperCase()}
                      </strong>
                    )}
                    {apiError?.details?.description && (
                      <div>{apiError?.details?.description}</div>
                    )}
                  </div>
                </div>
              </Alert>
            </>
          ) : (
            <Alert variant="primary">Fetching Results ...</Alert>
          )}
        </div>
        <Modal
          show={showdetail}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
          size="xl"
        >
          <Modal.Header />
          <Modal.Body>
            <Player previewId={selectedC2e} />
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
};
export default ListingModal;

const F = ({
  data,
  allDataRaw,
  token,
  setShowdetail,
  showdetail,
  setSelectedC2e,
}) => {
  const meta = allDataRaw?.filter(
    (row) =>
      row.title === data.name && row.description === data.description
  )?.[0];
  const [activeArrow, setactiveArrow] = useState([]);
  return (
    <div className="tab-content book-accordion">
      <Accordion className="book-acc">
        <Card className="book-acc-card">
          <Card.Header className="d-flex align-items-start search-project-card-head acc-card-header">
            <Accordion.Toggle
              variant="link"
              eventKey={data?.name}
              className=" w-full accordion-toggle-header "
              onClick={() => {
                if (activeArrow.includes(data.name)) {
                  setactiveArrow(
                    activeArrow.filter((g) => g !== data?.name)
                  );
                } else {
                  setactiveArrow([...activeArrow, data.name]);
                }
              }}
            >
              <div className="results_filter main_accordion_filter">
                <div className="box">
                  {/* <img className="imgbox" src={CardImg} alt="img" /> */}
                  <div className="contentbox">
                    <div className="inner_content">
                      <h3
                        onClick={() => {
                          if (meta?.id) {
                            setSelectedC2e(meta.id);
                            setShowdetail(true);
                          }
                        }}
                        className="content_heading view_content_heading"
                      >
                        {data?.originalName || data?.name}
                      </h3>
                      {meta ? (
                        <>
                          <div className="content-pdf-box">
                            <div className="flexer chapter_flexer">
                              <div className="breadcrum-design">
                                {meta.breadcrumb?.itemListElement?.map(
                                  (data, counter) => {
                                    if (counter === 0) return;
                                    return (
                                      <div>
                                        {data?.item?.name}
                                        {counter <
                                          meta.breadcrumb
                                            ?.itemListElement.length -
                                            1 && <span>&gt;</span>}
                                      </div>
                                    );
                                  }
                                )}
                              </div>
                              {/* <p className="cotent-text">
                                <strong className="author_para">
                                  author:&nbsp;
                                </strong>
                                {meta?.author?.name}
                              </p>
                              <p className="cotent-text">
                                <strong className="license_para">
                                  license Email:&nbsp;
                                </strong>
                                {meta?.licenseemail}
                              </p> */}
                            </div>

                            <div className="contentbox dropdown_contentbox_btns">
                              <Dropdown className="playlist-dropdown check show dropdown">
                                <Dropdown.Toggle>
                                  <img src={Elipsis} alt="elipsis" />
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                  <>
                                    <div className="dropDown-item-name-icon dropDown_btn">
                                      <div
                                        onClick={() => {
                                          setSelectedC2e(meta.id);
                                          setShowdetail(true);
                                        }}
                                      >
                                        <PreviewSm />
                                        <span>Preview</span>
                                      </div>
                                    </div>
                                    <button
                                      className="dropDown-item-name-icon dropDown_btn add_btn"
                                      onClick={async () => {
                                        const getLtik = () => {
                                          const searchParams = new URLSearchParams(
                                            window.location.search
                                          );
                                          const ltik = searchParams.get(
                                            "ltik"
                                          );

                                          return ltik;
                                        };

                                        const requestOptions = {
                                          method: "POST",
                                          credentials: "include",
                                          headers: {
                                            "Content-Type":
                                              "application/json",
                                            Authorization: `Bearer ${getLtik()}`,
                                          },
                                          body: JSON.stringify({
                                            id: meta?.id,
                                            title: meta?.title,
                                          }),
                                        };
                                        const url1 = new URL(
                                          process.env
                                            .REACT_APP_API_DOMAIN_URL +
                                            process.env
                                              .REACT_APP_DEEPLINK_URL
                                        );

                                        fetch(url1, requestOptions)
                                          .then((response) =>
                                            response.text()
                                          )
                                          .then((form) => {
                                            document
                                              .querySelector("body")
                                              .insertAdjacentHTML(
                                                "beforeend",
                                                form
                                              );

                                            setTimeout(() => {
                                              document
                                                .getElementById(
                                                  "ltijs_submit"
                                                )
                                                ?.submit();
                                            }, [1500]);
                                          })
                                          .catch((error) =>
                                            console.error(
                                              "Error:",
                                              error
                                            )
                                          );
                                      }}
                                    >
                                      <PlusSm />
                                      <span>Add</span>
                                    </button>
                                  </>
                                </Dropdown.Menu>
                              </Dropdown>
                            </div>
                          </div>
                          <p
                            className="cotent-text text-start"
                            style={{ textAlign: "left" }}
                          >
                            {meta?.description}
                          </p>
                        </>
                      ) : (
                        <div className="content-pdf-box">
                          <p className="cotent-text">
                            <strong>Collection count: </strong>
                            {data?.children?.length}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                {!!data?.children?.length && (
                  <div className="arrow">
                    {activeArrow.includes(data.name) ? (
                      <img
                        className="up_arrow"
                        src={Arrow}
                        alt="arrow"
                      />
                    ) : (
                      <img src={Arrow} alt="arrow" />
                    )}
                  </div>
                )}
              </div>
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey={data?.name}>
            <Card.Body className="playlist-card inner-card-body acc-card-body">
              {data?.children?.map((h) => (
                <div>
                  <F
                    data={h}
                    allDataRaw={allDataRaw}
                    token={token}
                    setShowdetail={setShowdetail}
                    showdetail={showdetail}
                    setSelectedC2e={setSelectedC2e}
                  />
                </div>
              ))}
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    </div>
  );
};

function sortJsonByName(obj) {
  if (Array.isArray(obj)) {
    return obj
      .map(sortJsonByName)
      .sort((a, b) => a.name.localeCompare(b.name));
  }
  if (typeof obj === "object" && obj !== null) {
    const sortedObj = {};
    Object.keys(obj)
      .sort()
      .forEach((key) => {
        sortedObj[key] = sortJsonByName(obj[key]);
      });
    return sortedObj;
  }

  return obj;
}
