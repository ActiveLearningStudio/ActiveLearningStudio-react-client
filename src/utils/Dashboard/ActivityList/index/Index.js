/* eslint-disable */
import React from "react";
import Tabview from "../../../tabview/Tabview";
import CodeSnippet from "!!raw-loader!../../../../containers/Dashboard/index";
import Stylesheetused from "!!raw-loader!../../../../containers/Dashboard/styles.scss";
import StoreSnippet from "!!raw-loader!../../../../store/actions/metrics";
import ApiSnippet from "!!raw-loader!../../../../services/metrics.service";
export const Index = () => {
  return (
    <>
      <Tabview
        componentName="Index"
        path="\src\containers\Dashboard\index.js"
        description="This is the Description of Compoennt"
        codeSnippet={CodeSnippet}
        libraryUsed={[
          "react-redux",
          "prop-types",
          "swal",
          "react-fontawesome",
          "recharts",
          "react-bootstrap",
        ]}
        customHooks={[
          {
            name: "/src/containers/Dashboard/SlideModal/index",
            url: "www.google.com",
          },
          { name: "/src/components/Footer/index", url: "www.google.com" },
        ]}
        reduxStore={[
          { path: "/src/store/actions/metrics", pathCode: StoreSnippet },
        ]}
        apiUsed={[
          { path: "/src/services/metrics.service", apicode: ApiSnippet },
        ]}
        images=""
        stylesheetUsed={Stylesheetused}
        example="https://dev.currikistudio.org/org/currikistudio"
      />
    </>
  );
};
