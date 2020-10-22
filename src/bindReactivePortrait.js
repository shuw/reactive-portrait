import ReactDOM from "react-dom";
import React from "react";
import ReactivePortrait from "./components/ReactivePortrait";

const bindReactivePortrait = (element, size) => {
  ReactDOM.render(<ReactivePortrait width={size} height={size} />, element);
};

export default bindReactivePortrait;
