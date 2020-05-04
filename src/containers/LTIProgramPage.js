import React from "react";
import { connect } from "react-redux";

import { withRouter } from 'react-router-dom';



export class LTIProgramPage extends React.Component {
  constructor(props) {
    super(props);
  }
 

  componentDidMount() {
    //scroll to top
    window.scrollTo(0, 0);
  }

  
  render() {
    return (
      <h1>Program {this.props.match.params.id}</h1>
    );
  }
}

const mapDispatchToProps = dispatch => ({
});

const mapStateToProps = (state) => {
  return {
    
  };
}




export default withRouter(connect(mapStateToProps,
  mapDispatchToProps)(LTIProgramPage))