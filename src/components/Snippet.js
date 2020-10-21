import React from "react";
import PropTypes from "prop-types";

// Encapsulates a Video Snippet
export default class Snippet extends React.Component {
  static propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    name: PropTypes.string,
    opacity: PropTypes.number,
    onVideoLoaded: PropTypes.func,
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
    this.videoRef.current.currentTime = 0;
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
          onLoadedData={this.props.onVideoLoaded}
          width={this.props.width}
          height={this.props.height}
          style={{
            opacity: this.props.opacity,
          }}
        >
          <source src={"media/" + this.props.name + ".mov"} />
        </video>
      </div>
    );
  }
}
