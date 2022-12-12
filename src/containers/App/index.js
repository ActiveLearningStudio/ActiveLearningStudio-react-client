/* eslint-disable */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { ToastContainer } from 'react-toastify';
import { connect, useDispatch, useSelector } from 'react-redux';
import { Helmet } from 'react-helmet';
import logo from 'assets/images/studio_new_logo.png';
import logoFavicon from 'assets/images/svg/Globe.svg';
import loader from 'assets/images/dotsloader.gif';
import { getUserAction } from 'store/actions/auth';

import { getBranding, getOrganizationFirstTime, getAllPermission } from 'store/actions/organization';

import AppRouter from 'routers/AppRouter';
import Help from './help';

import './style.scss';
import { DynamicBrandingApply } from './DynamicBrandingApply';

let runOnce = true;
function App(props) {
  const dispatch = useDispatch();
  const { getUser } = props;
  useEffect(() => {
    getUser();
  }, [getUser]);
  const userDetails = useSelector((state) => state.auth.user);
  const { activeOrganization, currentOrganization, permission } = useSelector((state) => state.organization);
  const { help } = useSelector((state) => state.ui);
  useEffect(() => {
    if (userDetails) {
      if (runOnce) {
        runOnce = false;
        if (window.location.href.includes('/org/')) {
          if (window.location.pathname.split('/org/')[1].split('/').length === 1) {
            const subDomain = window.location.pathname.split('/org/')[1]?.replace(/\//g, '');
            (async () => {
              const result = dispatch(getBranding(subDomain));
              result
                .then((data) => {
                  if (permission?.Organization?.includes('organization:view')) dispatch(getOrganizationFirstTime(data?.organization?.id));
                  dispatch(getAllPermission(data?.organization?.id));
                  DynamicBrandingApply(data?.organization);
                })
                .catch((err) => err && window.location.replace('/org/currikistudio'));
            })();
          } else {
            const subDomain = window.location.pathname.split('/org/')[1].split('/')[0]?.replace(/\//g, '');
            (async () => {
              const result = dispatch(getBranding(subDomain));
              result
                .then((data) => {
                  if (permission?.Organization?.includes('organization:view')) dispatch(getOrganizationFirstTime(data?.organization?.id));
                  dispatch(getAllPermission(data?.organization?.id));
                  DynamicBrandingApply(data?.organization);
                })
                .catch((err) => err && window.location.replace('/org/currikistudio'));
            })();
          }
        } else if (window.location.pathname.includes('/preview')) {
          const subDomain = localStorage.getItem('current_org');
          (async () => {
            const result = dispatch(getBranding(subDomain));
            result
              .then((data) => {
                if (permission?.Organization?.includes('organization:view')) dispatch(getOrganizationFirstTime(data?.organization?.id));
                dispatch(getAllPermission(data?.organization?.id));
              })
              .catch((err) => err && window.location.replace('/org/currikistudio'));
          })();
        }
      }
    }
  }, [dispatch, userDetails, activeOrganization]);

  useEffect(() => {
    if (!localStorage.getItem('auth_token')) {
      dispatch({
        type: 'SET_ALL_PERSMISSION',
        payload: { loading: false },
      });
    }
  }, []);

  useEffect(() => {
    if (
      window.location.href.includes('/login') ||
      window.location.pathname.includes('/register') ||
      window.location.pathname.includes('/forgot-password') ||
      window.location.pathname.includes('/reset-password')
    ) {
      const subDomain = window.location.pathname.split('/')[window.location.pathname.split('/').length - 1];
      if (subDomain?.includes('login') || subDomain?.includes('register') || subDomain?.includes('forgot-password') || window.location.pathname.includes('/reset-password')) {
        const result = dispatch(getBranding('currikistudio'));
        result.then((data) => {
          DynamicBrandingApply(data?.organization);
        });
      } else if (subDomain) {
        const result = dispatch(getBranding(subDomain || 'currikistudio'));
        result
          .then((data) => {
            DynamicBrandingApply(data?.organization);
          })
          .catch((err) => err && window.location.replace('/login'));
      } else {
        const result = dispatch(getBranding('currikistudio'));
        result.then((data) => {
          DynamicBrandingApply(data?.organization);
        });
      }
    }
    // if (window.HubSpotConversations) {
    //   // console.log('The api is ready already');
    // } else {
    //   window.hsConversationsOnReady = [
    //     () => {
    //       // console.log('Now the api is ready');
    //       window.HubSpotConversations.widget.load();
    //     },
    //   ];
    // }
  }, [window.location.href]);

  return (
    <div>
      <Helmet>
        <meta name="description" content="CurrikiStudio" />
        <meta name="theme-color" content="#008f68" />

        <script type="text/javascript" id="hs-script-loader" async defer src={`//js.hs-scripts.com/${window.__RUNTIME_CONFIG__.REACT_APP_HUBSPOT}.js`} />

        {currentOrganization?.name && <title>{currentOrganization.name}</title>}

        {currentOrganization?.favicon ? (
          <link
            rel="icon"
            href={currentOrganization.favicon.includes('dev.currikistudio') ? currentOrganization.favicon : global.config.resourceUrl + currentOrganization.favicon}
            sizes="16x16"
          />
        ) : (
          <link rel="icon" href={logoFavicon} />
        )}
      </Helmet>
      <AppRouter />
      <ToastContainer limit={1} />
      {Object.keys(permission)?.length === 0 && (
        <div className="loader-main-curriki-permission">
          <img src={logo} className="logo" alt="" />
          <img src={loader} className="loader" alt="" />
        </div>
      )}
      <div className="mobile-app-alert">
        <img src={logo} alt="" />

        <div className="text-description">
          <h2>Please use desktop browser</h2>

          <p>CurrikiStudio doesn’t yet support mobile for authors. To continue, we recommend that you use either a browser on a tablet, desktop or laptop computer.</p>
          <p>
            Why no mobile access for authors? All learning courses built with CurrikiStudio are accessible on mobile for learners. However, in order for an author to build a truly
            interactive, immersive learning experience, a full browser is required.
          </p>

          <p>
            To learn more click here
            <a href="https://curriki.org"> Curriki</a>
          </p>
        </div>
      </div>
      {help && <Help />}
    </div>
  );
}

App.propTypes = {
  // isLoading: PropTypes.bool.isRequired,
  getUser: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  getUser: (data) => dispatch(getUserAction(data)),
});

const mapStateToProps = (state) => ({
  isLoading: state.auth.isLoading,
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
