/*eslint-disable*/
import React from "react";
import TabsHeading from "utils/Tabs/tabs";
// import { CopyBlock } from "react-code-blocks";

const ManifestDetail = () => {
  return (
    <div className="w-100 h-100">
      <div className="add-c2e-form-tabs">
        <TabsHeading text="1. Metadata" tabActive />
        <TabsHeading text="2. Manifest" className="ml-10" />
        <TabsHeading text="3. License" className="ml-10" />
      </div>
    </div>
  );
};

export default ManifestDetail;
