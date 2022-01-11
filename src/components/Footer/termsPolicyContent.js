import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

export default function TermsPolicyContent(props) {
  const organization = useSelector((state) => state.organization);
  const { currentOrganization } = organization;
  const [content, setContent] = useState('No content found!');

  const { match } = props;

  useEffect(() => {
    const contentType = match.params.content;
    if (contentType === 'tos_content') {
      setContent(currentOrganization?.tos_content);
    } else if (contentType === 'privacy_policy_content') {
      setContent(currentOrganization?.privacy_policy_content);
    }
  });

  return (
    <div className="terms-policy-container" dangerouslySetInnerHTML={{ __html: content }} />
    );
}

TermsPolicyContent.propTypes = {
  match: PropTypes.object.isRequired,
};
