import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './style.scss';

const ProjectPreviewModal = (props) => {
  const { project } = props;

  let playlists;
  if (project.playlists && project.playlists.length > 0) {
    playlists = project.playlists.map((playlist) => {
      let activities;
      if (playlist.activities.length > 0) {
        activities = playlist.activities.map(() => (<p>this is an activity</p>));
      } else {
        activities = (
          <div className="col-md-12">
            <div className="alert alert-info" role="alert">
              No activity defined for this playlist.
            </div>
          </div>
        );
      }

      return (
        <div className="row" key={playlist.id}>
          <div className="col">
            <h4>{playlist.title}</h4>
            {activities}
          </div>
        </div>
      );
    });
  } else {
    playlists = (
      <div className="col-md-12">
        <div className="alert alert-info" role="alert">
          No playlists defined for this project.
        </div>
      </div>
    );
  }

  return (
    <div className="resource-modal">
      <div className="modal fade right" id="createPlaylistModal" role="dialog" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-title">
              <h1>
                Project Preview
                <Link to="/studio" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </Link>
              </h1>
              <hr />
            </div>

            <div className="modal-body">
              <div className="row">
                <div className="col-4">
                  <div className="row">
                    <div className="col">
                      <img
                        src={!!project.thumb_url && project.thumb_url.includes('pexels.com')
                          ? `url(${project.thumb_url})`
                          : `url(${global.config.resourceUrl}${project.thumb_url})`}
                        className="img-fluid project-preview-thumbnail"
                        alt="thumbnail"
                      />
                    </div>
                  </div>

                  <div className="row mt-4">
                    <div className="col">
                      <h2>{project.name}</h2>
                      <p>{project.description}</p>
                    </div>
                  </div>
                </div>

                <div className="col-8">
                  <div className="card">
                    <div className="card-header">
                      Playlists
                    </div>
                    <div className="card-body">
                      {playlists}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

ProjectPreviewModal.propTypes = {
  project: PropTypes.object.isRequired,
};

export default ProjectPreviewModal;
