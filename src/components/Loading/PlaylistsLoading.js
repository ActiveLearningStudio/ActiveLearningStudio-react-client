import React from 'react';
import { TextRow, RectShape } from 'react-placeholder/lib/placeholders';

const PlaylistsLoading = () => (
  <div className="main-content-wrapper">
    <div className="sidebar-wrapper">
      <aside>
        <RectShape type="media" style={{ width: '100%', height: 500 }} />
      </aside>
    </div>

    <div className="content-wrapper">
      <div className="content">
        <div className="u-fancy-scrollbar js-no-higher-edits js-list-sortable ui-sortable">
          <div className="list-wrapper">
            <div className="list">
              <div className="list-header">
                <RectShape color="#e4e4e4" type="media" style={{ width: '100%', height: 70 }} />
              </div>

              <div className="list-body">
                <div className="row">
                  <div className="col-md-12">
                    <TextRow color="#e4e4e4" style={{ width: '99%', height: 20 }} />
                    <TextRow color="#e4e4e4" style={{ width: '93%', height: 20 }} />
                    <TextRow color="#e4e4e4" style={{ width: '98%', height: 20 }} />
                    <TextRow color="#e4e4e4" style={{ width: '95%', height: 20 }} />
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

export default PlaylistsLoading;
