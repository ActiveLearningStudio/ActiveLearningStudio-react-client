/* eslint-disable */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import {mtCode} from "store/actions/msTeams";
import gifloader from 'assets/images/dotsloader.gif';

const MsTeamsCallBack = () => {
const search = useLocation().search;
const queryParams = new URLSearchParams(search);
const [code, setCode] = useState(null);
const [data, setData] = useState(null);
const dispatch = useDispatch();

  // Get app context and auth token
  useEffect(() => {
    const mt_code_obj = {'timestamp': (new Date()).toString(), 'code':queryParams.get('code')}
    // setCode(queryParams.get('code'));
    localStorage.setItem('mt_code_obj', JSON.stringify(mt_code_obj));
    localStorage.setItem('mt_code_utilized', false);
    // dispatch(mtCode(queryParams.get('code')));
    const activityId = localStorage.getItem('mt_activityId');
    const userRole = localStorage.getItem('mt_userRole');
    const assignmentId = localStorage.getItem('mt_assignmentId');
    const classId = localStorage.getItem('mt_classId');
    const view = localStorage.getItem('mt_view');
    const submissionId = localStorage.getItem('mt_submissionId');
    
    window.location.replace(`${config.domainUrl}msteam/launch/activity/${activityId}?classId=${classId}&assignmentId=${assignmentId}&submissionId=${submissionId}&view=${view}&userRole=${userRole}`);
    return;
  }, []);

  return (
    // eslint-disable-next-line object-curly-newline
    <div className="loader_gif">
      <img style={{ width: '50px' }} src={gifloader} alt="" />
    </div>
  );
};

export default MsTeamsCallBack;