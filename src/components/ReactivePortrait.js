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
    this.stateMachine = new StateMachine(ReactivePortrait.defaultSnippet);
    this.rootRef = React.createRef();

    this.state = {
      stateMachine: this.stateMachine,
      snippetName: this.stateMachine.getState(),
      newSnippetName: this.stateMachine.getState(),
    };
  }

  componentDidMount() {
    this._timer = window.setInterval(this.tick50Ms, 100);
    window.addEventListener("mousemove", this.onMouseMove);
  }

  componentWillUnmount() {
    window.clearInterval(this._timer);
  }

  tick50Ms = () => {
    this.updateStateMachine("tick50Ms");
  };

  onMouseMove = (event) => {
    if (!this.rootRef.current) {
      return;
    }

    const rect = this.rootRef.current.getBoundingClientRect();
    const centerX = rect.x + Math.round(rect.width / 2);
    const centerY = rect.y + Math.round(rect.height / 2);

    const offsetX = event.clientX - centerX;
    const offsetY = event.clientY - centerY;

    var angle, side;
    if (offsetX > 0) {
      angle = Math.atan((-1 * offsetY) / offsetX) * (180 / Math.PI);
      side = "Right";
    } else {
      angle = Math.atan(offsetY / offsetX) * (180 / Math.PI);
      side = "Left";
    }

    // 8 directions: up, upperLeft, upperRight, left, right, lowerLeft, lowerRight, down
    var direction;
    if (angle > 67.5) {
      direction = "Up";
    } else if (angle > 22.5) {
      direction = "Upper" + side;
    } else if (angle > -22.5) {
      direction = side;
    } else if (angle > -67.5) {
      direction = "Lower" + side;
    } else {
      direction = "Down";
    }
    this.updateStateMachine("mouse" + direction);
  };

  onMouseEnter = () => {
    this.updateStateMachine("mouseEnter");
  };

  updateStateMachine(transition) {
    var newName = this.stateMachine.getNewState(transition);
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
        ref={this.rootRef}
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
