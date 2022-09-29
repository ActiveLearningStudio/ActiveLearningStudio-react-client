/* eslint-disable */
import React, { useEffect, useState } from 'react';
import PexelsAPI from 'pexels-api-wrapper';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';

import resourceService from 'services/resource.service';
import dotsloader from 'assets/images/dotsloader.gif';

const pexelsClient = new PexelsAPI(window.__RUNTIME_CONFIG__.REACT_APP_PEXEL_API);

function Pexels(props) {
  const [pexelData, setPexels] = useState([]);

  const [searchValue, setSearchValue] = useState();
  const [nextApi, setNextApi] = useState('');
  const [smythCount, setSmythCount] = useState(1);

  const { returnImagePexel, handleClose, smythsonian, loader, setLoader } = props;

  useEffect(() => {
    if (smythsonian) {
      resourceService.smithsonian({ rows: 15, start: smythCount, q: searchValue }).then((data) => {
        setLoader(false);
        setPexels(data?.response?.rows);
      });
    } else {
      pexelsClient
        .search('abstract')
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
  }, [smythsonian, smythCount]);
  return (
    <>
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
              if (smythsonian) {
                resourceService.smithsonian({ rows: 15, start: smythCount, q: searchValue }).then((data) => {
                  setLoader(false);
                  setPexels(data?.response?.rows);
                });
              } else {
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
            }
          }}
        />

        <FontAwesomeIcon icon="search" />
      </div>

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
                      src={smythsonian ? images?.content?.descriptiveNonRepeating?.online_media.media[0]?.thumbnail : images.src.tiny}
                      onClick={() => {
                        if (smythsonian) {
                          returnImagePexel(images?.content?.descriptiveNonRepeating?.online_media.media[0]?.thumbnail);
                        } else {
                          returnImagePexel(images.src.tiny);
                        }

                        handleClose();
                      }}
                      alt="pexel"
                    />
                    {smythsonian ? (
                      <a href="#" target="_blank" rel="noopener noreferrer">
                        {images.title}
                      </a>
                    ) : (
                      <a href={images.url} target="_blank" rel="noopener noreferrer">
                        {' '}
                        {images.photographer}
                        /Pexels
                      </a>
                    )}
                  </div>
                ))}
              </>
            )}

            {!!nextApi ||
              (smythsonian && (
                <h6
                  className="read-more-pexel"
                  onClick={() => {
                    if (smythsonian) {
                      setSmythCount(smythCount + 14);
                    } else {
                      axios
                        .get(nextApi, {
                          headers: {
                            Authorization: window.__RUNTIME_CONFIG__.REACT_APP_PEXEL_API,
                          },
                        })
                        .then((res) => {
                          const moreData = res.data.photos;
                          setPexels(pexelData.concat(moreData));
                          setNextApi(res.data.next_page);
                        });
                    }
                  }}
                >
                  Load more
                </h6>
              ))}
          </>
        )}
      </div>
    </>
  );
}

export default Pexels;
