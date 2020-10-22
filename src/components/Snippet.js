import React from "react";
import PropTypes from "prop-types";

const IDLE_START_POINTS_S = [10, 23.26];

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

    this.videoRef = React.createRef();
  }

  isVideoReady() {
    return this.videoRef.current && this.videoRef.current.readyState === 4;
  }

  playFromBeginning() {
    if (!this.isVideoReady()) {
      return;
    }
    var startTime = 0;
    if (this.props.name === "idle") {
      startTime =
        IDLE_START_POINTS_S[
          Math.floor(Math.random() * IDLE_START_POINTS_S.length)
        ];
    }

    this.videoRef.current.currentTime = startTime;
  }

  onVideoLoaded = (e) => {
    this.videoRef.current.currentTime = this.getVideoStartTime();
    if (this.props.onVideoLoaded) {
      this.props.onVideoLoaded(e);
    }
  };

  getVideoStartTime() {
    if (this.props.name === "idle") {
      return IDLE_START_POINTS_S[
        Math.floor(Math.random() * IDLE_START_POINTS_S.length)
      ];
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
