import React from 'react';
import PropTypes from "prop-types";

export default class Snippet extends React.Component {
  static propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    name: PropTypes.string,
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <video autoPlay muted width={this.props.width} height={this.props.height}>
          <source src={"media/" + this.props.name + ".mov"} />
        </video>
      </div>
    );
  }
}
