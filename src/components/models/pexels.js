import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'react-bootstrap';
// import { useDispatch } from "react-redux";
import axios from 'axios';
import dotsloader from '../../assets/images/dotsloader.gif';
// import { uploadResourceThumbnail } from "../../store/actions/resource";
// import { uploadProjectThumbnail } from "../../store/actions/project";
import './styles.scss';

const PexelsAPI = require('pexels-api-wrapper');

const pexelsClient = new PexelsAPI(process.env.REACT_APP_PEXEL_API);

export default function Pexels(props) {
  // const dispatch = useDispatch();
  const [pixeldata, setpixels] = useState([]);
  const [loader, setLoader] = useState(true);
  const [searchValue, setSearchValue] = useState();
  const [nextAPI, setNextAPi] = useState('');
  // const { project, resourceName, searchName } = props;
  const { resourceName, searchName } = props;
  useEffect(() => {
    //  !!props.resourceName && setSearchValue(props.searchName);

    pexelsClient
      .search(!!searchName && searchName)
      .then((result) => {
        setLoader(false);

        const allphotos = !!result.photos
          && result.photos.map((data) => data);

        setpixels(allphotos);
        setNextAPi(result.next_page);
      })
      .catch(() => {});
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
            Category. You can search other thumbnails below as well
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
                if (event.key === 'Enter') {
                  setLoader(true);

                  pexelsClient
                    .search(searchValue, 10, 1)
                    .then((result) => {
                      setLoader(false);
                      const allphotos = !!result.photos
                        && result.photos.map((data) => data);
                      setpixels(allphotos);
                      setNextAPi(result.next_page);
                    })
                    .catch(() => {});
                }
              }}
            />
            <i className="fa fa-search" />
          </div>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="imgboxpexels">
          {loader ? (
            <img src={dotsloader} className="loader" alt="loader" />
          ) : pixeldata.length === 0 ? (
            'no result found. You can still search other thumbnails'
          ) : (
            <>
              {!!pixeldata && (
                <>
                  {pixeldata.map((images) => (
                    <div className="watermark" key={images.id}>
                      <img
                        src={images.src.tiny}
                          // onClick={() => {
                          //   {
                          //     !!project
                          //       ? dispatch(
                          //           uploadProjectThumbnail(images.src.tiny)
                          //         )
                          //       : dispatch(
                          //           uploadResourceThumbnail(images.src.tiny)
                          //         );
                          //     props.onHide();
                          //   }
                          // }}
                        alt="pexel"
                      />
                      <a rel="noreferrer" href={images.url} target="_blank">
                        {' '}
                        {images.photographer}
                        /Pexels
                      </a>
                    </div>
                  ))}
                </>
              )}
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
                        const moreData = res.data.photos.map((data) => data);

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
Pexels.propTypes = {
  project: PropTypes.object.isRequired,
  searchName: PropTypes.string.isRequired,
  onHide: PropTypes.func.isRequired,
  show: PropTypes.func.isRequired,
  resourceName: PropTypes.string.isRequired,
};
