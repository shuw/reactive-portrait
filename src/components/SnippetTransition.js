import React from "react";
import PropTypes from "prop-types";
import Snippet from "./Snippet";

const VIDEO_CROSS_FADE_TIME_MS = 1000;
const FRAME_INTERVAL_MS = 30;

// Transition between two states
export default class SnippetTransition extends React.Component {
  static propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    name: PropTypes.string,
    newName: PropTypes.string,
  };

  constructor(props) {
    super(props);

    this.state = {
      transitionFraction: 1.0,
      transitionStartTime: null,
    };

    this.nextSnippetRef = React.createRef();
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.newName === this.props.newName) {
      return true;
    }

    nextState.transitionFraction = 0.0;
    nextState.transitionStartTime = null;

    return true;
  }

  componentDidMount() {
    this._timer = window.setInterval(this.updateTransition, FRAME_INTERVAL_MS);
  }

  updateTransition = () => {
    if (this.state.transitionFraction >= 1.0) {
      return;
    }

    if (
      !this.nextSnippetRef.current ||
      !this.nextSnippetRef.current.videoRef.current ||
      this.nextSnippetRef.current.videoRef.current.readyState !== 4
    ) {
      return;
    }

    if (!this.state.transitionStartTime) {
      this.state.transitionStartTime = new Date().getTime();
    }

    var timeElapsed = new Date().getTime() - this.state.transitionStartTime;

    var transitionFraction = Math.min(
      timeElapsed / VIDEO_CROSS_FADE_TIME_MS,
      1.0
    );

    console.log(transitionFraction);
    this.setState({
      transitionFraction: transitionFraction,
    });
  };

  componentWillUnmount() {
    // window.clearInterval(this._timer);
  }

  render() {
    return (
      <div>
        <Snippet
          key={this.props.name}
          width={this.props.width}
          height={this.props.height}
          name={this.props.name}
          opacity={1.0}
        />
        {this.props.newName && this.props.newName !== this.props.name ? (
          <Snippet
            ref={this.nextSnippetRef}
            key={this.props.newName}
            opacity={this.state.transitionFraction}
            width={this.props.width}
            height={this.props.height}
            name={this.props.newName}
          />
        ) : null}
      </div>
    );
  }
}
