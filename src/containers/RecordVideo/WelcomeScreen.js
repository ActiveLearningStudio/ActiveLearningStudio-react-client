/* eslint-disable import/order */
import React from 'react';
import { useSelector } from 'react-redux';
import HelpRecSmSvg from 'iconLibrary/mainContainer/HelpRecSmSvg';
import LoginRecSMSvg from 'iconLibrary/mainContainer/LoginRecSMSvg';
import Image1 from '../../assets/images/record_1.png';
import Image2 from '../../assets/images/record_2.png';
import { getGlobalColor } from 'containers/App/DynamicBrandingApply';

const WelcomeScreen = () => {
  const { user } = useSelector((state) => state.auth);
  const primaryColor = getGlobalColor('--main-primary-color');
  return (
    <div className="komodo-lib">
      <div className="komodo-lib-left">
        <h2>Hello!</h2>
        <h3>Now you can record a video via Komodo</h3>
        <div className="lib-left-detail">
          <p>Komodo helps you collaborate faster and share your ideas with people without the need to type lots of text, and scheduling online meetings.</p>
          <div className="sub-two">
            <p>Learn more about Komodo &nbsp; </p>
            <a href="#">here</a>
          </div>
        </div>
      </div>
      <div className="komodo-lib-right">
        <div className="lib-right-div mb-90">
          <div>
            <img src={Image1} alt="Image1" />
          </div>
          <div className="lib-div-inner">
            <h3>Get started</h3>
            <p>Link Komodo features to your CurrikiStudio account and start creating.</p>
            {/* <button>
              <LoginRecSMSvg primaryColor={primaryColor} />
              Log in / Sign up

            </button> */}
            <a className="anchor-btn" target="_blank" href={`https://komododecks.com/login?partnerId=curriki&trackId=${user?.email}`} rel="noreferrer">
              <LoginRecSMSvg primaryColor={primaryColor} />
              Log in / Sign up
            </a>
          </div>
        </div>
        <div className="lib-right-div">
          <div>
            <img src={Image2} alt="Image1" />
          </div>
          <div className="lib-div-inner">
            <h3>How it works</h3>
            <ol className="lib-div-inner-ul">
              <li>
                <p>Record your screen, Cam and talk about whatever you want. </p>
              </li>
              <li>
                <p>Once you finish your recording, copy the link and share it.</p>
              </li>
            </ol>
            {/* <button>
              <HelpRecSmSvg primaryColor={primaryColor} />
              Learn more
            </button> */}
            <a className="anchor-btn" target="_blank" href="https://komododecks.com" rel="noreferrer">
              <HelpRecSmSvg primaryColor={primaryColor} />
              Learn more
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;
