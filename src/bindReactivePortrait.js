import ReactDOM from "react-dom";
import React from "react";
import ReactivePortrait from "./components/ReactivePortrait";

const bindReactivePortrait = (element, size, mediaPath) => {
  const ref = React.createRef();
  ReactDOM.render(
    <ReactivePortrait
      ref={ref}
      width={size}
      height={size}
      snippetsMediaPath={mediaPath}
    />,
    element
  );
  return ref;
};

export default bindReactivePortrait;
