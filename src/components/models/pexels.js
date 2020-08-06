import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import dotsloader from "../../images/dotsloader.gif";
const PexelsAPI = require("pexels-api-wrapper");

var pexelsClient = new PexelsAPI(
  "563492ad6f91700001000001155d7b75f5424ea694b81ce9f867dddf"
);

export default function Pexels(props) {
  const [pixeldata, setpixels] = useState([]);
  const [loader, setLoader] = useState(true);
  const [searchValue, setSearchValue] = useState();

  useEffect(() => {
    //  !!props.resourceName && setSearchValue(props.searchName);
    pexelsClient
      .search(props.searchName, 10, 4)
      .then(function (result) {
        setLoader(false);
        console.log(result);
        const allphotos =
          !!result.photos &&
          result.photos.map((data) => {
            return data.src.tiny;
          });
        setpixels(allphotos);
      })
      .catch(function (e) {
        console.err(e);
      });
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
            pixeldata.map((images) => {
              return <img src={images} alt="" />;
            })
          )}
        </div>
      </Modal.Body>
    </Modal>
  );
}
