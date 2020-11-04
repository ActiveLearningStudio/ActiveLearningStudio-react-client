import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import { useDispatch } from 'react-redux';

import gifloader from 'assets/images/dotsloader.gif';
// import * as xAPIHelper from 'helpers/xapi';
import {
  loadH5pResourceSettingsShared,
  // loadH5pResourceXapi,
} from 'store/actions/resource';

import './style.scss';

// let counter = 0;

const Activity = (props) => {
  const { activityId } = props;

  const dispatch = useDispatch();

  const h5pInsertion = async (data) => {
    window.H5PIntegration = data.h5p.settings;
    const h5pWrapper = document.getElementById('curriki-h5p-wrapper');
    h5pWrapper.innerHTML = data.h5p.embed_code.trim();
    const newCss = data.h5p.settings.core.styles.concat(
      data.h5p.settings.loadedCss,
    );

    await Promise.all(
      newCss.map((value) => {
        const link = document.createElement('link');
        link.href = value;
        link.type = 'text/css';
        link.rel = 'stylesheet';
        document.head.appendChild(link);
        return true;
      }),
    );

    const newScripts = data.h5p.settings.core.scripts.concat(
      data.h5p.settings.loadedJs,
    );

    newScripts.forEach((value) => {
      const script = document.createElement('script');
      script.src = value;
      script.async = false;
      document.body.appendChild(script);
    });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    loadH5pResourceSettingsShared(activityId)
      .then(async (data) => {
        h5pInsertion(data);
      });
    /*
    const checkXapi = setInterval(() => {
      try {
        const x = document.getElementsByClassName('h5p-iframe')[0].contentWindow;
        if (x.H5P) {
          if (x.H5P.externalDispatcher && xAPIHelper.isxAPINeeded(match.path)) {
            // eslint-disable-next-line no-use-before-define
            stopXapi();

            x.H5P.externalDispatcher.on('xAPI', (event) => {
              if (counter > 0) {
                dispatch(loadH5pResourceXapi(JSON.stringify(xAPIHelper.extendStatement(event.data.statement, { ...props }))));
              }
              counter += 1;
            });
          }
        }
      } catch (e) {
        console.log(e);
      }
    });

    const stopXapi = () => clearInterval(checkXapi);
    */
  }, [dispatch, activityId, props]);

  return (
    <div id="curriki-h5p-wrapper">
      <div className="loader_gif">
        <img style={{ width: '50px' }} src={gifloader} alt="" />
      </div>
    </div>
  );
};

Activity.propTypes = {
  activityId: PropTypes.string.isRequired,
};

export default withRouter(Activity);
