import React from 'react';
import { connect } from 'react-redux';

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
      <div className="col-md-12">
        <div className="team-information">
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
    </div>
  );
}

ChannelPanel.propTypes = {
};

ChannelPanel.defaultProps = {};

const mapDispatchToProps = () => ({});

const mapStateToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(ChannelPanel);
