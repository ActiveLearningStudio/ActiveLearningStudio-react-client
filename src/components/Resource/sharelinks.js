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
      <a class="test" tabindex="-1" href="#">
        <i className="fa fa-share" aria-hidden="true"></i> Send To
      </a>
      <ul class="dropdown-menu check">
        {allLms.sharevendoes &&
          allLms.sharevendoes.map((data) => {
            return (
              <>
                <li>
                  <a
                    onClick={() => {
                      ShareLMS(
                        playlistID,
                        data.lms_access_token,
                        data.site_name.toLowerCase()
                      );
                    }}
                  >
                    {data.site_name}
                  </a>
                </li>
              </>
            );
          })}
      </ul>
    </li>
  );
}
