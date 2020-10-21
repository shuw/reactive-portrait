import React from 'react';
import PropTypes from "prop-types";

export default class Snippet extends React.Component {
  static propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    name: PropTypes.string,
    opacity: PropTypes.number,
  };

  render() {
    return (
      <div key={this.props.name} style={{
        position: 'absolute',
        top: 0,
        left: 0,
      }}>
        <video autoPlay muted loop
          width={this.props.width} height={this.props.height}
          style={{

            opacity: this.props.opacity || 1.0
          }}>
          <source src={"media/" + this.props.name + ".mov"} />
        </video>
      </div >
    );
  }
}
