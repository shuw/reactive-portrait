import React from 'react';
import PropTypes from "prop-types";
import Snippet from "./Snippet";
import StateMachine from "../logic/StateMachine"

// TODO
// * Add state for time tick

const VIDEO_CROSS_FADE_TIME_MS = 200;

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
      newPortraitName: null,

    };
  }

  tick = () => {
    this.updatePortraitName('tick');
  }

  onMouseEnter = () => {
    this.updatePortraitName('mouseEnter');
  }

  updatePortraitName(transition) {
    var newName = this._stateMachine.getNewState(transition);
    if (newName == this.state.portraitName
      || newName == this.state.newPortraitName) {
      return;
    }
    console.log('New Portrait Name: ' + newName);
    this.setState({ newPortraitName: newName });
  }

  render() {
    console.log('Re rendering: ' + this.state.portraitState)
    return (
      <div onMouseEnter={this.onMouseEnter}
        style={{
          position: 'relative',
          width: this.props.width,
          height: this.props.height
        }}>
        <Snippet width={this.props.width} height={this.props.height} name={this.state.portraitName} />
        {this.state.newPortraitName
          ? <Snippet
            width={this.props.width}
            height={this.props.height}
            name={this.state.newPortraitName} />
          : null}
      </div>
    );
  }
}
