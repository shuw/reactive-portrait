import React from 'react';
import PropTypes from "prop-types";
import Snippet from "./Snippet";
import StateMachine from "../logic/StateMachine"

// TODO
// * Add state for time tick

export default class ReactivePortrait extends React.Component {
  static propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
  };

  constructor(props) {
    super(props);
    this._stateMachine = new StateMachine('idle');

    window.setInterval(this.tick, 50);

    this.state = {
      stateMachine: this._stateMachine,
      portraitName: this._stateMachine.getState(),
    };
  }

  tick = () => {
    this.updatePortraitName('tick');
  }

  onMouseEnter = () => {
    this.updatePortraitName('mouseEnter');
  }

  updatePortraitName(transition) {
    var name = this._stateMachine.getNewState(transition);
    if (name === this.state.portraitName) {
      return;
    }
    console.log('New Portrait Name: ' + name);
    this.setState({ portraitName: name });
  }

  render() {
    console.log('Re rendering: ' + this.state.portraitState)
    return (
      <div onMouseEnter={this.onMouseEnter}>
        <Snippet width={this.props.width} height={this.props.height} name={this.state.portraitName} />
      </div>
    );
  }
}
