import React from 'react';
import PropTypes from "prop-types";

export default class Snippet extends React.Component {
  static propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    name: PropTypes.string,
  };

  render() {
    return (
      <div key={this.props.name}>
        <video autoPlay muted loop width={this.props.width} height={this.props.height}>
          <source src={"media/" + this.props.name + ".mov"} />
        </video>
      </div>
    );
  }
}
