/* eslint-disable */
import React, { useEffect, useRef } from 'react';
import { withRouter } from 'react-router-dom';
import { useDispatch, connect } from 'react-redux';
import QueryString from 'query-string';
import { Alert } from 'react-bootstrap';
import { getWordpressSSODefaultSettingsAction, WordpressSSOLoginAction } from 'store/actions/auth';
import Buttons from 'utils/Buttons/buttons';
import Logo from './Logo';
import './style.scss';


function WordpressSSO(props) {
	const { error, settings } = props;
  const { clientid, code, state } = QueryString.parse(window.location.search);
  const form = useRef(null);
  const dispatch = useDispatch();
  
  useEffect(() => {
    if (!code) return dispatch(getWordpressSSODefaultSettingsAction(clientid));

    dispatch(WordpressSSOLoginAction(code, state)).then(() => window.location = window.location.host);
  }, [code]);

  useEffect(() => {
    if (settings === null || form.current === null) return;

    form.current.submit();
  }, [settings]);

	return (
		<div className="auth-page">
			<Logo />
			<div className="auth-container">
        {code && (
          <h1 className="auth-title">Logging you in...</h1>
        )}
        {!code && (
          <>
            <h1 className="auth-title">Welcome To CurrikiStudio</h1>
            {settings && (
              <div className="text-center mt-3">
                <form action={`${settings.lms_url}/authorize`} method="GET" ref={form}>
                  <input type="hidden" name="state" value={clientid} />
                  <input type="hidden" name="scope" value="basic" />
                  <input type="hidden" name="response_type" value="code" />
                  <input type="hidden" name="redirect_url" value={settings.lms_access_token} />
                  <input type="hidden" name="client_id" value={clientid} />
                  <Buttons
                    text="Login with Wordpress"
                    primary
                    type="submit"
                  />
                </form>
              </div>
            )}
          </>
        )}
        {error && <Alert className="mt-3" variant='danger'>{error}</Alert>}
			</div>
		</div>
	);
}

const mapStateToProps = (state) => ({
  error: state.auth.wpSSOError,
  settings: state.auth.wpSSOSettings,
});

export default withRouter(connect(mapStateToProps)(WordpressSSO));