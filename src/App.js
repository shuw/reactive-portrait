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
    const names = (params.get("names") ?? params.get("name") ?? "shuw").split(
      ","
    );

    const portraits = names.map((name) => {
      return (
        <div style={{ display: "inline-block", padding: "10px" }}>
          <ReactivePortrait
            snippetsMediaPath={"/reactive-portrait/media/" + name}
            onSnippetChanged={this.onPortraitChanged}
            width={400}
            height={400}
          />
        </div>
      );
    });

    const hideStateInfo =
      params.get("hideStateInfo") !== null || portraits.length !== 1;

    return (
      <div className="App">
        <header className="App-header">
          <div>{portraits}</div>
          {hideStateInfo ? null : (
            <div style={{ paddingTop: "20px" }}>{this.state.snippetName}</div>
          )}
        </header>
      </div>
    );
  }
}
