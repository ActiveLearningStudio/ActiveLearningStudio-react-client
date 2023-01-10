/* eslint-disable */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const MsTeamsCallBack = () => {
const search = useLocation().search;
const queryParams = new URLSearchParams(search);
const [code, setCode] = useState(null);
const [data, setData] = useState(null);
  // Get app context and auth token
  useEffect(() => {
    setCode(queryParams.get('code'));
  axios
  .post(
    `https://login.microsoftonline.com/75f881ff-c83b-44de-a964-f0f9ee64c60c/oauth2/token`,
    {
      client_id:'124965b-e9f0-44b8-9ae3-c7f8042f2f87',
      Scope:'openid offline_access https://mwaas-services-customerapi-prod.azurewebsites.net/.default',
      code: queryParams.get('code'),
      grant_type:'authorization_code',
      client_secret:'F-R8Q~JrPSnIzLz32EAU6FZ2GKxVB~nHQTdw9bL2'
    }
  )
  .then((data) => {setData(data); console.log(data)})
  .catch((error) => {
    console.log('Unexpected error in summary endpoint:');
    console.log(error);
  })

  }, []);

  return (
    // eslint-disable-next-line object-curly-newline
    <><p>Below is the code</p>
    <p>{code}</p>
    <p>{data}</p>
    </>
  );
};

export default MsTeamsCallBack;