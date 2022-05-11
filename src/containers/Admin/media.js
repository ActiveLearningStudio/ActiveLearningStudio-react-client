/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { Formik } from 'formik';
import { Alert } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getOrganizationMedaiSource, updateOrganizationMedaiSource } from 'store/actions/admin';

const Media = () => {
  const dispatch = useDispatch();
  const { allMediaSources, orgMediaSources } = useSelector((state) => state.admin);
  const organization = useSelector((state) => state.organization);
  const [allVideoSource, setallVideoSource] = useState([]);
  const [allImageSource, setallImageSource] = useState([]);
  const [orgVideoSource, setorgVideoSource] = useState([]);
  const [orgImageSource, setorgImageSource] = useState([]);
  let media_ids = [];
  const { currentOrganization } = organization;

  useEffect(() => {
    if (orgMediaSources?.mediaSources?.length > 0) {
      setorgVideoSource(orgMediaSources?.mediaSources?.filter((videoSource) => videoSource.media_type === 'Video'));
    } else {
      setorgVideoSource([]);
    }
    if (orgMediaSources?.mediaSources?.length > 0) {
      setorgImageSource(orgMediaSources?.mediaSources?.filter((videoSource) => videoSource.media_type === 'Image'));
    } else {
      setorgImageSource([]);
    }

    setallVideoSource(allMediaSources?.mediaSources?.Video);
    setallImageSource(allMediaSources?.mediaSources?.Image);
  }, [orgMediaSources, allMediaSources]);
  // useEffect(() => {
  //   if (currentOrganization?.id) {
  //     dispatch(getOrganizationMedaiSource(currentOrganization?.id));
  //   }
  // }, [currentOrganization]);
  return (
    <>
      <div className='media-section'>
        <div className='box-group'>
          <Formik
            initialValues={{}}
            enableReinitialize
            onSubmit={async (values) => {
              alert(values.mydivice);
            }}
          >
            {({ handleSubmit }) => (
              <form onSubmit={handleSubmit}>
                <div className='sources-section'>
                  <h3>Video sources</h3>
                  {allMediaSources?.mediaSources?.Video ? (
                    <div className='sources-options'>
                      <div className='sources-options-all'>
                        <div className='media-field-checkbox'>
                          <input
                            name='videoall'
                            type='checkbox'
                            label='Selectall'
                            checked={orgVideoSource?.length === 6 ? true : false}
                            onChange={(e) => {
                              media_ids = [];
                              if (e.target.checked) {
                                setorgVideoSource(allVideoSource);
                                allVideoSource?.map((source) => {
                                  return media_ids.push(source.id);
                                });
                                orgImageSource?.map((imageSource) => {
                                  return media_ids.push(imageSource.id);
                                });
                              } else {
                                setorgVideoSource([]);
                                orgImageSource?.map((imageSource) => {
                                  return media_ids.push(imageSource.id);
                                });
                              }
                              dispatch(updateOrganizationMedaiSource(currentOrganization?.id, media_ids));
                            }}
                          />
                          <span className='span-heading'>Select all</span>
                        </div>
                      </div>
                      <div className='sources-sub'>
                        <div>
                          {allMediaSources?.mediaSources?.Video?.map((source, counter) => {
                            const isVideoSource = orgVideoSource?.filter((orgVideo) => orgVideo.name === source.name);
                            return (
                              <div className='media-field-checkbox' key={counter}>
                                <input
                                  name={source.name}
                                  type='checkbox'
                                  className='media-sources-checkboxes '
                                  checked={isVideoSource?.length > 0 ? true : false}
                                  onChange={(e) => {
                                    if (e.target.checked) {
                                      setorgVideoSource([...orgVideoSource, source]);
                                    } else {
                                      setorgVideoSource(orgVideoSource?.filter((videoSource) => videoSource.name !== source.name));
                                    }
                                  }}
                                  onBlur={(e) => {
                                    orgVideoSource?.map((videoSource) => {
                                      return media_ids.push(videoSource.id);
                                    });
                                    orgImageSource?.map((imgSource) => {
                                      console.log('ids', media_ids);
                                      return media_ids.push(imgSource.id);
                                    });
                                    dispatch(updateOrganizationMedaiSource(currentOrganization?.id, media_ids));
                                  }}
                                />
                                <span id={isVideoSource.length > 0 && 'span-sub-selected'} className='span-sub'>
                                  {source.name}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <Alert variant='warning'>Loading...</Alert>
                  )}
                </div>
                <div className='sources-section'>
                  <h3>Image sources</h3>
                  {allMediaSources.mediaSources?.Image ? (
                    <div className='sources-options'>
                      <div className='sources-options-all'>
                        <div className='media-field-checkbox'>
                          <input
                            name='imageall'
                            type='checkbox'
                            label='Selectall'
                            checked={orgImageSource?.length === 3 ? true : false}
                            onChange={(e) => {
                              media_ids = [];
                              if (e.target.checked) {
                                setorgImageSource(allImageSource);
                                allImageSource?.map((source) => {
                                  return media_ids.push(source.id);
                                });
                                orgVideoSource?.map((videoSource) => {
                                  return media_ids.push(videoSource.id);
                                });
                              } else {
                                setorgImageSource([]);
                                orgVideoSource?.map((videoSource) => {
                                  return media_ids.push(videoSource.id);
                                });
                              }
                              dispatch(updateOrganizationMedaiSource(currentOrganization?.id, media_ids));
                            }}
                          />
                          <span className='span-heading'>Select all</span>
                        </div>
                      </div>
                      <div className='sources-sub'>
                        <div>
                          {allMediaSources?.mediaSources?.Image?.map((source, counter) => {
                            const isImageSource = orgImageSource?.filter((orgVideo) => orgVideo.name === source.name);
                            return (
                              <div className='media-field-checkbox' key={counter}>
                                <input
                                  name={source.name}
                                  type='checkbox'
                                  checked={isImageSource?.length > 0 ? true : false}
                                  onChange={(e) => {
                                    if (e.target.checked) {
                                      setorgImageSource([...orgImageSource, source]);
                                    } else {
                                      setorgImageSource(orgImageSource?.filter((imageSource) => imageSource.name !== source.name));
                                    }

                                    dispatch(updateOrganizationMedaiSource(currentOrganization?.id, media_ids));
                                  }}
                                  onBlur={(e) => {
                                    orgImageSource?.map((imgSource) => {
                                      return media_ids.push(imgSource.id);
                                    });
                                    orgVideoSource?.map((videoSource) => {
                                      return media_ids.push(videoSource.id);
                                    });
                                    dispatch(updateOrganizationMedaiSource(currentOrganization?.id, media_ids));
                                  }}
                                />
                                <span id={isImageSource.length > 0 && 'span-sub-selected'} className='span-sub'>
                                  {source.name}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <Alert variant='warning'>Loading...</Alert>
                  )}
                </div>
              </form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
};

export default Media;
