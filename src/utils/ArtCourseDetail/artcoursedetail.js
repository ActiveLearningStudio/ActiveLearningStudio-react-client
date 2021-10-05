/*eslint-disable*/
import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import "./artcoursedetail.scss";
import ArtCourseImage from "assets/images/artcourseimg.png";
import HeadingThree from "utils/HeadingThree/headingthree";
import HeadingText from "utils/HeadingText/headingtext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faExternalLinkAlt,
  faShareAlt,
  faEye,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";

const ArtCourseDetail = ({ className }) => {
  const currikiUtility = classNames("curriki-utility-artcourse", className);
  return (
    <div className={currikiUtility}>
      <div className="artcourse-img">
        <img src={ArtCourseImage} alt="ArtCourseImage" />
      </div>
      <div className="artcourse-detail">
        <HeadingThree text="Description" color="#084892" />
        <HeadingText
          text="Ed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur."
          color="#515151"
          className="artcourse-description"
        />
        <div className="artcourse-links-icons">
          <div className="link-icons">
            <a href="#" className="artcourse_link">
              <FontAwesomeIcon
                icon={faExternalLinkAlt}
                className="artcourse-icon"
              />
              Share project
            </a>
            <a href="#" className="artcourse_link">
              <FontAwesomeIcon icon={faEye} className="artcourse-icon" />
              Preview
            </a>
            <a href="#" className="artcourse_link">
              <FontAwesomeIcon icon={faTrashAlt} className="artcourse-icon" />
              Delete
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
ArtCourseDetail.propTypes = {
  className: PropTypes.string,
};
export default ArtCourseDetail;
