/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { Formik } from 'formik';
import { Alert } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';
import { updateOrganizationMedaiSource } from 'store/actions/admin';

const Media = () => {
  const dispatch = useDispatch();
  const { allMediaSources, orgMediaSources } = useSelector((state) => state.admin);
  const organization = useSelector((state) => state.organization);
  const [allVideoSource, setallVideoSource] = useState([]);
  const [allImageSource, setallImageSource] = useState([]);
  const [orgVideoSource, setorgVideoSource] = useState([]);
  const [orgImageSource, setorgImageSource] = useState([]);
  const { activeOrganization } = organization;

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
                            checked={orgVideoSource?.length === 5 ? true : false}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setorgVideoSource(allVideoSource.filter((source) => source.name !== 'Safari Montage'));
                              } else {
                                setorgVideoSource([]);
                              }
                            }}
                          />
                          <span className='span-heading'>Select all</span>
                        </div>
                        <div className='btn-text'>
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              let updatedMediasSource = [];
                              let media_ids = [];
                              orgVideoSource?.map((videoSource) => {
                                return media_ids.push(videoSource.id);
                              });
                              orgImageSource?.map((imgSource) => {
                                console.log('ids', media_ids);
                                return media_ids.push(imgSource.id);
                              });
                              updatedMediasSource = orgVideoSource?.concat(orgImageSource);
                              if (orgVideoSource.length === 0) {
                                // updatedMediasSource = orgImageSource;
                                Swal.fire({
                                  icon: 'warning',
                                  text: 'Please Select Atleast One Media Source to Continue...!!',
                                  allowOutsideClick: false,
                                });
                                return false;
                              } else {
                                dispatch(updateOrganizationMedaiSource(activeOrganization?.id, media_ids, { mediaSources: updatedMediasSource }));
                              }
                            }}
                          >
                            Update
                          </button>
                        </div>
                      </div>
                      <div className='sources-sub'>
                        <div>
                          {allMediaSources?.mediaSources?.Video?.map((source, counter) => {
                            const isVideoSource = orgVideoSource?.filter((orgVideo) => orgVideo.name === source.name);
                            if (source.name !== 'Safari Montage') {
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
                                    disabled={source.name === 'Safari Montage' ? true : false}
                                  />
                                  <span id={isVideoSource.length > 0 && 'span-sub-selected'} className='span-sub'>
                                    {source.name}
                                  </span>
                                </div>
                              );
                            }
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
                            checked={orgImageSource?.length === 2 ? true : false}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setorgImageSource(allImageSource.filter((source) => source.name !== 'Safari Montage'));
                              } else {
                                setorgImageSource([]);
                              }
                            }}
                          />
                          <span className='span-heading'>Select all</span>
                        </div>
                        <div className='btn-text'>
                          <button
                            name='update'
                            onClick={(e) => {
                              e.preventDefault();
                              var updatedMediasSource = [];
                              var media_ids = [];
                              orgImageSource?.map((imgSource) => {
                                return media_ids.push(imgSource.id);
                              });
                              orgVideoSource?.map((videoSource) => {
                                return media_ids.push(videoSource.id);
                              });
                              updatedMediasSource = orgVideoSource?.concat(orgImageSource);
                              if (orgImageSource.length === 0) {
                                // updatedMediasSource = orgVideoSource;
                                Swal.fire({
                                  icon: 'warning',
                                  text: 'Please Select Atleast One Media Source to Continue...!!',
                                  allowOutsideClick: false,
                                });
                              } else {
                                dispatch(updateOrganizationMedaiSource(activeOrganization?.id, media_ids, { mediaSources: updatedMediasSource }));
                              }
                            }}
                          >
                            Update
                          </button>
                        </div>
                      </div>
                      <div className='sources-sub'>
                        <div>
                          {allMediaSources?.mediaSources?.Image?.map((source, counter) => {
                            const isImageSource = orgImageSource?.filter((orgVideo) => orgVideo.name === source.name);
                            if (source.name !== 'Safari Montage') {
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
                                    }}
                                    disabled={source.name === 'Safari Montage' ? true : false}
                                  />
                                  <span id={isImageSource.length > 0 && 'span-sub-selected'} className='span-sub'>
                                    {source.name}
                                  </span>
                                </div>
                              );
                            }
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
