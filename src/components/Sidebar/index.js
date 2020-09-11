import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import Swal from 'sweetalert2';

// import logo from 'assets/images/logo.svg';
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
  }, [allState.sidebar.allProject.length, dispatch]);

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
      <Link to="/">
        <div className="menu-title">
          <FontAwesomeIcon icon="tasks" className="mr-2" />
          My Projects
        </div>
      </Link>

      <ul className="all-project">
        {!!myProjects && myProjects.map((data, counter) => (
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
        ))}
        <Link className="expand" to="/projects">
          Explore All
          <FontAwesomeIcon icon="arrow-right" className="ml-2" />
        </Link>
      </ul>
      {/* <div
        className="menu-title"
        onClick={() => {
          Swal.fire({
            title: 'STAY TUNED!',
            text: 'COMING SOON',
            imageUrl: logo,
            imageWidth: 400,
            imageHeight: 200,
            imageAlt: 'Custom image',
          });
        }}
      >
        <FontAwesomeIcon icon="user-friends" className="mr-2" />
        My Teams
      </div> */}

      <div className="menu-title">
        <FontAwesomeIcon icon="tasks" className="mr-2" />
        Sample Projects
      </div>
      {!!sampleProject && (
        <ul className="all-project">
          {sampleProject.map((data, counter) => (
            <>
              {counter <= 5 && (
                <li key={data.id}>
                  <a target="_blank" rel="noreferrer" href={`/project/${data.id}/shared`}>
                    <FontAwesomeIcon icon="angle-right" className="mr-2" />
                    {data.name}
                  </a>
                </li>
              )}
            </>
          ))}
        </ul>
      )}

      {/*
      !!updateProject && (
        <>
          <div className="menu-title">
            <FontAwesomeIcon icon="tasks" className="mr-2" />
            What&apos;s New
          </div>

          <ul className="all-project">
            {updateProject.map((data, counter) => (
              <>
                {counter <= 5 && (
                  <li key={data.id}>
                    <a target="_blank" rel="noreferrer" href={`/project/${data.id}/shared`}>
                      <FontAwesomeIcon icon="angle-right" className="mr-2" />
                      {data.name}
                    </a>
                  </li>
                )}
              </>
            ))}
          </ul>
        </>
      )
      */}
      <Link to="/dashboard">
        <div className="menu-title">
          <FontAwesomeIcon icon="tachometer-alt" className="mr-2" />
          Utilization Dashboard
        </div>
      </Link>
    </aside>
  );
}

export default Sidebar;
