import React from "react";
import ReactivePortrait from "./components/ReactivePortrait";
import "./App.css";

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      snippetName: ReactivePortrait.defaultSnippet,
    };
  }

  onPortraitChanged = (snippetName) => {
    this.setState({ snippetName: snippetName });
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <ReactivePortrait
            onSnippetChanged={this.onPortraitChanged}
            width={400}
            height={400}
          />
          <div>{this.state.snippetName}</div>
        </header>
      </div>
    );
  }
}
