/* eslint-disable */
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import QueryString from 'query-string';
import { withRouter } from 'react-router-dom';
import Swal from 'sweetalert2';
import { CanvasSSOLoginAction } from 'store/actions/auth';
import Logo from './Logo';
import './style.scss';

function _base64ToArray(base64String){
  let resulted_arr = [];
  let decoded_val = atob(base64String).split('&');
  if(decoded_val.length > 0) {
    for (let i = 0; i < decoded_val.length; i++) {
      let spliting_val = decoded_val[i].split('=');
      resulted_arr[spliting_val[0]]=spliting_val[1];
    }
  }
  return resulted_arr;
}
function CanvasLtiSSO(props) {
	const { history } = props;
	const dispatch = useDispatch();
	useEffect(() => {
		(async () => {
			const query = QueryString.parse(window.location.search);
      const sso_info_arr = _base64ToArray(query.sso_info);
			if (query.sso_info) {
				const result = dispatch(CanvasSSOLoginAction({ sso_info: query.sso_info }));
				result.then((data) => {
          const domain = data.user.user_organization;
          if(typeof sso_info_arr['redirect'] !== "undefined" && sso_info_arr['redirect'] === "independent_activity"){
            history.push(`/org/${domain?.domain}/activities`);
          }
          else {
				  	history.push('/');
          }
				}).catch((err) => {
                    Swal.fire({
						icon:'error',
						title:"Failed to login!",
						html:err.errors[0]
					})
				})
			}
		})();
	}, []);
	return (
		<div className="auth-page">
			<Logo />
			<div className="auth-container">
				<h1 className="auth-title">Redirecting To CurrikiStudio</h1>
				<h3 className="auth-description">
					Loading .... please wait
				</h3>
			</div>
		</div>
	);
}

CanvasLtiSSO.propTypes = {
	history: PropTypes.object.isRequired,
};

export default withRouter(CanvasLtiSSO);
