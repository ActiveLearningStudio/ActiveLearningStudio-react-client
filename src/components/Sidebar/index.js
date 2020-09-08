import React,{useEffect,useState} from 'react';
import { Link } from 'react-router-dom';
import {useSelector, useDispatch} from "react-redux"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './style.scss';
import {
  allSidebarProjects,
  allUpdateProject,
  sampleProjects
} from 'store/actions/project'

function Sidebar() {
  const dispatch = useDispatch() 

  const allState = useSelector(state=>state)

  const [myProjects,setMyProjects] = useState([])
  const [sampleProject,setSampleProjects] = useState([])
  const [updateProject,setUpdateProject] = useState([])

  useEffect(()=>{
    if(allState.sidebar.allProject.length===0){
      dispatch(allSidebarProjects())
      dispatch(sampleProjects())
      dispatch(allUpdateProject())
    }
  },[])

  useEffect(()=>{
    if(allState.sidebar.allProject.length>0){
      setMyProjects(allState.sidebar.allProject)
    }
  },[allState.sidebar.allProject])

  useEffect(()=>{
    if(allState.sidebar.sampleProject.length>0){
      setSampleProjects(allState.sidebar.sampleProject)
    }
  },[allState.sidebar.sampleProject])

  useEffect(()=>{
    if(allState.sidebar.updateProject.length>0){
      setUpdateProject(allState.sidebar.updateProject)
    }
  },[allState.sidebar.updateProject])


  
  return (
    <aside className="sidebarall">
      <ul>
        
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
      
      <Link to={`/`}>
      <div className="menu-title">
      My Projects
      </div>
        
        </Link>
       
      <ul className="all-project">
        {!!myProjects && myProjects.map((data, counter)=>{
        return (
          <>
           {counter <=5 && <li key={data.id}>
             
             <Link to={`/project/${data.id}`}>
               <FontAwesomeIcon icon="angle-right" className="mr-2" />
               {data.name}
               </Link></li>}
          </>
          )
        })}
     </ul>

     <div className="menu-title">Sample Projects</div>
      <ul className="all-project">
        {!!sampleProject && sampleProject.map((data, counter)=>{
        return (
          <>
           {counter <=5 && <li key={data.id}><Link to={`/project/${data.id}/shared`}>
           <FontAwesomeIcon icon="angle-right" className="mr-2" />
             {data.name}</Link></li>}
          </>
          )
        })}
     </ul>

     <div className="menu-title">FEATURED Project</div>
      <ul className="all-project">
        {!!updateProject && updateProject.map((data, counter)=>{
        return (
          <>
           {counter <=5 && <li key={data.id}><Link to={`/project/${data.id}`}>
           <FontAwesomeIcon icon="angle-right" className="mr-2" />
             {data.name}</Link></li>}
          </>
          )
        })}
     </ul>
    
    </aside>
  );
}

export default Sidebar;
