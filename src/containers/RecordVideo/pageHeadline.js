/* eslint-disable */
import React from 'react';
import { useSelector } from 'react-redux';
import Headings from 'curriki-design-system/dist/utils/Headings/headings';
import { getGlobalColor } from 'containers/App/DynamicBrandingApply';
import RecordVideoMdSvg from 'iconLibrary/mainContainer/RecordVideoMdSvg';
import Buttons from 'utils/Buttons/buttons';

export default function PageHeadline() {
  const organization = useSelector((state) => state.organization);
  const { user } = useSelector((state) => state.auth);
  const { permission, currentOrganization } = organization;
  const primaryColor = getGlobalColor('--main-primary-color');
  return (
    <>
      <div className="record-headline">
        <div className="title">
          <Headings text={`${currentOrganization?.name}`} headingType="body2" color="#084892" />
        </div>
        <div className="heading-komodo-ext">
          <div className="heading-image">
            <RecordVideoMdSvg primaryColor={primaryColor} />
            <Headings text="Record a video" headingType="h2" className="record-title-heading" color="#084892" />
          </div>
          {permission?.['Record a Video']?.includes('record-video:edit') && (
            <div className="komodo-ext-btn">
              {/* <Buttons primary text="Add Komodo extension" iconColor="#FF0000" width="auto" height="32px" hover />
               */}
              <iframe width="165" height="55" src={`https://komododecks.com/embed/record?partnerId=curriki&trackId=${user?.email}`} title="Komodo" frameborder="0"></iframe>
            </div>
          )}
        </div>

        <div className="heading-detail">
          <p>Komodo allows you to record your screen and create videos that you can use in Interactive Videos.</p>
        </div>
      </div>
    </>
  );
}
