import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import dotsloader from "../../images/dotsloader.gif";
import { uploadResourceThumbnail } from "../../actions/resource";
import { uploadProjectThumbnail } from "../../actions/project";

import { useDispatch } from "react-redux";

import axios from "axios";
import { reducer } from "redux-form";
const PexelsAPI = require("pexels-api-wrapper");

var pexelsClient = new PexelsAPI(process.env.REACT_APP_PEXEL_API);

export default function Pexels(props) {
  const dispatch = useDispatch();
  const [pixeldata, setpixels] = useState([]);
  const [loader, setLoader] = useState(true);
  const [searchValue, setSearchValue] = useState();
  const [nextAPI, setNextAPi] = useState("");

  useEffect(() => {
    //  !!props.resourceName && setSearchValue(props.searchName);

    pexelsClient
      .search(!!props.searchName ? props.searchName : "abstract", 10, 4)
      .then(function (result) {
        setLoader(false);

        const allphotos =
          !!result.photos &&
          result.photos.map((data) => {
            return data.src.tiny;
          });
        console.log();
        setpixels(allphotos);
        setNextAPi(result.next_page);
      })
      .catch(function (e) {});
  }, []);
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          <p className="modelbox-container-text">
            You are currently viewing Thumbnails form{" "}
            <b>{props.resourceName}</b> Category. You can search other
            thumbnails below as well
          </p>
          <div className="searchpixels">
            <input
              type="text"
              placeholder="Search Thumbnails..."
              value={searchValue}
              onChange={(e) => {
                setSearchValue(e.target.value);
              }}
              onKeyPress={(event) => {
                if (event.key === "Enter") {
                  setLoader(true);

                  !!pexelsClient &&
                    pexelsClient
                      .search(searchValue, 10, 1)
                      .then(function (result) {
                        setLoader(false);
                        const allphotos =
                          !!result.photos &&
                          result.photos.map((data) => {
                            return data.src.tiny;
                          });
                        setpixels(allphotos);
                        setNextAPi(result.next_page);
                      })
                      .catch(function (e) {});
                }
              }}
            />
            <i className="fa fa-search" />
          </div>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div
          className="imgboxpexels"
          onScroll={() => {
            console.log(window.screen);
          }}
        >
          {!!loader ? (
            <img src={dotsloader} class="loader" alt="" />
          ) : pixeldata.length == 0 ? (
            "no result found. You can still search other thumbnails"
          ) : (
            <>
              {pixeldata.map((images) => {
                return (
                  <img
                    src={images}
                    alt=""
                    onClick={() => {
                      !!props.project
                        ? dispatch(uploadProjectThumbnail(images))
                        : dispatch(uploadResourceThumbnail(images));
                      props.onHide();
                    }}
                  />
                );
              })}
              {!!nextAPI && (
                <h6
                  className="readmore-pexel"
                  onClick={() => {
                    axios
                      .get(nextAPI, {
                        headers: {
                          Authorization: process.env.REACT_APP_PEXEL_API,
                        },
                      })
                      .then((res) => {
                        var moreData = res.data.photos.map((data) => {
                          return data.src.tiny;
                        });
                        console.log(moreData);
                        setpixels(pixeldata.concat(moreData));
                        setNextAPi(res.data.next_page);
                      });
                  }}
                >
                  Load more
                </h6>
              )}
            </>
          )}
        </div>
      </Modal.Body>
    </Modal>
  );
}
