/* eslint-disable */
import React from "react";
import Tabview from "../../tabview/Tabview";
import IndexSnippet from "!!raw-loader!../../../containers/Search/index";
import Searchimg from "./search.png";
import IndexStore from "!!raw-loader!../../../store/actions/search";
import IndexStyle from "!!raw-loader!../../../containers/Search/style.scss";
export const Index = () => {
  return (
    <>
      <Tabview
        componentName="Index"
        path="\src\containers\Search\index.js"
        description="As this is the component of search results. 
    You will see results related to your search string which you will enter. 
    There is a sidebar on the left where you can refine your search by switching 
    to your project, subject, education level, and type of activity. When you refine
     through the sidebar then you will find the projects on the right column according
      to the search string. You will see a tab for projects, playlists, and activities. 
      When you click one of these tabs then 
    information related to the perspective tab will be shown below."
        codeSnippet={IndexSnippet}
        libraryUsed={[
          "prop-types",
          "react-js-pagination",
          "react-redux",
          "react-fontawesome",
          "react-bootstrap",
        ]}
        customHooks={[
          {
            name: "/src/components/ResourceCard/AddResource/dropdownData",
            url:
              "?path=/story/component-resourcecard-resourcecarddropdown--component",
          },
          { name: "/src/containers/Search/CloneModel", url: "" },
          {
            name: "/src/components/Footer/index",
            url: "?path=/story/component-footer-index--component",
          },
        ]}
        //customHooks={['./formik/createOrg','removeActiveAdminForm']}
        reduxStore={[
          { path: "/src/store/actions/search", pathCode: IndexStore },
        ]}
        apiUsed={[]}
        images={Searchimg}
        stylesheetUsed={IndexStyle}
        example="https://dev.currikistudio.org/org/currikistudio/search?q=project&type=private&grade=&education=&h5p="
      />
    </>
  );
};
