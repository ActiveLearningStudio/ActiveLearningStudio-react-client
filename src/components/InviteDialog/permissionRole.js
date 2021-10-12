/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { Formik } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { Dropdown } from 'react-bootstrap';
import loader from 'assets/images/dotsloader.gif';

import authService from 'services/auth.service';
import teamService from 'services/team.service';
import { AddTeamRoles } from 'store/actions/team'

export default function AddMember(props) {
	const {
		setAllUsersAdded,
		allUsersAdded,
		setFieldValueProps,
		setToggleAdminDropdown,
		method,
	} = props;
	const dispatch = useDispatch();
	const stateOrg = useSelector((state) => state.organization);
	const { roles } = useSelector((state) => state.team);
	const [stateOrgUsers, setStateOrgUsers] = useState([]);
	const [loaderImgUser, setLoaderImgUser] = useState(false);
	const [roleUser, setRoleUser] = useState([]);
	const [allDataSelected, setAllDataSelected ] = useState([]);

	useEffect(() => {
		setRoleUser(roles);
	}, [roles]);

	useEffect(() => {
		dispatch(AddTeamRoles(stateOrg.currentOrganization.id))
	}, [])
	return (
		<div className="add-user-organization">
			<Formik
				initialValues={{
					name: '',
					userInfo: {},
					role: ""
				}}
				validate={(values) => {
					const errors = {};
					if (!values.name) {
						errors.name = 'Required';
					}

					return errors;
				}}
				onSubmit={(values) => {
					const combine = {
						organization_id: stateOrg.currentOrganization.id,
						user_id: values.userInfo.id,
					};

					const result = teamService.checkUserBeforeAdd(stateOrg.currentOrganization.id, combine)
					result.then((data) => {
						if (data.invited) {
							setAllDataSelected([{
								role_id:values.role,
								
							},...allDataSelected])
						}
					});
				}}
			>
				{({
					values,
					errors,
					touched,
					handleChange,
					handleBlur,
					handleSubmit,
					setFieldValue,
					/* and other goodies */
				}) => (
					<form onSubmit={handleSubmit}>
						<div className="form-group-create">
							<h3>Search Admin</h3>
							<input
								type="text"
								name="name"
								autoComplete="off"
								onChange={async (e) => {
									setFieldValue('name', e.target.value);
									setFieldValue('email', '');
									setLoaderImgUser(true);
									const result = authService.searchUsers(e.target.value);
									result.then((data) => {
										console.log(data);
										setLoaderImgUser(false);
										setStateOrgUsers(data.users);
									});
								}}
								onBlur={handleBlur}
								value={values.name}
							/>
							{loaderImgUser && <img src={loader} alt="" className="loader" />}
							{stateOrgUsers?.length > 0 && (
								<ul className="all-users-list">
									{stateOrgUsers?.map((user) => (
										<li
											value={user}
											onClick={() => {
												setFieldValue('name', user.first_name);
												setFieldValue('userInfo', user);
												setStateOrgUsers([]);
											}}
										>
											{user.first_name}
											<p>
												Email:
												&nbsp;
												{user.email}
											</p>
										</li>
									))}
								</ul>
							)}
							<div className="error">
								{errors.name && touched.name && errors.name}
							</div>
						</div>

						<div className="">
							<select
								
								name="role"
								autoComplete="off"
								onChange={ (e) => {
									setFieldValue('role', e.target.value);
							}}
							onBlur={handleBlur}
							value={values.name}
							>
								{roleUser?.map((roletype) => (
									<option value={roletype.id}>
										{roletype.name}
									</option>
								))}

							</select>
						</div>

						<div className="btn-group">
							<button className="submit-create" type="submit">
								Add
							</button>

						</div>
					</form>
				)}
			</Formik>
		</div>
	);
}

AddMember.propTypes = {
	setAllUsersAdded: PropTypes.func.isRequired,
	allUsersAdded: PropTypes.array.isRequired,
	setFieldValueProps: PropTypes.func.isRequired,
	method: PropTypes.string.isRequired,
	setToggleAdminDropdown: PropTypes.func.isRequired,
};
