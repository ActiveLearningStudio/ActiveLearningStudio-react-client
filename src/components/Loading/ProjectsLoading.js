import React from 'react';
import { TextRow, RectShape } from 'react-placeholder/lib/placeholders';

const ProjectsLoading = () => (
  <div>
    <div className="content-wrapper">
      <div className="content">
        <div className="row">
          <div className="col-md-12">
            <div className="program-page-title">
              <h1>My Projects</h1>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-3">
            <div className="program-tile">
              <div className="program-thumb">
                <RectShape color="#e4e4e4" type="media" style={{ width: '100%', height: 300 }} />
              </div>

              <div className="program-content">
                <div className="row">
                  <div className="col-md-12">
                    <h3 className="program-title">
                      <TextRow color="#e4e4e4" style={{ width: '99%', height: 20 }} />
                      <TextRow color="#e4e4e4" style={{ width: '93%', height: 20 }} />
                      <TextRow color="#e4e4e4" style={{ width: '98%', height: 20 }} />
                      <TextRow color="#e4e4e4" style={{ width: '95%', height: 20 }} />
                    </h3>
                  </div>
                </div>

                <div className="lessons-duration">
                  <div className="row">
                    <div className="col-md-12" />
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

export default ProjectsLoading;
