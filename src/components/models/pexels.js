import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import PexelsAPI from 'pexels-api-wrapper';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';

import dotsloader from 'assets/images/dotsloader.gif';
import { uploadResourceThumbnail } from 'store/actions/resource';
import { uploadProjectThumbnail } from 'store/actions/project';

import './styles.scss';

const pexelsClient = new PexelsAPI(process.env.REACT_APP_PEXEL_API);

function Pexels(props) {
  const dispatch = useDispatch();

  const [pexelData, setPexels] = useState([]);
  const [loader, setLoader] = useState(true);
  const [searchValue, setSearchValue] = useState();
  const [nextApi, setNextApi] = useState('');

  const { project, resourceName = 'abstract', searchName } = props;

  useEffect(() => {
    pexelsClient
      .search(!!searchName && searchName)
      .then((result) => {
        setLoader(false);
        const allPhotos = !!result.photos && result.photos.map((data) => data);
        setPexels(allPhotos);
        setNextApi(result.next_page);
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
            Category. You can search other thumbnails below as well.
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
                      const allPhotos = !!result.photos && result.photos.map((data) => data);
                      setPexels(allPhotos);
                      setNextApi(result.next_page);
                    })
                    .catch(() => {
                      // console.err(e);
                    });
                }
              }}
            />

            <FontAwesomeIcon icon="search" />
          </div>
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className="img-box-pexels">
          {loader ? (
            <img src={dotsloader} className="loader" alt="loader" />
          ) : pexelData.length === 0 ? (
            'No result found. You can still search other thumbnails.'
          ) : (
            <>
              {!!pexelData && (
                <>
                  {pexelData.map((images) => (
                    <div className="watermark" key={images.id}>
                      <img
                        src={images.src.tiny}
                        onClick={() => {
                          props.onHide();
                          return project
                            ? dispatch(uploadProjectThumbnail(images.src.tiny))
                            : dispatch(uploadResourceThumbnail(images.src.tiny));
                        }}
                        alt="pexel"
                      />
                      <a href={images.url} target="_blank" rel="noopener noreferrer">
                        {' '}
                        {images.photographer}
                        /Pexels
                      </a>
                    </div>
                  ))}
                </>
              )}

              {!!nextApi && (
                <h6
                  className="read-more-pexel"
                  onClick={() => {
                    axios
                      .get(nextApi, {
                        headers: {
                          Authorization: process.env.REACT_APP_PEXEL_API,
                        },
                      })
                      .then((res) => {
                        const moreData = res.data.photos;
                        setPexels(pexelData.concat(moreData));
                        setNextApi(res.data.next_page);
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

Pexels.propTypes = {
  show: PropTypes.bool,
  project: PropTypes.object,
  searchName: PropTypes.string.isRequired,
  resourceName: PropTypes.string,
  onHide: PropTypes.func.isRequired,
};

Pexels.defaultProps = {
  show: false,
  project: null,
  resourceName: null,
};

export default Pexels;
