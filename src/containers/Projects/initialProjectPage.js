import React from 'react';
import Headings from 'curriki-design-system/dist/utils/Headings/headings';
import initialpic from '../../assets/images/no-project-found.png';

import './style.scss';

const initialProjectPage = () => (
  <div className="initial-project-wrapper">
    <div className="initial-project-content">
      <div className="initial-left-col">
        <Headings text="Hello!" color="#515151" size="48" wieght="500" headingType="h2" />
        <Headings text="Start creating awesome projects." color="#515151" size="32" wieght="500" headingType="h3" />
        <Headings
          color="#515151"
          size="18"
          wieght="400"
          text="We have a library of over 40 awesome “interactive-by-design” learning activities to create inmersive experiences. "
          headingType="body2"
        />
        <Headings color="#515151" size="18" wieght="400" text="Start by pressing “Create project” and make your content live!" headingType="body2" />
        <p>
          Feeling lost? Go to
          <a href="https://www.curriki.org" rel="noreferrer" target="_blank">
            {' '}
            Help Center.
          </a>
        </p>
      </div>
      <div className="initial-right-col" />
      <img src={initialpic} alt="initial-project-screen" />
    </div>
  </div>
);

export default initialProjectPage;
