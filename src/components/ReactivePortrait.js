import React from 'react';


export default class ReactivePortrait extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: null,
    };
  }

  render() {
    return (
      <div>
        <video autoplay="autoplay" muted width="800" height="600">
          <source src="media/portrait.mov" />
        </video>
        <button
          className="square"
          onClick={() => this.setState({value: 'X'})}
        >
          {this.state.value}
        </button>
      </div>
    );
  }
}
