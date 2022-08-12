import React from 'react';

import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

import './style.scss';

const ProjectCard = () => (
  <div className="main-myproject-card" style={{ width: '300px', marginRight: '20px' }}>
    <div>
      <>
        <div className="myproject-card-top">
          <div className="myproject-card-title">
            <Skeleton />
          </div>
        </div>
      </>
    </div>
    <div className="project-description">
      <div className="myproject-card-detail">
        <p>
          <Skeleton count="3" />
        </p>
      </div>
      <div className="myproject-card-detail">
        <p>
          <Skeleton count="2" />
        </p>
      </div>
    </div>
  </div>
);

export default ProjectCard;
