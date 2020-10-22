import ReactDOM from "react-dom";
import React from "react";
import ReactivePortrait from "./components/ReactivePortrait";

const bindReactivePortrait = (element, size, mediaPath) => {
  ReactDOM.render(
    <ReactivePortrait
      width={size}
      height={size}
      snippetsMediaPath={mediaPath}
    />,
    element
  );
};

export default bindReactivePortrait;
