import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { getBranding } from 'store/actions/organization';

export default function TermsPolicyContent(props) {
  const organization = useSelector((state) => state.organization);
  const { currentOrganization } = organization;
  const [content, setContent] = useState('');
  const dispatch = useDispatch();

  const { match } = props;

  useEffect(() => {
    const contentType = match.params.content;
    const orgDomain = match.params.organization ? match.params.organization : 'currikistudio';
    if (contentType === 'tos_content') {
      setContent(currentOrganization?.tos_content);
    } else if (contentType === 'privacy_policy_content') {
      setContent(currentOrganization?.privacy_policy_content);
    }

    if (!content) {
      dispatch(getBranding(orgDomain));
    }
  });

  return <div className="terms-policy-container" dangerouslySetInnerHTML={{ __html: content }} />;
}

TermsPolicyContent.propTypes = {
  match: PropTypes.object.isRequired,
};
