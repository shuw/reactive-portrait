import React from "react";
import PropTypes from "prop-types";
import StateMachine from "../logic/StateMachine";
import SnippetTransition from "./SnippetTransition";

// TODO
// * Add support for multiple videos for each state
// * Add transitions states back to idle
// * Add ideal transition points within videos (in state machine)
// * Add click handler (maybe navigate to public site)
// * Integrate on frontpage of personal website
export default class ReactivePortrait extends React.Component {
  static defaultSnippet = "idle";

  static propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    onSnippetChanged: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this._stateMachine = new StateMachine(ReactivePortrait.defaultSnippet);

    this.state = {
      stateMachine: this._stateMachine,
      snippetName: this._stateMachine.getState(),
      newSnippetName: this._stateMachine.getState(),
    };
  }

  componentDidMount() {
    this._timer = window.setInterval(this.tick50Ms, 100);
  }

  componentWillUnmount() {
    window.clearInterval(this._timer);
  }

  tick50Ms = () => {
    this.updatePortraitName("tick50Ms");
  };

  onMouseEnter = () => {
    this.updatePortraitName("mouseEnter");
  };

  updatePortraitName(transition) {
    var newName = this._stateMachine.getNewState(transition);
    if (newName === this.state.newSnippetName) {
      return;
    }

    if (this.props.onSnippetChanged) {
      this.props.onSnippetChanged(newName);
    }

    this.setState({
      snippetName: this.state.newSnippetName,
      newSnippetName: newName,
    });
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
