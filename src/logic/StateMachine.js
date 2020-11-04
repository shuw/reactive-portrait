import States from "./States";

/**
 * TODO:
 * - on fileNotFound condition, re-trigger the previous event with new state
 */
export default class StateMachine {
  constructor(initialStateName, options = {}) {
    this.states = States.get(options);
    this._setState(initialStateName, null /* no triggering event*/);
    this.previousState = this.state;
    this.statesWithoutFiles = {};
  }

  getState() {
    return this.state;
  }

  getNewState(event) {
    this._updateState(event);
    return this.state;
  }

  _updateState(event) {
    // handle failure by going back to idle
    if (event === "fileNotFound") {
      this.statesWithoutFiles[this.state.name] = true;
      this.state = this.previousState;
      return;
    }

    var newStates = this.state.info.events[event];
    if (!newStates) {
      return;
    }

    if (newStates.minTimeElapsedInState) {
      var timeInStateMs = new Date().getTime() - this.state.startTime;
      if (timeInStateMs < newStates.minTimeElapsedInState * 1000) {
        return;
      }
    }

    const randomFloat = Math.random();
    var probability = 0.0;

    const entries = Object.entries(newStates).sort(() => 0.5 - Math.random());
    for (const entry of entries) {
      const newStateName = entry[0];
      const newStateInfo = entry[1];

      // skip properties, or states without files
      if (
        newStateInfo.constructor !== Object ||
        newStateName in this.statesWithoutFiles
      ) {
        continue;
      }

      if (!(newStateName in this.states)) {
        console.error("ERROR, state not found: " + newStateName);
        continue;
      }

      probability += newStateInfo.probability || 1.0;
      if (probability < randomFloat) {
        continue;
      }

      // found new state, reset timer
      this._setState(newStateName, event);
      return;
    }
  }

  _setState(stateName, triggeringEvent) {
    this.previousState = this.state;
    this.state = {
      name: stateName,
      info: this.states[stateName],
      triggeringEvent: triggeringEvent,
      startTime: new Date().getTime(),
    };
  }
}
