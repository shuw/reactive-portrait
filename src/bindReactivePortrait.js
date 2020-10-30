import ReactDOM from "react-dom";
import React from "react";
import ReactivePortrait from "./components/ReactivePortrait";

const bindReactivePortrait = (element, size, mediaPath, options) => {
  const ref = React.createRef();
  options = options ?? {};
  ReactDOM.render(
    <ReactivePortrait
      ref={ref}
      width={size}
      height={size}
      snippetsMediaPath={mediaPath}
      onLoaded={options.onLoaded}
    />,
    element
  );
  return ref;
};

export default bindReactivePortrait;
