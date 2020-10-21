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
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.newName !== this.props.newName) {
      nextState.transitionFraction = 0.0;
      nextState.transitionStartTime = null;
    }

    return true;
  }

  onVideoLoaded = () => {
    this.setState({
      transitionStartTime: new Date().getTime(),
    });
  };

  componentDidMount() {
    this._timer = window.setInterval(() => {
      if (
        this.state.transitionFraction >= 1.0 ||
        this.state.transitionStartTime === null
      ) {
        return;
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
    }, FRAME_INTERVAL_MS);
  }

  componentWillUnmount() {
    window.clearInterval(this._timer);
  }

  render() {
    return (
      <div>
        <Snippet
          width={this.props.width}
          height={this.props.height}
          name={this.props.name}
          opacity={1.0}
        />
        {this.props.newName ? (
          <Snippet
            onVideoLoaded={this.onVideoLoaded}
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
