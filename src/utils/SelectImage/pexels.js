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

  const [searchValue, setSearchValue] = useState('');
  const [nextApi, setNextApi] = useState('');
  const [smythCount, setSmythCount] = useState(1);

  const { returnImagePexel, handleClose, smythsonian, loader, setLoader, formRef } = props;

  useEffect(() => {
    if (smythsonian) {
      if (smythCount === 1 && !searchValue) {
        resourceService.smithsonian({ rows: 15, start: smythCount, q: `online_visual_material:true` }).then((data) => {
          setLoader(false);
          const updatedPexels = pexelData.concat(data?.response?.rows);
          setPexels(updatedPexels);
        });
      }
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
  useEffect(() => {
    if (smythsonian && smythCount > 1) {
      resourceService.smithsonian({ rows: 15, start: smythCount, q: `online_visual_material:true${searchValue && ` AND ${searchValue}`}` }).then((data) => {
        setLoader(false);
        const updatedPexels = pexelData.concat(data?.response?.rows);
        setPexels(updatedPexels);
      });
    }
  }, [smythCount]);

  return (
    <>
      <div className="search-box">
        <div className=" thumbnails-search-pixels">
          <input
            type="text"
            placeholder="Search..."
            value={searchValue}
            onChange={(e) => {
              setSearchValue(e.target.value.trim());
              if (!e.target.value) {
                setLoader(true);
                if (smythsonian) {
                  resourceService.smithsonian({ rows: 15, start: 1, q: `online_visual_material:true` }).then((data) => {
                    setLoader(false);
                    const updatedPexels = pexelData.concat(data?.response?.rows);
                    setPexels(updatedPexels);
                  });
                }
              }
            }}
            onKeyPress={(event) => {
              if (event.key === 'Enter' && searchValue) {
                setLoader(true);
                setSmythCount(1);
                if (smythsonian) {
                  resourceService.smithsonian({ rows: 15, start: 1, q: `online_visual_material:true${searchValue && ` AND ${searchValue}`}` }).then((data) => {
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
          <div className="search-icon">
            <FontAwesomeIcon
              icon="search"
              onClick={() => {
                setLoader(true);
                setSmythCount(1);
                if (smythsonian && searchValue) {
                  resourceService.smithsonian({ rows: 15, start: 1, q: `online_visual_material:true${searchValue && ` AND ${searchValue}`}` }).then((data) => {
                    setLoader(false);
                    setPexels(data?.response?.rows);
                  });
                }
              }}
            />
          </div>
        </div>
      </div>

      <div className="thumbnails-img-box-pexels">
        {loader ? (
          <img src={dotsloader} className="thumbnails-loader" alt="loader" />
        ) : pexelData?.length === 0 ? (
          <h6 className="read-more-pexel">No result found. You can still search other thumbnails.</h6>
        ) : (
          <>
            {!!pexelData && (
              <>
                {pexelData.map((images) => (
                  <div className="thumbnails-watermark" key={images.id}>
                    <img
                      className="thumbnails-watermark-img"
                      src={smythsonian ? images?.content?.descriptiveNonRepeating?.online_media?.media[0]?.thumbnail : images.src.tiny}
                      onClick={() => {
                        if (smythsonian) {
                          if (formRef) {
                            formRef?.current.setFieldValue('thumb_url', images?.content?.descriptiveNonRepeating?.online_media.media[0]?.thumbnail);
                          }
                          returnImagePexel(images?.content?.descriptiveNonRepeating?.online_media?.media[0]?.thumbnail);
                        } else {
                          if (formRef) {
                            formRef?.current.setFieldValue('thumb_url', images.src.tiny);
                          }
                          returnImagePexel(images.src.tiny);
                        }

                        handleClose();
                      }}
                      alt="pexel"
                    />
                    {smythsonian && <span>{images.title}</span>}
                    {/* {smythsonian ? (
                      <a href="#" target="_blank" rel="noopener noreferrer">
                        {images.title}
                      </a>
                    ) : (
                      <a href={images.url} target="_blank" rel="noopener noreferrer">
                        {' '}
                        {images.photographer}
                        /Pexels
                      </a>
                    )}*/}
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
                  Load more ...
                </h6>
              ))}
          </>
        )}
      </div>
    </>
  );
}

export default Pexels;
