import React from 'react';
import {TextBlock, MediaBlock, TextRow, RectShape, RoundShape} from 'react-placeholder/lib/placeholders';
const ProjectsLoading = (
    <div className='main-content-wrapper'>
      <div className="sidebar-wrapper">
        <aside>
          
        </aside>
      </div>
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
                <RectShape  color='#e4e4e4' type='media'  style={{width: 390, height: 300}}/>
              </div>
              <div className="program-content">
                <div className="row">
                  <div className="col-md-10">
                    <h3 className="program-title">
                      
                    <TextRow color='#e4e4e4'style={{width: 290, height: 20}} />
                    <TextRow color='#e4e4e4'style={{width: 280, height: 20}} />
                    <TextRow color='#e4e4e4'style={{width: 290, height: 20}} />
                    <TextRow color='#e4e4e4'style={{width: 285, height: 20}} />
                    </h3>
                  </div>
                </div>
                <div className="lessons-duration">
                <div className="row">
                  <div className="col-md-12">
                    
                  </div>
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