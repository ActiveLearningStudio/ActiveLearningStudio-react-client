/* eslint-disable */
import logo from 'assets/images/studio_new_logo_small.png';
import './adminGrantMessageStyle.scss';

const AdminGrantMessage = ({adminUrl, doLogin}) => {
  return (
    <div className="msteam-admin-grant-message">
      <img src={logo} alt="Curriki Studio logo" />
      <p>The Curriki Studio application for Microsoft Teams requires this organization's administrator to grant certain permissions. If you're an administrator, please click the authorize button to proceed.</p>
      <button className="btn btn-primary mt-2" onClick={doLogin}>Authorize</button>
      <p>If you're not an administrator, please copy the following authorization URL and send it to your organization's administrator.</p>
      <div>
        <input type="text" value={adminUrl} readOnly />
      </div>
    </div>
  );
};

export default AdminGrantMessage;
