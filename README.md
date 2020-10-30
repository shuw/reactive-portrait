# Reactive Portrait

This is a prototype for a Living Portrait Photo built using a collection of short video snippets and a simple state machine. It is a work in progress.

Try out an example here: [https://shuw.github.io/reactive-portrait](https://shuw.github.io/reactive-portrait).

## How to self host this on your website?

### 1. Include bindReactivePortrait.js script on your webpage

```
<script src="https://shuw.github.io/reactive-portrait/components/bindReactivePortrait_v0_1.js"></script>
```

### 2. Bind a Reactive Portrait to an element on your page

To create your own Reactive Portrait, host a folder of video snippets and point to that path. Here is [a folder of example videos](https://github.com/shuw/reactive-portrait/tree/gh-pages/media/shuw). Video snippets are ideally square are named after [states defined here](https://github.com/shuw/reactive-portrait/blob/master/src/logic/States.js).

```
var portrait = bindReactivePortrait(
  portraitElement, // replace with reference to your element
  150, // size in pixels
  "https://shuw.github.io/reactive-portrait/media/shuw", // path to media snippets
);
```

### 3. Attach events for fun!

You can invoke events on the Reactive Portrait like this example below. Events are attached to states and [defined here]([states defined here](https://github.com/shuw/reactive-portrait/blob/master/src/logic/States.js)).

```
// this example uses jQuery, but it's not required at all
$(".links").mouseenter(() => {
  portrait.current.invokeEvent("thumbsUp");
});
```

## Scripts for this project

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run exportComponent`

Export Reactive Portrait as a re-usable JS component under `/build/bindReactivePortrait.js`

### `npm run deploy`

Deploys the website to `https://shuw.github.io/reactive-portrait` using Github Pages.
