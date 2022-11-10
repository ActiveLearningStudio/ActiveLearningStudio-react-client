/* eslint-disable */
import React from 'react';
import Tabview from '../../../tabview/Tabview';
import SidebarSnippet from '!!raw-loader!../../../../components/Skeletons/projectCard.js';
import SkeletonImg from './skeletons.png';
import SidebarStore from '!!raw-loader!../../../../store/actions/project';
import Stylesheet from '!!raw-loader!../../../../components/Skeletons/style.scss';
export const ProjectCard = () => {
  return (
    <>
      <Tabview
        componentName="ProjectCard Skeleton"
        path="\src\components\Skeletons\projectCard.js"
        description="This component is used for project skeleton. When you intially loads the project page then you will see the project card laoder which is making through this component."
        codeSnippet={SidebarSnippet}
        libraryUsed={['react-loading-skeleton']}
        customHooks={[]}
        //customHooks={['./formik/createOrg','removeActiveAdminForm']}
        reduxStore={[]}
        apiUsed={[]}
        images={SkeletonImg}
        stylesheetUsed={Stylesheet}
        example="https://dev.currikistudio.org/org/currikistudio"
      />
    </>
  );
};
