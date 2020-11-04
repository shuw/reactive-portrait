import React from "react";
import ReactivePortrait from "./components/ReactivePortrait";
import "./App.css";

const MEDIA_PATH = "https://shuw.github.io/reactive-portrait-media/";
const MEDIA_PATH_DEBUG = "http://localhost:3001/";

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
    const isDebugMode = params.get("debug") !== null;
    const mediaPath = isDebugMode ? MEDIA_PATH_DEBUG : MEDIA_PATH;

    const portraits = names.map((name) => {
      return (
        <div
          key={name}
          style={{
            display: "inline-block",
            width: "400px",
            padding: "20px",
            textAlign: "center",
          }}
        >
          <ReactivePortrait
            options={{
              lookAround: params.get("lookAround") !== null,
              verboseLogging: params.get("verboseLogging") !== null,
            }}
            snippetsMediaPath={mediaPath + name}
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
        <a
          style={{
            position: "absolute",
            top: "20px",
            right: "20px",
            color: "#aaa",
          }}
          href="https://github.com/shuw/reactive-portrait"
          target="_blnk"
        >
          Source Code
        </a>
        <div style={{ paddingTop: "150px" }}>{portraits}</div>
        {hideStateInfo ? null : (
          <div style={{ color: "#aaa", paddingTop: "10px", fontSize: "20px" }}>
            {this.state.snippetName}
          </div>
        )}
      </div>
    );
  }
}
