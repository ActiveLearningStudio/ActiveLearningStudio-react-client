/*eslint-disable*/
import React, { useState } from "react";
import TabsHeading from "utils/Tabs/tabs";
import Buttons from "utils/Buttons/buttons";
import Headings from "curriki-design-system/dist/utils/Headings/headings";
// import { CopyBlock, dracula } from "react-code-blocks";

const ManifestDetail = ({ handleCloseProjectModal, setStape }) => {
  const [language, changeLanguage] = useState("jsx");
  const [languageDemo, changeDemo] = useState(
    `<div>
      <p>Hello</p>
      <button>Say Hello</button>
    </div>`,
  );
  const [lineNumbers, toggleLineNumbers] = useState(true);
  return (
    <div className="w-100 h-100">
      <div className="add-c2e-form-tabs">
        <TabsHeading text="1. Metadata" />
        <TabsHeading text="2. Manifest" tabActive />
        <TabsHeading text="3. License" />
      </div>

      <Headings
        text="C2E Manifest Details"
        headingType="h3"
        color="#084892"
      />

      <div className="">
        {/* <CopyBlock
          language={language}
          text={languageDemo}
          showLineNumbers={lineNumbers}
          theme={dracula}
          wrapLines={true}
          codeBlock
        /> */}

        <div className="d-flex align-items-center justify-content-end">
          <Buttons
            text="Back"
            secondary={true}
            width="auto"
            height="32px"
            hover={true}
            type="button"
            onClick={() => setStape(1)}
          />
          <Buttons
            text="Cancel"
            secondary={true}
            width="auto"
            height="32px"
            onClick={() => handleCloseProjectModal(false)}
            hover={true}
            className="mx-3"
            type="button"
          />
          <Buttons
            text="Save & Next"
            primary={true}
            width="auto"
            height="32px"
            hover={true}
            type="submit"
            onClick={() => setStape(3)}
          />
        </div>
      </div>
    </div>
  );
};

export default ManifestDetail;
