import React from "react";
import PropTypes from "prop-types";
import StateMachine from "../logic/StateMachine";
import SnippetTransition from "./SnippetTransition";

const DIRECTION_RADIUS_BUFFER = 0.75;
const MIN_DURATION_BETWEEN_MOUSE_EVENT_MS = 50;

// TODO
// * Incorporate yawn state
// * Incorporate gyro signal
// * Support for delayed state change. Short term memory.
export default class ReactivePortrait extends React.Component {
  static defaultSnippet = "idle";

  static propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    onSnippetChanged: PropTypes.func,
    snippetsMediaPath: PropTypes.string,
    onLoaded: PropTypes.func,
    stateMachineOptions: PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.stateMachine = new StateMachine(
      ReactivePortrait.defaultSnippet,
      props.stateMachineOptions ?? {}
    );
    this.rootRef = React.createRef();
    this.lastMouseEvent = new Date().getTime();
    this.snippetRef = React.createRef();
    this.onLoadedCalled = false;

    this.state = {
      stateMachine: this.stateMachine,
      oldState: this.stateMachine.getState(),
      newState: this.stateMachine.getState(),
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
    this.invokeEvent("tick50Ms");

    if (this.snippetRef.current?.hasFailedToLoad()) {
      this.invokeEvent("failed");
    }

    if (this.snippetRef.current?.isAlmostFinished()) {
      this.invokeEvent("almostFinished");
    }
  };

  onMouseMove = (event) => {
    if (!this.rootRef.current) {
      return;
    }

    const currTime = new Date().getTime();
    const elapsedMs = currTime - this.lastMouseEvent;
    if (elapsedMs < MIN_DURATION_BETWEEN_MOUSE_EVENT_MS) {
      return;
    }
    this.lastMouseEvent = currTime;

    const rect = this.rootRef.current.getBoundingClientRect();
    const centerX = rect.x + Math.round(rect.width / 2);
    const centerY = rect.y + Math.round(rect.height / 2);

    const offsetX = event.clientX - centerX;
    const offsetY = event.clientY - centerY;

    const distance = Math.sqrt(Math.pow(offsetX, 2) + Math.pow(offsetY, 2));

    // ignore directional mouse movements that are too close
    if (distance < rect.width * DIRECTION_RADIUS_BUFFER) {
      return;
    }

    var angle, side;
    if (offsetX > 0) {
      angle = Math.atan((-1 * offsetY) / offsetX) * (180 / Math.PI);
      side = "Right";
    } else {
      angle = Math.atan(offsetY / offsetX) * (180 / Math.PI);
      side = "Left";
    }

    var direction;
    if (angle > 67.5) {
      direction = "Up";
    } else if (angle > 22.5) {
      direction = "Up" + side;
    } else if (angle > -22.5) {
      direction = side;
    } else if (angle > -67.5) {
      direction = "Down" + side;
    } else {
      direction = "Down";
    }

    this.invokeEvent("mouse" + direction);
  };

  onAttention = () => {
    this.invokeEvent("attention");
  };

  invokeEvent(eventName) {
    // console.log("event: " + eventName);

    var newState = this.stateMachine.getNewState(eventName);
    if (newState.name === this.state.newState.name) {
      return;
    }

    if (this.props.onSnippetChanged) {
      this.props.onSnippetChanged(newState.name);
    }

    var oldState = eventName === "failed" ? newState : this.state.newState;

    this.setState({
      oldState: oldState,
      newState: newState,
    });
  }

  onVideoLoaded = () => {
    if (!this.onLoadedCalled) {
      this.onLoadedCalled = true;
    }
    if (this.props.onLoaded) {
      this.props.onLoaded();
    }
  };

  render() {
    return (
      <div
        ref={this.rootRef}
        onMouseEnter={this.onAttention}
        onClick={this.onAttention}
        style={{
          position: "relative",
          width: this.props.width,
          height: this.props.height,
        }}
      >
        <SnippetTransition
          ref={this.snippetRef}
          mediaPath={this.props.snippetsMediaPath}
          width={this.props.width}
          height={this.props.height}
          name={this.state.oldState.name}
          newName={this.state.newState.name}
          onVideoLoaded={this.onVideoLoaded}
        />
      </div>
    );
  }
}
