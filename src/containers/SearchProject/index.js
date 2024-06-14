/* eslint-disable react/prop-types */
/* eslint-disable */
import React, { useState, useEffect } from "react";
import { Accordion, Card, Dropdown } from "react-bootstrap";
import { getGlobalColor } from "containers/App/DynamicBrandingApply";
import Alert from "react-bootstrap/Alert";

import Filter from "assets/images/svg/filterview.svg";
import ListView from "assets/images/svg/listview.svg";
import GridView from "assets/images/svg/gridview.svg";
import Book from "assets/images/svg/book-img.png";
import ReadBook from "assets/images/readbook.png";
import SearchBook from "assets/images/svg/searchdropdown-logo.svg";
import RightArow from "assets/images/svg/right-arrow.svg";

import PreviewSmSvg from "iconLibrary/dropDown/PreviewSmSvg";
import PlusSmSvg from "iconLibrary/mainContainer/PlusSmSvg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import SearchInputMdSvg from "iconLibrary/mainContainer/SearchInputMdSvg";

import "./style.scss";
import "../Projects/style.scss";

const searchCollection = [
  {
    img: Book,
    collectionname: "Java for Dummies",
    collection: "Collection",
    name: " Shiaki A. Minami, Shruthi S. Garimella, Priya S. Shah",
    category: " Biotechnology Journal",
    publishdate: "2 November 2022",
    description: "Description",
    preview: "Preview",
  },
  {
    img: Book,
    collectionname:
      "Does support affect the governance performance of the farm irrigation system?",
    collection: "Collection",
    name: " Shiaki A. Minami, Shruthi S. Garimella, Priya S. Shah",
    category: " Biotechnology Journal",
    publishdate: "10 December 2021",
    description: "Description",
    preview: "Preview",
  },
  {
    img: Book,
    collectionname:
      "Does organizational support affect the governance performance of the farm irrigation system? Evidence from the yellow River basin in China",
    collection: "Collection",
    name: " Shiaki A. Minami, Shruthi S. Garimella, Priya S. Shah",
    category: " Biotechnology Journal",
    publishdate: "25 October 2023",
    description: "Description",
    preview: "Preview",
  },
];

const searchData = [
  {
    img: SearchBook,
    heading:
      "Does organizational support affect the governance performance more",
    bookname: "Book",
    detail: "Yangqi Fu, Yuchun Zhu",
    publishname: "Vadose Zone Journal",
    publishdate: "25 October 2023",
    description: "Book Description",
    preview: "Preview",
  },
  {
    img: SearchBook,
    heading:
      "Does Estimation of soil moisture using environmental covariates",
    bookname: "Book",
    detail: "Yangqi Fu, Yuchun Zhu",
    publishname: "Vadose Zone Journal",
    publishdate: "25 October 2023",
    description: "Book Description",
    preview: "Preview",
  },
  {
    img: SearchBook,
    heading:
      "Does support affect the governance performance of the farm irrigation system?",
    bookname: "Unit",
    detail: "Yangqi Fu, Yuchun Zhu",
    publishname: "Vadose Zone Journal",
    publishdate: "25 October 2023",
    description: "Book Description",
    preview: "Preview",
  },
  {
    img: SearchBook,
    heading:
      "Does support affect the governance performance of the farm irrigation system?",
    bookname: "Unit 2",
    detail: "Yangqi Fu, Yuchun Zhu",
    publishname: "Vadose Zone Journal",
    publishdate: "25 October 2023",
    description: "Book Description",
    preview: "Preview",
  },
  {
    img: SearchBook,
    heading: "Developing Software",
    bookname: "Chapter",
    detail: "Yangqi Fu, Yuchun Zhu",
    publishname: "Vadose Zone Journal",
    publishdate: "25 October 2023",
    description: "Book Description",
    preview: "Preview",
  },
  {
    img: SearchBook,
    heading: "Developing Hardware",
    bookname: "Chapter 2",
    detail: "Yangqi Fu, Yuchun Zhu",
    publishname: "Vadose Zone Journal",
    publishdate: "25 October 2023",
    description: "Book Description",
    preview: "Preview",
  },
];

const Index = () => {
  const primaryColor = getGlobalColor("--main-primary-color");

  // search
  const [startSearching, setStartSearching] = useState("");
  console.log("setStartSearching", startSearching);

  // search data
  const [searchContent, setSearchContent] = useState([]);
  // filtered data
  const filteredData = searchCollection.filter((item) =>
    item.collectionname
      .toLowerCase()
      .includes(startSearching.toLowerCase()),
  );
  useEffect(() => {
    if (searchContent) {
      setSearchContent(searchCollection);
    }
  }, []);
  return (
    <div className="content-wrapper content-wrapper-project small-grid">
      <h2 className="resource_heading">
        {/* {filteredData.length > 0 && startSearching
          ? `Search results for ${startSearching}` */}
        {/* : */}
        Link Resource from External Tool
        {/* } */}
      </h2>
      <div
        className="my-project-cards-top-search-filter search-project-filter"
        style={{ margin: !!startSearching ? "0" : "0 0 16px" }}
      >
        <div
          className="search-project-box"
          style={{
            width: !!startSearching ? "100%" : "auto",
            justifyContent: !!startSearching
              ? "space-between"
              : "flex-start",
          }}
        >
          <div
            className="search-bar"
            style={{ width: !!startSearching ? "100%" : "auto" }}
          >
            <input
              style={{ width: !!startSearching ? "100%" : "auto" }}
              type="text"
              placeholder="Search project"
              value={startSearching}
              onChange={(e) => {
                setStartSearching(e.target.value);
              }}
            />
            <SearchInputMdSvg
              primaryColor={primaryColor}
              style={{ cursor: "pointer" }}
            />
          </div>
          <div className="inner-filter-box">
            <img src={Filter} alt="filter" />
            <p className="filter-text">Filter</p>
          </div>
        </div>
        {!startSearching && (
          <div className="list-grid-box">
            <img src={ListView} alt="filter" />
            <img src={GridView} alt="filter" />
          </div>
        )}
      </div>
      {/* Acoordion */}
      {/* {!startSearching ? ( */}
      <div
      // style={{
      //   width: "100%",
      //   mixBlendMode: !!startSearching ? "multiply" : "unset",
      //   background: !!startSearching
      //     ? "rgba(8, 72, 146, 0.8)"
      //     : "none",
      //   padding: !!startSearching ? "0 24px 18px" : "0",
      // }}
      >
        <div
          className="tab-content"
          // style={{
          //   minHeight:
          //     filteredData.length > 0 && startSearching
          //       ? "492px"
          //       : "auto",
          // }}
        >
          {filteredData.length ? (
            <Accordion>
              {filteredData.map((item, i) => (
                <Card key={i}>
                  {/* header card 1 */}
                  <Card.Header>
                    <Accordion.Toggle
                      className="d-flex align-items-center search-project-card-head"
                      variant="link"
                      eventKey={i + 1}
                    >
                      <div className="results_filter">
                        <div className="box">
                          <img
                            className="imgbox"
                            src={item.img}
                            alt="img"
                          />
                          <div className="contentbox">
                            <div className="inner_content">
                              <h3
                                className={
                                  i === 1
                                    ? "content_heading view_content_heading"
                                    : "content_heading"
                                }
                              >
                                {item.collectionname}
                              </h3>
                              <p className="cotent-text">
                                {item.collection}
                              </p>
                              <p className="cotent-text">
                                {item.name}
                              </p>
                              <p className="content-link">
                                {item.category}
                                &nbsp;&nbsp;|&nbsp;&nbsp;
                                <span className="">
                                  First Published: {item.publishdate}
                                </span>
                              </p>
                              <div className="content-pdf-box">
                                <p className="content-pdf">
                                  {item.description}
                                </p>
                                <p className="content-slash"></p>
                                <p className="content-pdf">
                                  {item.preview}
                                </p>
                              </div>
                            </div>
                          </div>
                          {filteredData.length > 0 &&
                          startSearching ? (
                            <div className="contentbox dropdown-contentbox">
                              <Dropdown className="playlist-dropdown check show dropdown">
                                <Dropdown.Toggle>
                                  <FontAwesomeIcon icon="ellipsis-v" />
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                  <>
                                    <Dropdown.Item>
                                      {/* <a href={``} target="_blank"> */}
                                      <div className="dropDown-item-name-icon">
                                        <PreviewSmSvg
                                          primaryColor={primaryColor}
                                        />
                                        <span>Preview</span>
                                      </div>
                                      {/* </a> */}
                                    </Dropdown.Item>
                                    <Dropdown.Item>
                                      <div className="dropDown-item-name-icon">
                                        <PlusSmSvg
                                          primaryColor={primaryColor}
                                        />
                                        <span>Add to LMS</span>
                                      </div>
                                    </Dropdown.Item>
                                  </>
                                </Dropdown.Menu>
                              </Dropdown>
                            </div>
                          ) : (
                            <div className="btn-box">
                              <div className="view-unit-box">
                                <button className="unit-btn">
                                  View Books
                                </button>
                                <img src={RightArow} alt="arrow" />
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </Accordion.Toggle>
                  </Card.Header>
                  {/* body 1 */}
                  <Card>
                    <Accordion.Collapse eventKey={i + 1}>
                      <Card.Body className="playlist-card">
                        <Accordion>
                          <Card>
                            {/* inner book 1*/}
                            <Card.Header>
                              <Accordion.Toggle
                                className="d-flex align-items-center search-project-card-head"
                                variant="link"
                                eventKey="2"
                              >
                                <ul className="search-playllist-content">
                                  <li className={"active-li"}>
                                    <div className="search-playlist-title">
                                      <img
                                        src={ReadBook}
                                        alt="image"
                                      />
                                      <h3 className="playlist-title">
                                        Book 1: All About Java
                                      </h3>
                                    </div>
                                    <div className="view-btn-box">
                                      <div className="view-unit-box">
                                        <button className="unit-btn">
                                          View Units
                                        </button>
                                        <img
                                          src={RightArow}
                                          alt="arrow"
                                        />
                                      </div>
                                    </div>
                                    <div className="contentbox">
                                      <Dropdown className="playlist-dropdown check show dropdown">
                                        <Dropdown.Toggle>
                                          <FontAwesomeIcon icon="ellipsis-v" />
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                          <>
                                            <Dropdown.Item>
                                              {/* <a href={``} target="_blank"> */}
                                              <div className="dropDown-item-name-icon">
                                                <PreviewSmSvg
                                                  primaryColor={
                                                    primaryColor
                                                  }
                                                />
                                                <span>Preview</span>
                                              </div>
                                              {/* </a> */}
                                            </Dropdown.Item>
                                            <Dropdown.Item>
                                              <div className="dropDown-item-name-icon">
                                                <PlusSmSvg
                                                  primaryColor={
                                                    primaryColor
                                                  }
                                                />
                                                <span>
                                                  Add to LMS
                                                </span>
                                              </div>
                                            </Dropdown.Item>
                                          </>
                                        </Dropdown.Menu>
                                      </Dropdown>
                                    </div>
                                  </li>
                                </ul>
                              </Accordion.Toggle>
                            </Card.Header>
                            {/* inner book card body */}
                            <Card>
                              <Accordion.Collapse eventKey="2">
                                <Card.Body className="playlist-card inner-card-body">
                                  <Accordion>
                                    <Card>
                                      {/* inner unit 1 */}
                                      <Card.Header>
                                        <Accordion.Toggle
                                          className="d-flex align-items-center search-project-card-head"
                                          variant="link"
                                          eventKey="3"
                                        >
                                          <ul className="search-playllist-content">
                                            <li
                                              className={"active-li"}
                                            >
                                              <div className="search-playlist-title">
                                                <img
                                                  src={ReadBook}
                                                  alt="image"
                                                />
                                                <h3 className="playlist-title playlist-inner-title">
                                                  Unit 1: What You can
                                                  do With java
                                                </h3>
                                              </div>
                                              <div className="view-btn-box ch-box">
                                                <div className="view-unit-box">
                                                  <button className="unit-btn">
                                                    View Chapters
                                                  </button>
                                                  <img
                                                    src={RightArow}
                                                    alt="arrow"
                                                  />
                                                </div>
                                              </div>
                                              <div className="contentbox">
                                                <Dropdown className="playlist-dropdown check show dropdown">
                                                  <Dropdown.Toggle>
                                                    <FontAwesomeIcon icon="ellipsis-v" />
                                                  </Dropdown.Toggle>
                                                  <Dropdown.Menu>
                                                    <>
                                                      <Dropdown.Item>
                                                        {/* <a href={``} target="_blank"> */}
                                                        <div className="dropDown-item-name-icon">
                                                          <PreviewSmSvg
                                                            primaryColor={
                                                              primaryColor
                                                            }
                                                          />
                                                          <span>
                                                            Preview
                                                          </span>
                                                        </div>
                                                        {/* </a> */}
                                                      </Dropdown.Item>
                                                      <Dropdown.Item>
                                                        <div className="dropDown-item-name-icon">
                                                          <PlusSmSvg
                                                            primaryColor={
                                                              primaryColor
                                                            }
                                                          />
                                                          <span>
                                                            Add to LMS
                                                          </span>
                                                        </div>
                                                      </Dropdown.Item>
                                                    </>
                                                  </Dropdown.Menu>
                                                </Dropdown>
                                              </div>
                                            </li>
                                          </ul>
                                        </Accordion.Toggle>
                                      </Card.Header>
                                      {/* inner chapter 1 */}
                                      <Accordion.Collapse eventKey="3">
                                        <Card.Body className="playlist-card inner-card-body">
                                          <Accordion>
                                            <Card>
                                              <Card.Header>
                                                <Accordion.Toggle
                                                  className="d-flex align-items-center search-project-card-head"
                                                  variant="link"
                                                >
                                                  <ul className="search-playllist-content">
                                                    <li
                                                      className={
                                                        "active-li"
                                                      }
                                                    >
                                                      <div className="search-playlist-title">
                                                        <img
                                                          src={
                                                            ReadBook
                                                          }
                                                          alt="image"
                                                        />
                                                        <h3 className="playlist-title playlist-inner-title">
                                                          Chapter 1:
                                                          What is
                                                          Java?
                                                        </h3>
                                                      </div>
                                                      <div className="contentbox">
                                                        <Dropdown className="playlist-dropdown check show dropdown">
                                                          <Dropdown.Toggle>
                                                            <FontAwesomeIcon icon="ellipsis-v" />
                                                          </Dropdown.Toggle>
                                                          <Dropdown.Menu>
                                                            <>
                                                              <Dropdown.Item>
                                                                {/* <a href={``} target="_blank"> */}
                                                                <div className="dropDown-item-name-icon">
                                                                  <PreviewSmSvg
                                                                    primaryColor={
                                                                      primaryColor
                                                                    }
                                                                  />
                                                                  <span>
                                                                    Preview
                                                                  </span>
                                                                </div>
                                                                {/* </a> */}
                                                              </Dropdown.Item>
                                                              <Dropdown.Item>
                                                                <div className="dropDown-item-name-icon">
                                                                  <PlusSmSvg
                                                                    primaryColor={
                                                                      primaryColor
                                                                    }
                                                                  />
                                                                  <span>
                                                                    Add
                                                                    to
                                                                    LMS
                                                                  </span>
                                                                </div>
                                                              </Dropdown.Item>
                                                            </>
                                                          </Dropdown.Menu>
                                                        </Dropdown>
                                                      </div>
                                                    </li>
                                                  </ul>
                                                </Accordion.Toggle>
                                              </Card.Header>
                                            </Card>
                                          </Accordion>
                                        </Card.Body>
                                      </Accordion.Collapse>
                                    </Card>
                                  </Accordion>
                                </Card.Body>
                              </Accordion.Collapse>
                            </Card>
                            {/* inner book card body */}
                            <Card>
                              <Accordion.Collapse eventKey="2">
                                <Card.Body className="playlist-card inner-card-body">
                                  <Accordion>
                                    <Card>
                                      {/* inner unit 2 */}
                                      <Card.Header>
                                        <Accordion.Toggle
                                          className="d-flex align-items-center search-project-card-head"
                                          variant="link"
                                          eventKey="3"
                                        >
                                          <ul className="search-playllist-content">
                                            <li
                                              className={"active-li"}
                                            >
                                              <div className="search-playlist-title">
                                                <img
                                                  src={ReadBook}
                                                  alt="image"
                                                />
                                                <h3 className="playlist-title playlist-inner-title">
                                                  Unit 2: What You can
                                                  do With java
                                                </h3>
                                                <div className="view-btn-box ch-box">
                                                  <div className="view-unit-box">
                                                    <button className="unit-btn">
                                                      View Chapters
                                                    </button>
                                                    <img
                                                      src={RightArow}
                                                      alt="arrow"
                                                    />
                                                  </div>
                                                </div>
                                              </div>
                                              <div className="contentbox">
                                                <Dropdown className="playlist-dropdown check show dropdown">
                                                  <Dropdown.Toggle>
                                                    <FontAwesomeIcon icon="ellipsis-v" />
                                                  </Dropdown.Toggle>
                                                  <Dropdown.Menu>
                                                    <>
                                                      <Dropdown.Item>
                                                        {/* <a href={``} target="_blank"> */}
                                                        <div className="dropDown-item-name-icon">
                                                          <PreviewSmSvg
                                                            primaryColor={
                                                              primaryColor
                                                            }
                                                          />
                                                          <span>
                                                            Preview
                                                          </span>
                                                        </div>
                                                        {/* </a> */}
                                                      </Dropdown.Item>
                                                      <Dropdown.Item>
                                                        <div className="dropDown-item-name-icon">
                                                          <PlusSmSvg
                                                            primaryColor={
                                                              primaryColor
                                                            }
                                                          />
                                                          <span>
                                                            Add to LMS
                                                          </span>
                                                        </div>
                                                      </Dropdown.Item>
                                                    </>
                                                  </Dropdown.Menu>
                                                </Dropdown>
                                              </div>
                                            </li>
                                          </ul>
                                        </Accordion.Toggle>
                                      </Card.Header>
                                      {/* inner chapter 1*/}
                                      <Accordion.Collapse eventKey="3">
                                        <Card.Body className="playlist-card inner-card-body">
                                          <Accordion>
                                            <Card>
                                              <Card.Header>
                                                <Accordion.Toggle
                                                  className="d-flex align-items-center search-project-card-head"
                                                  variant="link"
                                                >
                                                  <ul className="search-playllist-content">
                                                    <li
                                                      className={
                                                        "active-li"
                                                      }
                                                    >
                                                      <div className="search-playlist-title">
                                                        <img
                                                          src={
                                                            ReadBook
                                                          }
                                                          alt="image"
                                                        />
                                                        <h3 className="playlist-title playlist-inner-title">
                                                          Chapter 1:
                                                          What is
                                                          Java?
                                                        </h3>
                                                      </div>
                                                      <div className="contentbox">
                                                        <Dropdown className="playlist-dropdown check show dropdown">
                                                          <Dropdown.Toggle>
                                                            <FontAwesomeIcon icon="ellipsis-v" />
                                                          </Dropdown.Toggle>
                                                          <Dropdown.Menu>
                                                            <>
                                                              <Dropdown.Item>
                                                                {/* <a href={``} target="_blank"> */}
                                                                <div className="dropDown-item-name-icon">
                                                                  <PreviewSmSvg
                                                                    primaryColor={
                                                                      primaryColor
                                                                    }
                                                                  />
                                                                  <span>
                                                                    Preview
                                                                  </span>
                                                                </div>
                                                                {/* </a> */}
                                                              </Dropdown.Item>
                                                              <Dropdown.Item>
                                                                <div className="dropDown-item-name-icon">
                                                                  <PlusSmSvg
                                                                    primaryColor={
                                                                      primaryColor
                                                                    }
                                                                  />
                                                                  <span>
                                                                    Add
                                                                    to
                                                                    LMS
                                                                  </span>
                                                                </div>
                                                              </Dropdown.Item>
                                                            </>
                                                          </Dropdown.Menu>
                                                        </Dropdown>
                                                      </div>
                                                    </li>
                                                  </ul>
                                                </Accordion.Toggle>
                                              </Card.Header>
                                            </Card>
                                          </Accordion>
                                        </Card.Body>
                                      </Accordion.Collapse>
                                      {/* chapter 2 */}
                                      <Accordion.Collapse eventKey="3">
                                        <Card.Body className="playlist-card inner-card-body">
                                          <Accordion>
                                            <Card>
                                              <Card.Header>
                                                <Accordion.Toggle
                                                  className="d-flex align-items-center search-project-card-head"
                                                  variant="link"
                                                >
                                                  <ul className="search-playllist-content">
                                                    <li
                                                      className={
                                                        "active-li"
                                                      }
                                                    >
                                                      <div className="search-playlist-title">
                                                        <img
                                                          src={
                                                            ReadBook
                                                          }
                                                          alt="image"
                                                        />
                                                        <h3 className="playlist-title playlist-inner-title">
                                                          Chapter 2:
                                                          What is
                                                          Java?
                                                        </h3>
                                                      </div>
                                                      <div className="contentbox">
                                                        <Dropdown className="playlist-dropdown check show dropdown">
                                                          <Dropdown.Toggle>
                                                            <FontAwesomeIcon icon="ellipsis-v" />
                                                          </Dropdown.Toggle>
                                                          <Dropdown.Menu>
                                                            <>
                                                              <Dropdown.Item>
                                                                {/* <a href={``} target="_blank"> */}
                                                                <div className="dropDown-item-name-icon">
                                                                  <PreviewSmSvg
                                                                    primaryColor={
                                                                      primaryColor
                                                                    }
                                                                  />
                                                                  <span>
                                                                    Preview
                                                                  </span>
                                                                </div>
                                                                {/* </a> */}
                                                              </Dropdown.Item>
                                                              <Dropdown.Item>
                                                                <div className="dropDown-item-name-icon">
                                                                  <PlusSmSvg
                                                                    primaryColor={
                                                                      primaryColor
                                                                    }
                                                                  />
                                                                  <span>
                                                                    Add
                                                                    to
                                                                    LMS
                                                                  </span>
                                                                </div>
                                                              </Dropdown.Item>
                                                            </>
                                                          </Dropdown.Menu>
                                                        </Dropdown>
                                                      </div>
                                                    </li>
                                                  </ul>
                                                </Accordion.Toggle>
                                              </Card.Header>
                                            </Card>
                                          </Accordion>
                                        </Card.Body>
                                      </Accordion.Collapse>
                                    </Card>
                                  </Accordion>
                                </Card.Body>
                              </Accordion.Collapse>
                            </Card>
                          </Card>
                        </Accordion>
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>
                  <Card>
                    <Accordion.Collapse eventKey={i + 1}>
                      <Card.Body className="playlist-card">
                        <Accordion>
                          <Card>
                            {/* inner book 2*/}
                            <Card.Header>
                              <Accordion.Toggle
                                className="d-flex align-items-center search-project-card-head"
                                variant="link"
                                eventKey="2"
                              >
                                <ul className="search-playllist-content">
                                  <li className={"active-li"}>
                                    <div className="search-playlist-title">
                                      <img
                                        src={ReadBook}
                                        alt="image"
                                      />
                                      <h3 className="playlist-title">
                                        Book 2: All About Java
                                      </h3>
                                      <div className="view-btn-box">
                                        <div className="view-unit-box">
                                          <button className="unit-btn">
                                            View Units
                                          </button>
                                          <img
                                            src={RightArow}
                                            alt="arrow"
                                          />
                                        </div>
                                      </div>
                                    </div>
                                    <div className="contentbox">
                                      <Dropdown className="playlist-dropdown check show dropdown">
                                        <Dropdown.Toggle>
                                          <FontAwesomeIcon icon="ellipsis-v" />
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                          <>
                                            <Dropdown.Item>
                                              {/* <a href={``} target="_blank"> */}
                                              <div className="dropDown-item-name-icon">
                                                <PreviewSmSvg
                                                  primaryColor={
                                                    primaryColor
                                                  }
                                                />
                                                <span>Preview</span>
                                              </div>
                                              {/* </a> */}
                                            </Dropdown.Item>
                                            <Dropdown.Item>
                                              <div className="dropDown-item-name-icon">
                                                <PlusSmSvg
                                                  primaryColor={
                                                    primaryColor
                                                  }
                                                />
                                                <span>
                                                  Add to LMS
                                                </span>
                                              </div>
                                            </Dropdown.Item>
                                          </>
                                        </Dropdown.Menu>
                                      </Dropdown>
                                    </div>
                                  </li>
                                </ul>
                              </Accordion.Toggle>
                            </Card.Header>
                            {/* inner unit 1 */}
                            <Card>
                              <Accordion.Collapse eventKey="2">
                                <Card.Body className="playlist-card inner-card-body">
                                  <Accordion>
                                    <Card>
                                      {/* inner unit card header */}
                                      <Card.Header>
                                        <Accordion.Toggle
                                          className="d-flex align-items-center search-project-card-head"
                                          variant="link"
                                          eventKey="3"
                                        >
                                          <ul className="search-playllist-content">
                                            <li
                                              className={"active-li"}
                                            >
                                              <div className="search-playlist-title">
                                                <img
                                                  src={ReadBook}
                                                  alt="image"
                                                />
                                                <h3 className="playlist-title playlist-inner-title">
                                                  Unit 1: What You can
                                                  do With java
                                                </h3>
                                                <div className="view-btn-box ch-box">
                                                  <div className="view-unit-box">
                                                    <button className="unit-btn">
                                                      View Chapters
                                                    </button>
                                                    <img
                                                      src={RightArow}
                                                      alt="arrow"
                                                    />
                                                  </div>
                                                </div>
                                              </div>
                                              <div className="contentbox">
                                                <Dropdown className="playlist-dropdown check show dropdown">
                                                  <Dropdown.Toggle>
                                                    <FontAwesomeIcon icon="ellipsis-v" />
                                                  </Dropdown.Toggle>
                                                  <Dropdown.Menu>
                                                    <>
                                                      <Dropdown.Item>
                                                        {/* <a href={``} target="_blank"> */}
                                                        <div className="dropDown-item-name-icon">
                                                          <PreviewSmSvg
                                                            primaryColor={
                                                              primaryColor
                                                            }
                                                          />
                                                          <span>
                                                            Preview
                                                          </span>
                                                        </div>
                                                        {/* </a> */}
                                                      </Dropdown.Item>
                                                      <Dropdown.Item>
                                                        <div className="dropDown-item-name-icon">
                                                          <PlusSmSvg
                                                            primaryColor={
                                                              primaryColor
                                                            }
                                                          />
                                                          <span>
                                                            Add to LMS
                                                          </span>
                                                        </div>
                                                      </Dropdown.Item>
                                                    </>
                                                  </Dropdown.Menu>
                                                </Dropdown>
                                              </div>
                                            </li>
                                          </ul>
                                        </Accordion.Toggle>
                                      </Card.Header>
                                      {/* inner chapter card body */}
                                      <Accordion.Collapse eventKey="3">
                                        <Card.Body className="playlist-card inner-card-body">
                                          <Accordion>
                                            <Card>
                                              <Card.Header>
                                                <Accordion.Toggle
                                                  className="d-flex align-items-center search-project-card-head"
                                                  variant="link"
                                                >
                                                  <ul className="search-playllist-content">
                                                    <li
                                                      className={
                                                        "active-li"
                                                      }
                                                    >
                                                      <div className="search-playlist-title">
                                                        <img
                                                          src={
                                                            ReadBook
                                                          }
                                                          alt="image"
                                                        />
                                                        <h3 className="playlist-title playlist-inner-title">
                                                          Chapter 1:
                                                          What is
                                                          Java?
                                                        </h3>
                                                      </div>
                                                      <div className="contentbox">
                                                        <Dropdown className="playlist-dropdown check show dropdown">
                                                          <Dropdown.Toggle>
                                                            <FontAwesomeIcon icon="ellipsis-v" />
                                                          </Dropdown.Toggle>
                                                          <Dropdown.Menu>
                                                            <>
                                                              <Dropdown.Item>
                                                                {/* <a href={``} target="_blank"> */}
                                                                <div className="dropDown-item-name-icon">
                                                                  <PreviewSmSvg
                                                                    primaryColor={
                                                                      primaryColor
                                                                    }
                                                                  />
                                                                  <span>
                                                                    Preview
                                                                  </span>
                                                                </div>
                                                                {/* </a> */}
                                                              </Dropdown.Item>
                                                              <Dropdown.Item>
                                                                <div className="dropDown-item-name-icon">
                                                                  <PlusSmSvg
                                                                    primaryColor={
                                                                      primaryColor
                                                                    }
                                                                  />
                                                                  <span>
                                                                    Add
                                                                    to
                                                                    LMS
                                                                  </span>
                                                                </div>
                                                              </Dropdown.Item>
                                                            </>
                                                          </Dropdown.Menu>
                                                        </Dropdown>
                                                      </div>
                                                    </li>
                                                  </ul>
                                                </Accordion.Toggle>
                                              </Card.Header>
                                            </Card>
                                          </Accordion>
                                        </Card.Body>
                                      </Accordion.Collapse>
                                    </Card>
                                  </Accordion>
                                </Card.Body>
                              </Accordion.Collapse>
                            </Card>
                            {/* inner unit 1 */}
                            <Card>
                              <Accordion.Collapse eventKey="2">
                                <Card.Body className="playlist-card inner-card-body">
                                  <Accordion>
                                    <Card>
                                      {/* inner unit card header */}
                                      <Card.Header>
                                        <Accordion.Toggle
                                          className="d-flex align-items-center search-project-card-head"
                                          variant="link"
                                          eventKey="3"
                                        >
                                          <ul className="search-playllist-content">
                                            <li
                                              className={"active-li"}
                                            >
                                              <div className="search-playlist-title">
                                                <img
                                                  src={ReadBook}
                                                  alt="image"
                                                />
                                                <h3 className="playlist-title playlist-inner-title">
                                                  Unit 2: What You can
                                                  do With java
                                                </h3>
                                                <div className="view-btn-box ch-box">
                                                  <div className="view-unit-box">
                                                    <button className="unit-btn">
                                                      View Chapters
                                                    </button>
                                                    <img
                                                      src={RightArow}
                                                      alt="arrow"
                                                    />
                                                  </div>
                                                </div>
                                              </div>
                                              <div className="contentbox">
                                                <Dropdown className="playlist-dropdown check show dropdown">
                                                  <Dropdown.Toggle>
                                                    <FontAwesomeIcon icon="ellipsis-v" />
                                                  </Dropdown.Toggle>
                                                  <Dropdown.Menu>
                                                    <>
                                                      <Dropdown.Item>
                                                        {/* <a href={``} target="_blank"> */}
                                                        <div className="dropDown-item-name-icon">
                                                          <PreviewSmSvg
                                                            primaryColor={
                                                              primaryColor
                                                            }
                                                          />
                                                          <span>
                                                            Preview
                                                          </span>
                                                        </div>
                                                        {/* </a> */}
                                                      </Dropdown.Item>
                                                      <Dropdown.Item>
                                                        <div className="dropDown-item-name-icon">
                                                          <PlusSmSvg
                                                            primaryColor={
                                                              primaryColor
                                                            }
                                                          />
                                                          <span>
                                                            Add to LMS
                                                          </span>
                                                        </div>
                                                      </Dropdown.Item>
                                                    </>
                                                  </Dropdown.Menu>
                                                </Dropdown>
                                              </div>
                                            </li>
                                          </ul>
                                        </Accordion.Toggle>
                                      </Card.Header>
                                      {/* inner chapter card body */}
                                      <Accordion.Collapse eventKey="3">
                                        <Card.Body className="playlist-card inner-card-body">
                                          <Accordion>
                                            <Card>
                                              <Card.Header>
                                                <Accordion.Toggle
                                                  className="d-flex align-items-center search-project-card-head"
                                                  variant="link"
                                                >
                                                  <ul className="search-playllist-content">
                                                    <li
                                                      className={
                                                        "active-li"
                                                      }
                                                    >
                                                      <div className="search-playlist-title">
                                                        <img
                                                          src={
                                                            ReadBook
                                                          }
                                                          alt="image"
                                                        />
                                                        <h3 className="playlist-title playlist-inner-title">
                                                          Chapter 2:
                                                          What is
                                                          Java?
                                                        </h3>
                                                      </div>
                                                      <div className="contentbox">
                                                        <Dropdown className="playlist-dropdown check show dropdown">
                                                          <Dropdown.Toggle>
                                                            <FontAwesomeIcon icon="ellipsis-v" />
                                                          </Dropdown.Toggle>
                                                          <Dropdown.Menu>
                                                            <>
                                                              <Dropdown.Item>
                                                                {/* <a href={``} target="_blank"> */}
                                                                <div className="dropDown-item-name-icon">
                                                                  <PreviewSmSvg
                                                                    primaryColor={
                                                                      primaryColor
                                                                    }
                                                                  />
                                                                  <span>
                                                                    Preview
                                                                  </span>
                                                                </div>
                                                                {/* </a> */}
                                                              </Dropdown.Item>
                                                              <Dropdown.Item>
                                                                <div className="dropDown-item-name-icon">
                                                                  <PlusSmSvg
                                                                    primaryColor={
                                                                      primaryColor
                                                                    }
                                                                  />
                                                                  <span>
                                                                    Add
                                                                    to
                                                                    LMS
                                                                  </span>
                                                                </div>
                                                              </Dropdown.Item>
                                                            </>
                                                          </Dropdown.Menu>
                                                        </Dropdown>
                                                      </div>
                                                    </li>
                                                  </ul>
                                                </Accordion.Toggle>
                                              </Card.Header>
                                            </Card>
                                          </Accordion>
                                        </Card.Body>
                                      </Accordion.Collapse>
                                    </Card>
                                  </Accordion>
                                </Card.Body>
                              </Accordion.Collapse>
                            </Card>
                          </Card>
                        </Accordion>
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>
                </Card>
              ))}
              {filteredData.length > 0 && startSearching && (
                <a href="javascript:void(0)" className="seeMore-link">
                  See more
                </a>
              )}
            </Accordion>
          ) : (
            <Alert variant={"warning"} style={{ margin: "0" }}>
              No collection found
            </Alert>
          )}
        </div>
      </div>
      {/* ) : ( */}
      {/* <div className="search-dropdown-main">
        {filteredData.length ? (
          <div className="search-dropdown-box">
            <>
              <div className="">
                <Dropdown className="search-playlist-dropdown check show dropdown">
                  {filteredData.map((item, i) => (
                    <Dropdown.Toggle key={i}>
                      <div className="search-filter">
                        <div className="search-dropdown-filter">
                          <img
                            className="logo"
                            src={item.img}
                            alt="logo"
                          />
                          <div className="search-dropdown-content">
                            <h3 className="search-dropdown-details dropdown-heading">
                              {item.heading}
                            </h3>
                            <h4 className="search-dropdown-details project-name">
                              {item.bookname}
                            </h4>
                            <p className="search-dropdown-details content-detail">
                              {item.detail}
                            </p>
                            <p className="search-dropdown-details publish-name">
                              {item.publishname}&nbsp;&nbsp;
                              <span className="search-dropdown-details publish-date">
                                First Published: {item.publishdate}
                              </span>
                            </p>
                            <div className="content-pdf-box">
                              <p className="content-pdf">
                                {item.description}
                              </p>
                              <p className=" content-slash"></p>
                              <p className="content-pdf">
                                {item.preview}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="contentbox dropdown-contentbox">
                          <Dropdown className="playlist-dropdown check show dropdown">
                            <Dropdown.Toggle>
                              <FontAwesomeIcon icon="ellipsis-v" />
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                              <>
                                <Dropdown.Item>
                                  <div className="dropDown-item-name-icon">
                                    <PreviewSmSvg
                                      primaryColor={primaryColor}
                                    />
                                    <span>Preview</span>
                                  </div>
                                </Dropdown.Item>
                                <Dropdown.Item>
                                  <div className="dropDown-item-name-icon">
                                    <PlusSmSvg
                                      primaryColor={primaryColor}
                                    />
                                    <span>Add to LMS</span>
                                  </div>
                                </Dropdown.Item>
                              </>
                            </Dropdown.Menu>
                          </Dropdown>
                        </div>
                      </div>
                    </Dropdown.Toggle>
                  ))}
                </Dropdown>
              </div>
              <a href="javascript:void(0)" className="seeMore-link">
                See more
              </a>
            </>
          </div>
        ) : (
          <Alert variant={"warning"} style={{ margin: "0" }}>
            No result found
          </Alert>
        )}
      </div> */}
      {/* )} */}
    </div>
  );
};

export default Index;
