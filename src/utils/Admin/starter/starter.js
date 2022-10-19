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
        description="This is the starter component, which is used to show in admin panel. And it used to show the components modules and also facilitate the update, edit, and delete the modules. "
        codeSnippet={codeSnippet}
        customHooks={[
          { name: './controller', url: '' },
          { name: './table', url: '' },
          { name: './userroles', url: '' },
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
