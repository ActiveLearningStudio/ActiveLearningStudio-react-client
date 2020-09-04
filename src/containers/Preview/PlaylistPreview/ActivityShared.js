import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import gifloader from 'assets/images/dotsloader.gif';
import { loadH5pShareResource } from 'store/actions/resource';

import './style.scss';

const ActivityShared = (props) => {
  const { match } = props;
  const [authorized, setAuthorized] = useState(true);
  useEffect(() => {
    window.scrollTo(0, 0);
    const result = !!match.params.activityId && loadH5pShareResource(match.params.activityId);
    result.then(async (data) => {
      window.H5PIntegration = data.h5p_activity.h5p.settings;
      const h5pWrapper = document.getElementById('curriki-h5p-wrapper');
      h5pWrapper.innerHTML = data.h5p_activity.h5p.embed_code.trim();
      const newCss = data.h5p_activity.h5p.settings.core.styles.concat(
        data.h5p_activity.h5p.settings.loadedCss,
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

      const newScripts = data.h5p_activity.h5p.settings.core.scripts.concat(
        data.h5p_activity.h5p.settings.loadedJs,
      );

      newScripts.forEach((value) => {
        const script = document.createElement('script');
        script.src = value;
        script.async = false;
        document.body.appendChild(script);
      });
    }).catch(() => {
      setAuthorized(true);
    });
  }, [match.params.activityId]);

  return (
    <>
      <section className="main-page-content preview">
        <div className="flex-container ">
          <div className="activity-bg left-vdo">
            <div className="main-item-wrapper">
              <div className="item-container">

                {
                    !authorized ? (
                      <div id="curriki-h5p-wrapper">
                        <div className="loader_gif" style={{ color: 'black' }}>
                          Activity is not sharable
                        </div>
                      </div>
                    ) : (
                      <div id="curriki-h5p-wrapper">
                        <div className="loader_gif">
                          <img style={{ width: '50px' }} src={gifloader} alt="" />
                        </div>
                      </div>
                    )
                  }

              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

ActivityShared.propTypes = {
  match: PropTypes.string.isRequired,
};

export default withRouter(ActivityShared);
