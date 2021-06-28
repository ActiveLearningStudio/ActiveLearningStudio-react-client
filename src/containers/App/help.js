import React from 'react';
// import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import help1 from 'assets/images/help/help1.png';
import help2 from 'assets/images/help/help2.png';
import help3 from 'assets/images/help/help3.png';
import help4 from 'assets/images/help/help4.png';
import help5 from 'assets/images/help/help5.png';
import { HIDE_HELP } from 'store/actionTypes';
import cross from 'assets/images/help/cross.png';

import './style.scss';

function Help() {
  const dispatch = useDispatch();
  return (
    <div>
      <div className="helpcenter">
        <div className="content">
          <div className="heading-info">
            <h2>Explore Help center </h2>
            <img
              src={cross}
              alt=""
              onClick={() => {
                dispatch({
                  type: HIDE_HELP,
                  payload: false,
                });
              }}
            />
          </div>
          <div className="all-help">
            <a rel="noreferrer" href="https://support.curriki.org/getting-started" target="_blank">
              <div className="box">
                <img src={help1} alt="" />
                <div className="detail">
                  <h3>Getting started</h3>
                  <p>We are excited to have you here because it means you are ready to join the first free and open, interactive, learning content authoring solution.</p>
                </div>
              </div>
            </a>
            <a rel="noreferrer" href="https://support.curriki.org/creating-learning-projects" target="_blank">
              <div className="box">
                <img src={help2} alt="" />
                <div className="detail">
                  <h3>Creating Learning Projects</h3>
                  <p>Learn how to transform your content using CurrikiStudio by building and arranging your content into a Project Playlist.</p>
                </div>
              </div>
            </a>
            <a rel="noreferrer" href="https://support.curriki.org/currikistudio-tips-and-tricks" target="_blank">
              <div className="box">
                <img src={help3} alt="" />
                <div className="detail">
                  <h3>CurrikiStudio Tips and Tricks</h3>
                  <p>Here are some suggestions from our certified CurrikiStudio Instructional Designers.</p>
                </div>
              </div>
            </a>
            <a rel="noreferrer" href="https://support.curriki.org/currikistudio-in-the-classroom" target="_blank">
              <div className="box">
                <img src={help4} alt="" />
                <div className="detail">
                  <h3>CurrikiStudio in the Classromm</h3>
                  <p>How can I use CurrikiStudio for... Differentiation, Flipped Classroom, Professional Development, etc.</p>
                </div>
              </div>
            </a>
            <a rel="noreferrer" href="https://support.curriki.org/publishing-sharing" target="_blank">
              <div className="box">
                <img src={help5} alt="" />
                <div className="detail">
                  <h3>Publishing and Sharing</h3>
                  <p>CurrikiGo, our publishing system, takes the hard work out of publishing your content directly to custom microvwebsites and many LMSs.</p>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Help;
