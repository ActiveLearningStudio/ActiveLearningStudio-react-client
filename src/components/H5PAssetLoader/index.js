/* eslint-disable */
import React, { useEffect, useState, useRef } from 'react';

function H5PAssetLoader({ h5pAssets }) {
  console.log('H5PAssetLoader starting');
  const settings = h5pAssets.h5p.settings;
  const styles = settings.core.styles.concat(settings.loadedCss);
  const scripts = settings.core.scripts.concat(settings.loadedJs);
  const [h5pInit, setH5pInit] = useState(false);
  const loadedScripts = useRef([]);
  const loadCheckInterval = useRef(null);
  const h5pWrapper = document.getElementById('curriki-h5p-wrapper');
  h5pWrapper.innerHTML = h5pAssets.h5p.embed_code.trim();
  window.H5P = window.H5P || {};
  window.H5P.preventInit = true;
  window.H5PIntegration = settings;

  useEffect(() => {
    styles.forEach((style) => {
      const link = document.createElement('link');
      link.href = style;
      link.type = 'text/css';
      link.rel = 'stylesheet';
      document.head.appendChild(link);
    });
  
    for (let script of scripts) {
      const element = document.createElement('script');
      element.onload = () => {
        console.log(`H5PAssetLoader Assets loaded: ${element.src}`);
        loadedScripts.current.push(element.src);
      };
      element.src = script;
      element.async = false;
      document.body.appendChild(element);
    }

    console.log('H5PAssetLoader setting interval');
    loadCheckInterval.current = setInterval(() => {
      console.log('H5PAssetLoader Checking scripts')
      if (loadedScripts.current.length !== scripts.length) {
        console.log('H5PAssetLoader still loading');
        return;
      }
  
      if (typeof window.H5P === 'undefined' || !window.H5P.externalDispatcher) {
        console.log('H5PAssetLoader H5P is not ready yet...');
        return;
      }
  
      setH5pInit(true);
      window.H5P.init();
    }, 500);
  }, []);

  useEffect(() => {
    if (h5pInit !== true) return;

    clearInterval(loadCheckInterval.current);
    console.log('H5PAssetLoader loading finished');
  }, [h5pInit]);

  return (
    <div style={{display: 'none'}}>
      {loadedScripts.current.length} of {scripts.length}
      <br/>

      {h5pInit && 'Done'}
    </div>
  );
}

export default H5PAssetLoader;
