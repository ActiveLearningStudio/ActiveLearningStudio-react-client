import React from "react";
import "./Sidebar.scss";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function Sidebar() {
  return (
    
        
    <aside>
        <ul>
          <li>
            <Link to="/">
                <span className="sidebar-icon my-resources-icon"></span>
                My resources
            </Link>
          </li>
          <li>
            <Link to="/">
              <span className="sidebar-icon teams-icon"></span>
                Teams
            </Link>
            <ul className="sublist team-members">
              <li>
                <Link to="/">Jitendra Gujar</Link>
              </li>
              <li>
                <Link to="/">Naina Talvar</Link>
              </li>
            </ul>
            <div className="add-member">
              <button>Add new team member</button>
            </div>
          </li>
          <li>
            <Link to="/">
              <span className="sidebar-icon favorites-icon"></span>
                Favorite playlist
            </Link>
          </li>
          <li>
            <Link to="/">
              <span className="sidebar-icon recent-resource-icon"></span>
                Recently added resources
            </Link>
          </li>
        </ul>
    </aside>
    
  );
}

export default Sidebar;