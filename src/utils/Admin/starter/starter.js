/* eslint-disable */
import React from 'react';
import Tabview from '../../tabview/Tabview';
import codeSnippet from '!!raw-loader!../../../containers/Admin/starter';
import starter from './starter.png';
import Stylesheetused from '!!raw-loader!../../../containers/Admin/style.scss';
export const Starter = () => {
  return (
    <>
      <Tabview
        componentName="Starter"
        path="\src\containers\Admin\starter.js"
        description="This is the starter component, which is used to show in admin panel. And it is also used to show the components modules and also facilitate the update, edit, and delete functionality in admin panel. "
        codeSnippet={codeSnippet}
        customHooks={[
          { name: './controller', url: '?path=/story/admin-controller--component' },
          { name: './table', url: '?path=/story/admin-tables--component' },
          { name: './userroles', url: '?path=/story/admin-userrole--component' },
        ]}
        libraryUsed={['prop-types']}
        apiUsed={[]}
        stylesheetUsed={Stylesheetused}
        images={starter}
        example="https://dev.currikistudio.org/org/currikistudio/admin"
      />
    </>
  );
};
