import States from "./States";

export default class StateMachine {
  constructor(initialStateName, options = {}) {
    this.states = States.get(options);
    this._setState(initialStateName);
  }

  getState() {
    return this._state;
  }

  getNewState(event) {
    this._updateState(event);
    return this._state;
  }

  _updateState(event) {
    var stateInfo = this.states[this._state.name];

    // handle failure by going back to idle
    if (event === "failed") {
      this._setState("idle");

      // disable minTimeElapsedInState
      this._stateStartTime = 0;
      return;
    }

    var newStates = stateInfo.events[event];
    if (!newStates) {
      return;
    }

    if (newStates.minTimeElapsedInState) {
      var timeInStateMs = new Date().getTime() - this._stateStartTime;
      if (timeInStateMs < newStates.minTimeElapsedInState * 1000) {
        return;
      }
    }

    const randomFloat = Math.random();
    var probability = 0.0;
    for (const entry of Object.entries(newStates)) {
      const newStateName = entry[0];
      if (!(newStateName in this.states)) {
        continue;
      }

      probability += entry[1].probability || 1.0;
      if (probability < randomFloat) {
        continue;
      }

      // found new state, reset timer
      this._setState(newStateName);
      return;
    }
  }

  _setState(stateName) {
    this._state = {
      name: stateName,
      info: this.states[stateName],
    };
    this._stateStartTime = new Date().getTime();
  }
}
