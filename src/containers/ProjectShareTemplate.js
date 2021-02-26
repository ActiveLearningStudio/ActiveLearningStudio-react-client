/*eslint-disable */
import React, { useEffect, useState } from "react";
import { Navbar, Nav, Alert } from "react-bootstrap";
import Slider from "react-slick";
import { loginAction } from "store/actions/auth";
import { useDispatch } from "react-redux";
import shareProjectsService from "services/project.service";
import VivensityLogo from "assets/images/vivensity.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import validator from 'validator';
import { connect } from 'react-redux';
import loader from 'assets/images/loader.svg';
import Error from "./Auth/Error";

function ProjectShareTemplate(props) {
  const sliderSettings = {
    dots: false,
    arrows: true,
    autoplay: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    infinite: false,
    centerMode: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
        
         
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  const dispatch = useDispatch();
  const [allProjects, setAllProject] = useState([]);
  const [errorShow, setErrorShow] = useState(false);
  const [passwordCheck, setPasswordCheck] = useState(false)
  const [password, setPassword] = useState('')
  const [error,setError] = useState(null)
  const { isLoading } = props;
  const onChangePasswordField = ({target}) => {
    setPassword(target.value);
  };
  const isDisabled = () => {
   
    return validator.isEmpty(password.trim());
  };
  const onSubmit =(event)=>{
    event.preventDefault();
    if(password===process.env.REACT_APP_SHARED_PROJECT_DEMO_PASS){
      setPasswordCheck(true);
    } else {
      setError('Please enter valid password');
    }
  }
  useEffect(async () => {
    if (!localStorage.auth_token) {
      await dispatch(
        loginAction({
          email: process.env.REACT_APP_SHARED_PROJECT_DEMO_USER,
          password: process.env.REACT_APP_SHARED_PROJECT_DEMO_PASS,
        })
      );
    }
    const shareResult = await shareProjectsService.shareProjects(726);
    setAllProject(shareResult.projects);
    if (shareResult.projects.length == 0) {
      setErrorShow(true);
    }
  }, []);

  return (
    passwordCheck ? 
    <div className="shared-template">
      <Navbar bg="light" expand="lg">
        <img className="bg-img1" src={VivensityLogo} alt="" />
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link target="_blank" href="https://www.curriki.org/">
              CurrikiStudio
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <div className="custom-container responsive">
     
        
        <Slider {...sliderSettings}>
          {allProjects.map((index) => {
            return <div>
                <a
                  target="_blank"
                  rel="noreferrer"
                  href={`/project/${index.id}/secure/shared`}
                >
                  <div className="box">
                    <div
                      className="bg-img"
                      style={{
                        backgroundImage:
                          !!index.thumb_url &&
                          index.thumb_url.includes("pexels.com")
                            ? `url(${index.thumb_url})`
                            : `url(${global.config.resourceUrl}${index.thumb_url})`,
                      }}
                    />
                    <h1>{index.name}</h1>
                  </div>
                </a>
              </div>
            
          })}
        </Slider>
        <p className="text-sup">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum.
        </p>

        {errorShow && <Alert variant={"danger"}>No Projects Found</Alert>}
        <div className="flex-shared-slider">
          {allProjects.map((index) => {
            return (
              <div className="boxer">
                {" "}
                <a
                  target="_blank"
                  rel="noreferrer"
                  href={`/project/${index.id}/secure/shared`}
                >
                  <div className="bax">
                    <div
                      className="bg-img"
                      style={{
                        backgroundImage:
                          !!index.thumb_url &&
                          index.thumb_url.includes("pexels.com")
                            ? `url(${index.thumb_url})`
                            : `url(${global.config.resourceUrl}${index.thumb_url})`,
                      }}
                    />
                    <h1>{index.name}</h1>
                    <h2>
                      Created At: <span>{index.created_at}</span>{" "}
                    </h2>
                    <p>{index.description.slice(0, 150)}...</p>
                  </div>
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </div>
      : <div style={{ backgroundColor: "white" }}>
        <div className="auth-page">
          <div className="auth-container">
            Enter Password to access this page:
            <form
              onSubmit={onSubmit}
              autoComplete="off"
              className="auth-form"
            >
              <div className="form-group" style={{ margin: "auto" }}>
                <FontAwesomeIcon icon="lock" />
                <input
                  className="password-box"
                  type="password"
                  name="password"
                  placeholder="Password*"
                  required
                  value={password}
                  onChange={onChangePasswordField}
                />
                &nbsp;
              </div> 
              
              <Error error={error}/>

              <div className="form-group">
                &nbsp;
                <button
                  type="submit"
                  className="btn btn-primary submit"
                  disabled={isLoading || isDisabled()}
                >
                  {isLoading ? (
                    <img src={loader} alt="" />
                  ) : (
                      'Submit'
                    )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
  );
}
const mapStateToProps = (state) => ({
  isLoading: state.auth.isLoading,
});
export default connect(mapStateToProps,null)(ProjectShareTemplate);
