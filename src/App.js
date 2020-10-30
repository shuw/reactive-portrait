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
    const params = new URL(document.location).searchParams;
    const name = params.get("name") ?? "shuw";
    const hideStateInfo = params.get("hideStateInfo") !== null;

    return (
      <div className="App">
        <header className="App-header">
          <ReactivePortrait
            snippetsMediaPath={"/reactive-portrait/media/" + name}
            onSnippetChanged={this.onPortraitChanged}
            width={400}
            height={400}
          />
          {hideStateInfo ? null : (
            <div style={{ paddingTop: "20px" }}>{this.state.snippetName}</div>
          )}
        </header>
      </div>
    );
  }
}
