/* eslint-disable */
import React from 'react';
import Tabview from '../../tabview/Tabview';
import CodeSnippet from '!!raw-loader!../../../components/ActivityCard/index';
import Stylesheetused from '!!raw-loader!../../../components/ActivityCard/style.scss';
import Screenshot from './activityCard.png';
export const ActivityCard = () => {
  return (
    <>
      <Tabview
        componentName="ActivityCard"
        path="\src\components\ActivityCard\index.js"
        description="This component is used to display the list of activities in the playlist module.
         In the list, you will see a card for every activity where you will see the title of the activity
          and one dropdown to perform quick action on the activity. Through these actions, you can remove, 
          preview, and edit activities attach to the playlist."
        codeSnippet={CodeSnippet}
        libraryUsed={['prop-types', 'react-router-dom', 'react-redux']}
        customHooks={[
          {
            name: '/src/components/ResourceCard/ResourceCardDropdown',
            url: '?path=/story/component-resourcecard-resourcecarddropdown--component',
          },
        ]}
        reduxStore={[]}
        apiUsed={[]}
        images={Screenshot}
        stylesheetUsed={Stylesheetused}
        example="https://dev.currikistudio.org/org/testsuborg/project/6091/preview"
      />
    </>
  );
};
