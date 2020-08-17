import React, { useEffect, useState } from "react";

import { ShareLMS } from "../../actions/project";
import Swal from "sweetalert2";
import { useSelector, useDispatch } from "react-redux";
import { getProjectCourseFromLMSPlaylist } from "../../actions/project";
export default function Sharelink({
  playlistID,
  playlistName,
  projectName,
  projectId,
}) {
  const All_Lms = useSelector((state) => state.defaultsharestate);
  const dispatch = useDispatch();
  const [allLms, setAllLms] = useState([]);
  useEffect(() => {
    setAllLms(All_Lms);
  }, [All_Lms]);

  return (
    <li class="dropdown-submenu send">
      <a
        class="test"
        tabindex="-1"
        onClick={() => {
          if (allLms.sharevendoes && allLms.sharevendoes.length == 0) {
            Swal.fire({
              icon: "info",
              title:
                "You don't have a Learning Management Systems set up for publishing. Please contact us to get this configured.",
            });
          }
        }}
      >
        <i className="fa fa-newspaper" aria-hidden="true"></i> Publish
      </a>
      <ul class="dropdown-menu check">
        {allLms.sharevendoes &&
          allLms.sharevendoes.map((data) => {
            return (
              <>
                <li>
                  <a
                    // onClick={async () => {
                    //   ShareLMS(
                    //     playlistID,
                    //     data._id,
                    //     data.lms_name.toLowerCase(),
                    //     data.lms_url,
                    //     playlistName,
                    //     projectName
                    //   );
                    // }}

                    onClick={() => {
                      dispatch(
                        getProjectCourseFromLMSPlaylist(
                          data.lms_name.toLowerCase(),
                          data._id,
                          projectId,
                          playlistID,
                          data.lms_url
                        )
                      );
                    }}
                  >
                    {data.description}
                  </a>
                </li>
              </>
            );
          })}
      </ul>
    </li>
  );
}
