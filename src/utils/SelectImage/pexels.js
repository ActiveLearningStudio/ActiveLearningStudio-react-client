/* eslint-disable */
import React, { useEffect, useState } from 'react';
import PexelsAPI from 'pexels-api-wrapper';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import smithsonianJsonData from './SmithsonianData';
import resourceService from 'services/resource.service';
import { Alert } from 'react-bootstrap';
import SmithsonianFilter from './SmithsonianFilter';
import SearchSmSvg from 'iconLibrary/mainContainer/SearchSmSvg';
import { getGlobalColor } from 'containers/App/DynamicBrandingApply';

const pexelsClient = window.__RUNTIME_CONFIG__?.REACT_APP_PEXEL_API && new PexelsAPI(window.__RUNTIME_CONFIG__?.REACT_APP_PEXEL_API);
function Pexels(props) {
  const [pexelData, setPexels] = useState(null);

  const [searchValue, setSearchValue] = useState('');
  const [smythRows, setSmythRows] = useState('');
  const [nextApi, setNextApi] = useState('');
  const [smythCount, setSmythCount] = useState(0);
  const [clearSelection, setClearSelection] = useState(false);

  const [smithsonianQuery, setSmithsonianQuery] = useState([]);

  const { returnImagePexel, handleClose, smythsonian, loader, setLoader, formRef } = props;

  const clearSmythsonian = () => {
    setLoader(true);
    setClearSelection(true);
    setSearchValue('');
    setSmithsonianQuery([]);
    resourceService.smithsonian({ rows: 15, start: smythCount, q: `online_visual_material:true` }).then((data) => {
      setLoader(false);
      setPexels(data?.response?.rows);
      setSmythRows(data?.response?.rowCount);
    });
  };
  useEffect(() => {
    if (smythsonian) {
      if (smythCount === 0 && !searchValue) {
        resourceService.smithsonian({ rows: 15, start: smythCount, q: `online_visual_material:true` }).then((data) => {
          //const updatedPexels = pexelData?.concat(data?.response?.rows);
          // setPexels(updatedPexels);
          setPexels(data?.response?.rows);
          setSmythRows(data?.response?.rowCount);
          setLoader(false);
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
    let dummySet;
    let queryForSearchImage = '';
    if (smithsonianQuery.length) {
      Object.keys(smithsonianJsonData).map((data) => {
        if (dummySet) {
          dummySet = { ...dummySet, [data]: smithsonianJsonData[data].filter((value) => smithsonianQuery.includes(value)) };
        } else {
          dummySet = { [data]: smithsonianJsonData[data].filter((value) => smithsonianQuery.includes(value)) };
        }
      });

      Object.keys(dummySet).map((data) => {
        let dummyfilters;
        dummySet[data].map((filter, counter) => {
          if (dummyfilters) {
            dummyfilters = dummyfilters + `${data}:"${filter}" ${dummySet[data].length === counter + 1 ? '' : ' OR '}`;
          } else {
            dummyfilters = `${data}:"${filter}" ${dummySet[data].length === counter + 1 ? '' : ' OR '}`;
          }
        });
        if (dummyfilters) {
          if (queryForSearchImage) {
            queryForSearchImage = queryForSearchImage + ` AND (${dummyfilters})`;
          } else {
            queryForSearchImage = ` AND (${dummyfilters})`;
          }
        }
      });
      console.log(queryForSearchImage);
    }

    if (queryForSearchImage != '' && smythCount === 0) {
      setLoader(true);
      resourceService.smithsonian({ rows: 15, start: smythCount, q: `online_visual_material:true ${queryForSearchImage}` }).then((data) => {
        setLoader(false);
        setPexels(data?.response?.rows);
        setSmythRows(data?.response?.rowCount);
      });
    }
    if (smythsonian && smythCount > 0) {
      if (queryForSearchImage) {
        resourceService.smithsonian({ rows: 15, start: smythCount, q: `online_visual_material:true ${queryForSearchImage}` }).then((data) => {
          setLoader(false);
          const updatedPexels = pexelData?.concat(data?.response?.rows);
          setPexels(updatedPexels);
        });
      } else {
        resourceService.smithsonian({ rows: 15, start: smythCount, q: `online_visual_material:true ${searchValue && ` AND ${searchValue}`}` }).then((data) => {
          setLoader(false);
          const updatedPexels = pexelData?.concat(data?.response?.rows);
          setPexels(updatedPexels);
        });
      }
    }
  }, [smithsonianQuery, smythCount]);
  const primaryColor = getGlobalColor('--main-primary-color');

  return (
    <>
      <div className="search-box">
        <div className=" thumbnails-search-pixels">
          <input
            type="text"
            placeholder="Search..."
            value={searchValue}
            onChange={(e) => {
              setSearchValue(e.target.value);
              if (!e.target.value) {
                setLoader(true);
                if (smythsonian) {
                  resourceService.smithsonian({ rows: 15, start: 0, q: `online_visual_material:true` }).then((data) => {
                    setLoader(false);
                    const updatedPexels = pexelData?.concat(data?.response?.rows);
                    setPexels(updatedPexels);
                  });
                }
              }
            }}
            onKeyPress={(event) => {
              if (event.key === 'Enter' && searchValue) {
                setLoader(true);
                setSmythCount(0);
                if (smythsonian) {
                  resourceService.smithsonian({ rows: 15, start: 0, q: `online_visual_material:true${searchValue && ` AND ${searchValue}`}` }).then((data) => {
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
            <SearchSmSvg
              style={{ cursor: 'pointer' }}
              primaryColor={primaryColor}
              onClick={() => {
                setLoader(true);
                setSmythCount(0);
                if (smythsonian && searchValue) {
                  resourceService.smithsonian({ rows: 15, start: 0, q: `online_visual_material:true${searchValue && ` AND ${searchValue}`}` }).then((data) => {
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
              }}
            />
            {/* <FontAwesomeIcon
              icon="search"
              onClick={() => {
                setLoader(true);
                setSmythCount(0);
                if (smythsonian && searchValue) {
                  resourceService.smithsonian({ rows: 15, start: 0, q: `online_visual_material:true${searchValue && ` AND ${searchValue}`}` }).then((data) => {
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
              }}
            /> */}
          </div>
        </div>
        {smythsonian && (
          <div className="smithsonian-clear">
            <button
              type="button"
              onClick={() => {
                clearSmythsonian();
              }}
            >
              Clear
            </button>
          </div>
        )}
      </div>
      {/* Add filter Contion */}
      <div className="filter_smithsonian_section">
        {smythsonian && (
          <div className="filter_smithsonian">
            <SmithsonianFilter
              setSmithsonianQuery={setSmithsonianQuery}
              smithsonianJsonData={smithsonianJsonData}
              clearSelection={clearSelection}
              setClearSelection={setClearSelection}
              setSmythCount={setSmythCount}
            />
          </div>
        )}
        <div className={`thumbnails-img-box-pexels ${smythsonian && 'thumbnails-img-box-pexels-smithsonian'}`}>
          {loader ? (
            <Alert variant="primary">Loading images...</Alert>
          ) : pexelData?.length === 0 ? (
            <Alert variant="warning">No result found. You can still search other thumbnails.</Alert>
          ) : (
            <>
              {!!pexelData && (
                <>
                  {pexelData.map((images) => (
                    <div className="thumbnails-watermark" key={images.id}>
                      {smythsonian ? (
                        <>
                          {' '}
                          <div
                            className="addvideo-card-top "
                            onClick={() => {
                              if (smythsonian) {
                                if (formRef) {
                                  formRef?.current.setFieldValue('thumb_url', images?.content?.descriptiveNonRepeating?.online_media.media[0]?.thumbnail);
                                }
                                returnImagePexel(images?.content?.descriptiveNonRepeating?.online_media?.media[0]?.thumbnail);
                              }
                              handleClose();
                            }}
                            style={{
                              backgroundImage: `url(${images?.content?.descriptiveNonRepeating?.online_media?.media[0]?.thumbnail})`,
                            }}
                          ></div>
                        </>
                      ) : (
                        <>
                          {' '}
                          <img
                            className="thumbnails-watermark-img"
                            src={smythsonian ? images?.content?.descriptiveNonRepeating?.online_media?.media[0]?.thumbnail : images.src.tiny}
                            onClick={() => {
                              if (formRef) {
                                formRef?.current.setFieldValue('thumb_url', images.src.tiny);
                              }
                              returnImagePexel(images.src.tiny);

                              handleClose();
                            }}
                            alt="pexel"
                          />
                        </>
                      )}
                      {/* <img
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
                      /> */}

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

              {(!!nextApi || (smythsonian && smythRows > 15)) && (
                <h6
                  className="read-more-pexel"
                  onClick={() => {
                    if (smythsonian) {
                      setSmythCount(smythCount + 15);
                    } else {
                      axios
                        .get(nextApi, {
                          headers: {
                            Authorization: window.__RUNTIME_CONFIG__.REACT_APP_PEXEL_API,
                          },
                        })
                        .then((res) => {
                          const moreData = res.data.photos;
                          setPexels(pexelData?.concat(moreData));
                          setNextApi(res.data.next_page);
                        });
                    }
                  }}
                >
                  Load more ...
                </h6>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Pexels;
