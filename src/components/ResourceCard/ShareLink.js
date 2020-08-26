import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { ShareLMS } from 'store/actions/project';

function ShareLink(props) {
  const { playlistId, playlistName, projectName } = props;

  const AllLms = useSelector((state) => state.defaultShareState);

  const [allLms, setAllLms] = useState([]);
  useEffect(() => {
    setAllLms(AllLms);
  }, [AllLms]);

  return (
    <li className="dropdown-submenu send">
      <a
        className="test"
        tabIndex="-1"
        onClick={() => {
          if (allLms.shareVendors && allLms.shareVendors.length === 0) {
            Swal.fire({
              icon: 'info',
              // eslint-disable-next-line max-len
              title: "You don't have a Learning Management Systems set up for publishing. Please contact us to get this configured.",
            });
          }
        }}
      >
        <FontAwesomeIcon icon="newspaper" className="mr-2" />
        Publish
      </a>

      <ul className="dropdown-menu check">
        {allLms.shareVendors && allLms.shareVendors.map((data) => (
          <li key={data._id}>
            <a
              onClick={async () => {
                ShareLMS(
                  playlistId,
                  data._id,
                  data.lms_name.toLowerCase(),
                  data.lms_url,
                  playlistName,
                  projectName,
                );
              }}
            >
              {data.description}
            </a>
          </li>
        ))}
      </ul>
    </li>
  );
}

ShareLink.propTypes = {
  playlistId: PropTypes.number.isRequired,
  playlistName: PropTypes.string.isRequired,
  projectName: PropTypes.string.isRequired,
};

export default ShareLink;
