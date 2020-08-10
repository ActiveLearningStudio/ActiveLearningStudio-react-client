import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import PexelsAPI from 'pexels-api-wrapper';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import dotsloader from 'assets/images/dotsloader.gif';
import { uploadResourceThumbnail } from 'store/actions/resource';

const pexelsClient = new PexelsAPI(
  '563492ad6f91700001000001155d7b75f5424ea694b81ce9f867dddf',
);

function Pexels(props) {
  const { searchName, resourceName, onHide } = props;

  const dispatch = useDispatch();
  const [pixelData, setPixels] = useState([]);
  const [loader, setLoader] = useState(true);
  const [searchValue, setSearchValue] = useState();

  useEffect(() => {
    //  !!props.resourceName && setSearchValue(props.searchName);
    pexelsClient
      .search(searchName, 10, 4)
      .then((result) => {
        setLoader(false);
        const allPhotos = !!result.photos && result.photos.map((data) => data.src.tiny);
        setPixels(allPhotos);
      })
      .catch(() => {
        // console.err(e);
      });
  }, [searchName]);

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
            You are currently viewing Thumbnails form
            {' '}
            <b>{resourceName}</b>
            {' '}
            Category. You can search other
            thumbnails below as well
          </p>

          <div className="search-pixels">
            <input
              type="text"
              placeholder="Search Thumbnails..."
              value={searchValue}
              onChange={(e) => {
                setSearchValue(e.target.value);
              }}
              onKeyPress={(event) => {
                if (event.key === 'Enter') {
                  setLoader(true);

                  pexelsClient
                    .search(searchValue, 10, 1)
                    .then((result) => {
                      setLoader(false);
                      const allPhotos = !!result.photos && result.photos.map((data) => data.src.tiny);
                      setPixels(allPhotos);
                    })
                    .catch(() => {});
                }
              }}
            />
            <FontAwesomeIcon icon="search" />
          </div>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div
          className="img-box-pexels"
          onScroll={() => {
            // console.log(window.screen);
          }}
        >
          {loader ? (
            <img src={dotsloader} className="loader" alt="" />
          ) : (
            pixelData.length === 0 ? (
              'no result found. You can still search other thumbnails'
            ) : (
              pixelData.map((images) => (
                <img
                  src={images}
                  alt=""
                  onClick={() => {
                    dispatch(uploadResourceThumbnail(images));
                    onHide();
                  }}
                />
              ))
            )
          )}
        </div>
      </Modal.Body>
    </Modal>
  );
}

Pexels.propTypes = {
  searchName: PropTypes.string,
  resourceName: PropTypes.string,
  onHide: PropTypes.func.isRequired,
};

Pexels.defaultProps = {
  searchName: '',
  resourceName: '',
};

export default Pexels;
