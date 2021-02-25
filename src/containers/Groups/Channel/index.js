import React from 'react';

import './style.scss';

const channelData = [
  'One',
  'Two',
  'Three',
  'Four',
  'Five',
];

function ChannelPanel() {
  return (
    <div className="row channel-manage">
      <div className="group-information">
        <div className="channel-side-bar">
          {channelData.map((channel, index) => (
            <a key={channel} className={index > 0 ? 'border-top' : ''}>
              <h2>{`#Channel-${channel}`}</h2>
            </a>
          ))}
        </div>

        <div className="channel-content">
          <span>3rd Party Chat Tool Here</span>
        </div>
      </div>
    </div>
  );
}

ChannelPanel.propTypes = {
};

export default ChannelPanel;
