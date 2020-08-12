import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadMyProjectsActionPreviewShared } from "../actions/project";
import LtiSharedProject from "../components/ltiSharedProject";

export default function LTIProjectShared(props) {
  const [allproject, setAllproject] = useState(null);
  const dispatch = useDispatch();
  const selectedProject = useSelector((state) => {
    return state;
  });
  useEffect(() => {
    dispatch(loadMyProjectsActionPreviewShared(props.match.params.projectid));
  }, []);
  useEffect(() => {
    selectedProject.project.projectSelect &&
      setAllproject(selectedProject.project.projectSelect);
    console.log(allproject);
  }, [selectedProject]);
  return (
    <div>
      {!!allproject && !!allproject.playlists && (
        <LtiSharedProject
          playlistid={
            !!allproject.playlists &&
            allproject.playlists.length > 0 &&
            allproject.playlists[0]._id
          }
          showlti={true}
        />
      )}
    </div>
  );
}
