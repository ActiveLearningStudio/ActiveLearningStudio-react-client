/*eslint-disable*/
import React, { useState } from "react";
import TabsHeading from "utils/Tabs/tabs";
import { CopyBlock, dracula } from "react-code-blocks";

const ManifestDetail = () => {
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
        <TabsHeading text="1. Metadata" className="ml-10" />
        <TabsHeading text="2. Manifest" tabActive />
        <TabsHeading text="3. License" className="ml-10" />
      </div>

      <div className="">
        <CopyBlock
          language={language}
          text={languageDemo}
          showLineNumbers={lineNumbers}
          theme={dracula}
          wrapLines={true}
          codeBlock
        />
      </div>
    </div>
  );
};

export default ManifestDetail;
