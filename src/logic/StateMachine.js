const States = {
  "idle": {
    "mouseEnter": {
      newState: "wave"
    }
  }
}

export default class StateMachine {
  constructor(initialState) {
    this._state = initialState;
  }

  getState() {
    return this._state;
  }

  getNewState(transition) {
    this._updateState(transition);
    return this._state;
  }

  _updateState(transition) {
    var transitions = States[this._state];
    if (!transitions) { return; }

    var newStateInfo = transitions[transition];

    if (!newStateInfo) { return; }

    this._state = newStateInfo.newState;
  }

}

