import React from "react";
import PropTypes from "prop-types";

// How close to the end of a video before returning it's almost finished
const VIDEO_ALMOST_FINISHED_THRESHOLD_S = 0.1;

// Encapsulates a Video Snippet
export default class Snippet extends React.Component {
  static propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    name: PropTypes.string,
    opacity: PropTypes.number,
    onVideoLoaded: PropTypes.func,
    mediaPath: PropTypes.string,
  };

  constructor(props) {
    super(props);

    this.hasError = false;
    this.videoRef = React.createRef();
  }

  isVideoReady() {
    return this.videoRef.current && this.videoRef.current.readyState > 0;
  }

  playFromBeginning() {
    if (!this.isVideoReady()) {
      return;
    }

    this.videoRef.current.currentTime = this.getVideoStartTime();
  }

  isAlmostFinished() {
    if (!this.isVideoReady()) {
      return false;
    }

    return (
      this.videoRef.current.duration - this.videoRef.current.currentTime <
      VIDEO_ALMOST_FINISHED_THRESHOLD_S
    );
  }

  onVideoLoaded = (e) => {
    this.videoRef.current.currentTime = this.getVideoStartTime();
    if (this.props.onVideoLoaded) {
      this.props.onVideoLoaded(e);
    }
  };

  onVideoError = (e) => {
    this.hasError = true;
  };

  hasFailedToLoad() {
    return this.hasError;
  }

  getVideoStartTime() {
    if (this.props.name === "idle" && this.videoRef.current?.duration) {
      return Math.random() * this.videoRef.current.duration;
    }
    return 0;
  }

  render() {
    return (
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: this.props.width,
          height: this.props.height,
          borderRadius: this.props.width / 2,
          WebkitMaskImage:
            "-webkit-radial-gradient(circle, white 100%, black 100%)",
        }}
      >
        <video
          ref={this.videoRef}
          autoPlay
          muted
          loop
          playsInline
          onError={this.onVideoError}
          onLoadedData={this.onVideoLoaded}
          width={this.props.width}
          height={this.props.height}
          style={{
            opacity: this.props.opacity,
          }}
        >
          <source src={this.props.mediaPath + "/" + this.props.name + ".mov"} />
        </video>
      </div>
    );
  }
}
