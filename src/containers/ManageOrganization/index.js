import Footer from 'components/Footer';
import React, { useState } from 'react';
import childOrgIcon from 'assets/images/child-organization-tag.png';
import childOrgImage from 'assets/images/child-organization-image.png';
import './style.scss';
import { Link } from 'react-router-dom';
import Circle from 'components/Circle/index';

export default function ManageOrganizations() {
  const [toggleInvite, settoggleInvite] = useState(false);
  return (
    <>
      <div className="content-wrapper">
        <div className="content">
          <div className="parent-organization-tag">
            Parent organization: Nevada
          </div>
          <div className="organization-container">
            <img className="child-organization-icon" src={childOrgIcon} alt="child-organization-icon" />
            <h1 className="child-organization-name">Lake Valley Education District</h1>
            <Link className="back-button" to="/"> Back to My Projects </Link>
          </div>
          <div className="organization-container organization-list ">
            <img className="child-organization-image" src={childOrgImage} alt="org-img" />
            <div className=" col-6">
              <div className="description">
                Description
              </div>
              <div className="content-data">
                Ed ut perspiciatis unde omnis
                iste natus error sit voluptatem accusantium
                doloremque laudantium, totam rem aperiam,
                eaque ipsa quae ab illo inventore veritatis
                et quasi architecto beatae vitae dicta sunt explicabo.
                Nemo enim ipsam voluptatem quia voluptas sit aspernatur.
              </div>
              <div className="role">My Role: Admin</div>
            </div>
            <div className="col-6">
              <button className="sub-organization-button" type="button">
                <div className="button-text"> New Sub-organization </div>
              </button>
              <button className="invite-button" type="button" onClick={() => settoggleInvite(true)}>
                <div className="invite-button-text">Invite Admin</div>
              </button>
              {toggleInvite
                ? (
                  <div className="invite-block">
                    <div className="name">Name</div>
                    <input className="name-field" placeholder="Enter Name" />
                    <div className="email">Email</div>
                    <input className="email-field" placeholder="Enter Email" />
                    <button className="send-invite-button" type="button">
                      <div className="send-invite-button-text">
                        Send Invitation
                      </div>
                    </button>
                    <button className="cancel-button" type="button" onClick={() => settoggleInvite(false)}>
                      <div className="cancel-button-text">
                        Cancel
                      </div>
                    </button>
                  </div>
                )
                : <></>}
            </div>
          </div>
          <Circle number={100} text="Organization" />
          <Circle number={30} text="Users" />
          <Circle number={5} text="Groups" />
          <Circle number={50} text="Projects" />
        </div>
      </div>
      <Footer />
    </>
  );
}
