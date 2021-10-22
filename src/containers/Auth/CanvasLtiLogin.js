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

function CanvasLtiSSO(props) {
	const { history } = props;
	const dispatch = useDispatch();
	useEffect(() => {
		(async () => {
			const query = QueryString.parse(window.location.search);
			if (query.sso_info) {
				const result = dispatch(CanvasSSOLoginAction({ sso_info: query.sso_info }));
				result.then(() => {
					history.push('/');
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
