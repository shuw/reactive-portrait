import React from "react";
import PropTypes from "prop-types";
import Snippet from "./Snippet";

const VIDEO_CROSS_FADE_TIME_MS = 400;
const FRAME_INTERVAL_MS = 30;

// Manages cross-fade between two Snippet Videos
export default class SnippetTransition extends React.Component {
  static propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    name: PropTypes.string,
    newName: PropTypes.string,
    mediaPath: PropTypes.string,
    onError: PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.transitionStartTime = null;
    this.state = {
      transitionFraction: 1.0,
    };

    this.snippetRef = React.createRef();
  }

  isAlmostFinished() {
    return this.snippetRef.current?.isAlmostFinished() ?? false;
  }

  hasFailedToLoad() {
    return this.snippetRef.current?.hasFailedToLoad() ?? false;
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.newName === this.props.newName) {
      return true;
    }

    nextState.transitionFraction = 0.0;
    this.transitionStartTime = null;

    return true;
  }

  componentDidMount() {
    this._timer = window.setInterval(this.updateTransition, FRAME_INTERVAL_MS);
  }

  componentWillUnmount() {
    window.clearInterval(this._timer);
  }

  updateTransition = () => {
    if (this.state.transitionFraction >= 1.0) {
      return;
    }

    if (!this.snippetRef.current) {
      return;
    }

    if (!this.snippetRef.current.isVideoReady()) {
      // wait for video to be ready before transitioning
      return;
    }

    // reset transition
    if (!this.transitionStartTime) {
      this.transitionStartTime = new Date().getTime();

      // play from beginning (if not resetting to idle state)
      if (this.props.name !== "idle" || this.props.newName !== "idle") {
        this.snippetRef.current.playFromBeginning();
      }
    }

    var timeElapsed = new Date().getTime() - this.transitionStartTime;
    var transitionFraction = Math.min(
      timeElapsed / VIDEO_CROSS_FADE_TIME_MS,
      1.0
    );

    this.setState({
      transitionFraction: transitionFraction,
    });
  };

  render() {
    if (this.props.newName && this.props.newName !== this.props.name) {
      return (
        <div>
          <Snippet
            key={this.props.name}
            mediaPath={this.props.mediaPath}
            width={this.props.width}
            height={this.props.height}
            name={this.props.name}
            opacity={1.0}
          />
          <Snippet
            ref={this.snippetRef}
            key={this.props.newName}
            mediaPath={this.props.mediaPath}
            opacity={this.state.transitionFraction}
            width={this.props.width}
            height={this.props.height}
            name={this.props.newName}
          />
        </div>
      );
    } else {
      return (
        <div>
          <Snippet
            ref={this.snippetRef}
            key={this.props.name}
            mediaPath={this.props.mediaPath}
            width={this.props.width}
            height={this.props.height}
            name={this.props.name}
            opacity={1.0}
          />
        </div>
      );
    }
  }
}
