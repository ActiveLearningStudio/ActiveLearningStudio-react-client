import React from 'react';
import { Link } from 'react-router-dom';

import './style.scss';

function Sidebar() {
  return (
    <aside>
      <ul>
        <li>
          <Link to="/">
            <span className="sidebar-icon my-resources-icon" />
            My Projects
          </Link>
        </li>
        {/*
        <li>
          <Link to="/">
            <span className="sidebar-icon teams-icon"></span>
            Teams
          </Link>
          <ul className="sublist team-members">
            <li>
              <Link to="/">Curriki Creators</Link>
            </li>
            <li>
              <Link to="/">Birdies Creators</Link>
            </li>
          </ul>
        </li>
        */}
        {/*
        <li>
          <Link to="/">
            <span className="sidebar-icon favorites-icon"></span>
            Favorite Playlists
          </Link>
        </li>
        <li>
          <Link to="/">
            <span className="sidebar-icon recent-resource-icon"></span>
            Recently Added Resources
          </Link>
        </li>
        */}
      </ul>
    </aside>
  );
}

export default Sidebar;
