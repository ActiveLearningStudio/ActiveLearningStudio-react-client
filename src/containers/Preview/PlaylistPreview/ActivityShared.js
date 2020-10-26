import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useDispatch } from 'react-redux';

import gifloader from 'assets/images/dotsloader.gif';
import { loadH5pResourceSettingsShared, loadH5pResourceSettingsEmbed, loadH5pResourceXapi } from 'store/actions/resource';
import * as xAPIHelper from 'helpers/xapi';

import './style.scss';

let counter = 0;

const ActivityShared = (props) => {
  const { match, embed } = props;
  const [authorized, setAuthorized] = useState(false);

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

    if (match.params.activityId) {
      if (embed) {
        loadH5pResourceSettingsEmbed(match.params.activityId)
          .then(async (data) => {
            const embedSettings = {};
            embedSettings.h5p = data;
            h5pInsertion(embedSettings);
          })
          .catch(() => {
            setAuthorized(true);
          });
      } else {
        loadH5pResourceSettingsShared(match.params.activityId)
          .then(async (data) => {
            h5pInsertion(data);
          })
          .catch(() => {
            setAuthorized(true);
          });
      }

      const checkXapi = setInterval(() => {
        try {
          const x = document.getElementsByClassName('h5p-iframe')[0].contentWindow;
          if (x.H5P) {
            if (x.H5P.externalDispatcher && xAPIHelper.isxAPINeeded(props.match.path)) {
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
    }
  }, [dispatch, embed, match.params.activityId, props]);

  return (
    <>
      <section className={embed ? 'embed main-page-content preview iframe-height-resource-shared ' : 'main-page-content preview iframe-height-resource-shared'}>
        {!!embed && (
          <Helmet>
            <script src="https://dev.currikistudio.org/api/storage/h5p/h5p-core/js/h5p-resizer.js" charset="UTF-8" />
          </Helmet>
        )}

        <div className="flex-container previews">
          <div className="activity-bg left-vdo">
            <div className="main-item-wrapper desktop-view">
              <div className="item-container">
                {authorized ? (
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
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

ActivityShared.propTypes = {
  match: PropTypes.object.isRequired,
  embed: PropTypes.string.isRequired,
};

export default withRouter(ActivityShared);
