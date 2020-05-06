import React from 'react';
import {TextBlock, MediaBlock, TextRow, RectShape, RoundShape} from 'react-placeholder/lib/placeholders';
const PlaylistsLoading = (
    <div className='main-content-wrapper'>
      <div className="sidebar-wrapper">
        <aside>
          <RectShape type='media' style={{width: 300, height: 500}}/>
        </aside>
      </div>
      <div className="content-wrapper">
        <div className="content">
          <div id="board" className="u-fancy-scrollbar js-no-higher-edits js-list-sortable ui-sortable">
              <div className="list-wrapper">
                <div className="list">
                  <div class="list-header">
                    
                      <RectShape  color='#e4e4e4' type='media'  style={{width: 390, height: 70}}/>
                      
                  </div>

                    <div class="list-body">
                      <div className="row">
                        <div className="col-md-12">
                        <TextRow color='#e4e4e4'style={{width: 350, height: 20}} />
                        <TextRow color='#e4e4e4'style={{width: 330, height: 20}} />
                        <TextRow color='#e4e4e4'style={{width: 360, height: 20}} />
                        <TextRow color='#e4e4e4'style={{width: 310, height: 20}} />
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