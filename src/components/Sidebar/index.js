import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Swal from 'sweetalert2';

import logo from 'assets/images/logo.svg';
import {
  allSidebarProjects,
  allUpdateProject,
  sampleProjects,
} from 'store/actions/project';

import './style.scss';

function Sidebar() {
  const dispatch = useDispatch();

  const allState = useSelector((state) => state);

  const [myProjects, setMyProjects] = useState([]);
  const [sampleProject, setSampleProjects] = useState([]);
  const [updateProject, setUpdateProject] = useState([]);

  useEffect(() => {
    if (allState.sidebar.allProject.length === 0) {
      dispatch(allSidebarProjects());
      dispatch(sampleProjects());
      dispatch(allUpdateProject());
    }
  }, []);

  useEffect(() => {
    if (allState.sidebar.allProject.length > 0) {
      setMyProjects(allState.sidebar.allProject);
    }
  }, [allState.sidebar.allProject]);

  useEffect(() => {
    if (allState.sidebar.sampleProject.length > 0) {
      setSampleProjects(allState.sidebar.sampleProject);
    }
  }, [allState.sidebar.sampleProject]);

  useEffect(() => {
    if (allState.sidebar.updateProject.length > 0) {
      setUpdateProject(allState.sidebar.updateProject);
    }
  }, [allState.sidebar.updateProject]);

  return (
    <aside className="sidebarall">
      <Link to={`/`}>
        <div className="menu-title">
          <FontAwesomeIcon icon="tachometer-alt" className="mr-2" /> Dashboard
        </div>
      </Link>
      <Link to={`/projects`}>
        <div className="menu-title">
          <FontAwesomeIcon icon="tasks" className="mr-2" /> My Projects
        </div>
      </Link>

      <ul className="all-project">
        {!!myProjects &&
          myProjects.map((data, counter) => {
            return (
              <>
                {counter <= 5 && (
                  <li key={data.id}>
                    <Link to={`/project/${data.id}`}>
                      <FontAwesomeIcon icon="angle-right" className="mr-2" />
                      {data.name}
                    </Link>
                  </li>
                )}
              </>
            );
          })}
        <Link className="expand" to="/projects">
          Explore All
          <FontAwesomeIcon icon="arrow-right" className="mr-2" />
        </Link>
      </ul>
      <div
        onClick={() => {
          Swal.fire({
            title: "STAY TUNED!",
            text: "COMING SOON",
            imageUrl: logo,
            imageWidth: 400,
            imageHeight: 200,
            imageAlt: "Custom image",
          });
        }}
        className="menu-title"
      >
        <FontAwesomeIcon icon="user-friends" className="mr-2" />
        My Teams
      </div>

      <div className="menu-title">
        <FontAwesomeIcon icon="tasks" className="mr-2" />
        Sample Projects
      </div>
      {!!sampleProject && (
        <ul className="all-project">
          {sampleProject.map((data, counter) => {
            return (
              <>
                {counter <= 5 && (
                  <li key={data.id}>
                    <Link to={`/project/${data.id}`}>
                      <FontAwesomeIcon icon="angle-right" className="mr-2" />
                      {data.name}
                    </Link>
                  </li>
                )}
              </>
            );
          })}
        </ul>
      )}

      <div className="menu-title">
        <FontAwesomeIcon icon="tasks" className="mr-2" />
        What's New
      </div>
      {!!updateProject && (
        <ul className="all-project">
          {updateProject.map((data, counter) => {
            return (
              <>
                {counter <= 5 && (
                  <li key={data.id}>
                    <Link to={`/project/${data.id}`}>
                      <FontAwesomeIcon icon="angle-right" className="mr-2" />
                      {data.name}
                    </Link>
                  </li>
                )}
              </>
            );
          })}
        </ul>
      )}
    </aside>
  );
}

export default Sidebar;
