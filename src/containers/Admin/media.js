/* eslint-disable array-callback-return */
/* eslint-disable camelcase */
import React, { useState, useEffect } from 'react';
import { Formik } from 'formik';
import { Alert } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';
import HeadingThree from 'utils/HeadingThree/headingthree';
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

  const [updateLibrary, setUpdateLibrary] = useState([]);
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

  useEffect(() => {
    if (orgMediaSources?.mediaSources?.length > 0) {
      setUpdateLibrary(orgMediaSources?.mediaSources?.filter((videoSource) => videoSource.media_type === 'Video'));
    }
  }, [allMediaSources]);

  const mediaLibrary = (sourceName) => updateLibrary?.filter((data) => data.name === sourceName)[0]?.pivot?.h5p_library;
  return (
    <>
      <div className="media-section">
        <div className="box-group">
          <Formik
            initialValues={{}}
            enableReinitialize
            onSubmit={async (values) => {
              alert(values.mydivice);
            }}
          >
            {({ handleSubmit, handleBlur }) => (
              <form onSubmit={handleSubmit}>
                <div className="sources-section">
                  <h3>Video sources</h3>
                  {allMediaSources?.mediaSources?.Video ? (
                    <div className="sources-options">
                      <div className="sources-options-all">
                        <div className="media-field-checkbox">
                          <div>
                            <input
                              name="videoall"
                              type="checkbox"
                              label="Selectall"
                              checked={orgVideoSource?.length === 6}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setorgVideoSource(allVideoSource.filter((source) => source.name !== 'Safari Montage'));
                                } else {
                                  setorgVideoSource([]);
                                }
                              }}
                            />
                            <span className="span-heading">Select all</span>
                          </div>
                          <div className="h5p-heading-text">
                            <HeadingThree text="H5P library" color="#515151" className="textField-title" />
                          </div>
                        </div>
                        <div className="btn-text">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.preventDefault();
                              let updatedMediasSource = [];
                              const media_ids = [];
                              orgVideoSource?.map((videoSource) => media_ids.push({ media_source_id: videoSource.id, h5p_library: mediaLibrary(videoSource.name) }));
                              orgImageSource?.map((imgSource) => media_ids.push({ media_source_id: imgSource.id }));
                              updatedMediasSource = orgVideoSource?.concat(orgImageSource);
                              if (orgVideoSource.length === 0) {
                                // updatedMediasSource = orgImageSource;
                                Swal.fire({
                                  icon: 'warning',
                                  text: 'Please Select Atleast One Media Source to Continue...!!',
                                  allowOutsideClick: false,
                                });
                                return false;
                              }
                              Swal.fire({
                                title: 'Please Wait !',
                                text: 'Updating view...!!!',
                                allowOutsideClick: false,
                              });
                              dispatch(updateOrganizationMedaiSource(activeOrganization?.id, media_ids, { mediaSources: updatedMediasSource }));
                            }}
                          >
                            Update
                          </button>
                        </div>
                      </div>
                      <div className="sources-sub">
                        <div>
                          {allMediaSources?.mediaSources?.Video?.map((source, counter) => {
                            const isVideoSource = orgVideoSource?.filter((orgVideo) => orgVideo.name === source.name);
                            if (source.name !== 'Safari Montage') {
                              return (
                                <div className="media-version-options">
                                  <div className="media-field-checkbox" key={counter}>
                                    <input
                                      name={source.name}
                                      type="checkbox"
                                      className="media-sources-checkboxes "
                                      checked={isVideoSource?.length > 0}
                                      onChange={(e) => {
                                        if (e.target.checked) {
                                          setorgVideoSource([...orgVideoSource, source]);
                                        } else {
                                          setorgVideoSource(orgVideoSource?.filter((videoSource) => videoSource.name !== source.name));
                                        }
                                      }}
                                      disabled={source.name === 'Safari Montage'}
                                    />
                                    <span id={isVideoSource.length > 0 && 'span-sub-selected'} className="span-sub">
                                      {source.name}
                                    </span>
                                  </div>
                                  <div className="h5p-title-formik-textField">
                                    <input
                                      type="text"
                                      name={source.name}
                                      onChange={(e) => {
                                        setUpdateLibrary(
                                          updateLibrary.map((data) => {
                                            if (data.name === source.name) {
                                              return { ...data, pivot: { ...data.pivot, h5p_library: e.target.value } };
                                            }
                                            return data;
                                          }),
                                        );
                                      }}
                                      onBlur={handleBlur}
                                      value={mediaLibrary(source.name)}
                                    />
                                  </div>
                                </div>
                              );
                            }
                          })}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <Alert variant="warning">Loading...</Alert>
                  )}
                </div>
                <div className="sources-section">
                  <h3>Image sources</h3>
                  {allMediaSources.mediaSources?.Image ? (
                    <div className="sources-options">
                      <div className="sources-options-all">
                        <div className="media-field-checkbox">
                          <input
                            name="imageall"
                            type="checkbox"
                            label="Selectall"
                            checked={orgImageSource?.length === 2}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setorgImageSource(allImageSource.filter((source) => source.name !== 'Safari Montage'));
                              } else {
                                setorgImageSource([]);
                              }
                            }}
                          />
                          <span className="span-heading">Select all</span>
                        </div>
                        <div className="btn-text">
                          <button
                            type="button"
                            name="update"
                            onClick={(e) => {
                              e.preventDefault();
                              let updatedMediasSource = [];
                              const media_ids = [];
                              orgImageSource?.map((imgSource) => media_ids.push({ media_source_id: imgSource.id }));
                              orgVideoSource?.map((videoSource) => media_ids.push({ media_source_id: videoSource.id, h5p_library: mediaLibrary(videoSource.name) }));
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
                      <div className="sources-sub">
                        <div>
                          {allMediaSources?.mediaSources?.Image?.map((source, counter) => {
                            const isImageSource = orgImageSource?.filter((orgVideo) => orgVideo.name === source.name);
                            if (source.name !== 'Safari Montage') {
                              return (
                                <div className="media-field-checkbox" key={counter}>
                                  <input
                                    name={source.name}
                                    type="checkbox"
                                    checked={isImageSource?.length > 0}
                                    onChange={(e) => {
                                      if (e.target.checked) {
                                        setorgImageSource([...orgImageSource, source]);
                                      } else {
                                        setorgImageSource(orgImageSource?.filter((imageSource) => imageSource.name !== source.name));
                                      }
                                    }}
                                    disabled={source.name === 'Safari Montage'}
                                  />
                                  <span id={isImageSource.length > 0 && 'span-sub-selected'} className="span-sub">
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
                    <Alert variant="warning">Loading...</Alert>
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
