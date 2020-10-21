import React from 'react';
import PropTypes from "prop-types";
import Snippet from "./Snippet";
import InteractionController from "../controller/InteractionController"


export default class ReactivePortrait extends React.Component {
  static propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
  };

  constructor(props) {
    super(props);
    this.state = {
      controller: new InteractionController(this),
    };
  }

  render() {
    return (
      <div onMouseEnter={this.state.controller.onMouseEnter}>
        <Snippet width={this.props.width} height={this.props.height} name="portrait" />
      </div>
    );
  }
}
