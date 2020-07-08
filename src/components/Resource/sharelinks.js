import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ShareLMS } from "../../actions/project";
export default function Sharelink({ playlistID }) {
  const All_Lms = useSelector((state) => state.defaultsharestate);
  console.log(All_Lms);
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
              title: "No LMS is available for this playlist.",
            });
          }
        }}
      >
        <i className="fa fa-share" aria-hidden="true"></i> Send To
      </a>
      <ul class="dropdown-menu check">
        {allLms.sharevendoes &&
          allLms.sharevendoes.map((data) => {
            return (
              <>
                <li>
                  <a
                    onClick={async () => {
                      ShareLMS(
                        playlistID,
                        data._id,
                        data.lms_name.toLowerCase(),
                        data.lms_url
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
