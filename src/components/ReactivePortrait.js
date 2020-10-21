import React from "react";
import PropTypes from "prop-types";
import StateMachine from "../logic/StateMachine";
import SnippetTransition from "./SnippetTransition";

// TODO
// * Add support for multiple videos for each state
// * Add transitions states back to idle
// * Add ideal transition points within videos (in state machine)
// * Add click handler (maybe navigate to public site)
export default class ReactivePortrait extends React.Component {
  static propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
  };

  constructor(props) {
    super(props);
    this._stateMachine = new StateMachine("idle");

    window.setInterval(this.tick, 50);

    this.state = {
      stateMachine: this._stateMachine,
      snippetName: this._stateMachine.getState(),
      newSnippetName: null,
    };
  }

  tick = () => {
    this.updatePortraitName("tick");
  };

  onMouseEnter = () => {
    this.updatePortraitName("mouseEnter");
  };

  updatePortraitName(transition) {
    var newName = this._stateMachine.getNewState(transition);
    if (
      newName === this.state.snippetName ||
      newName === this.state.newSnippetName
    ) {
      return;
    }
    console.log("New Portrait Name: " + newName);
    this.setState({ newSnippetName: newName });
  }

  render() {
    return (
      <div
        onMouseEnter={this.onMouseEnter}
        style={{
          position: "relative",
          width: this.props.width,
          height: this.props.height,
        }}
      >
        <SnippetTransition
          width={this.props.width}
          height={this.props.height}
          name={this.state.snippetName}
          newName={this.state.newSnippetName}
        />
      </div>
    );
  }
}
