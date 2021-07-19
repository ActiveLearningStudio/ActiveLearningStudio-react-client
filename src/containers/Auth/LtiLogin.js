/* eslint-disable */
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import QueryString from 'query-string';
import { withRouter } from 'react-router-dom';
import Swal from 'sweetalert2';
import { SSOLoginAction } from 'store/actions/auth';
import Logo from './Logo';
import './style.scss';

function LtiSSO(props) {
	const { history } = props;
	const dispatch = useDispatch();
	useEffect(() => {
		(async () => {
			if (!localStorage.getItem('auth_token')) {
				const query = QueryString.parse(window.location.search);
				const result = dispatch(SSOLoginAction({ sso_info: query.sso_info }));
				result.then(() => {
					history.push('/org/currikistudio');
				}).catch((err) => {
                    Swal.fire({
						icon:'error',
						title:"please refresh your page with valid key",
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

LtiSSO.propTypes = {
	history: PropTypes.object.isRequired,
};

export default withRouter(LtiSSO);
