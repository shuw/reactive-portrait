// TODO
// * Add entry state that is separate from idle
const States = {
  idle: {
    minDurationMs: 0.0,
    transitions: {
      mouseEnter: {
        wave: { probability: 1.0 },
      },
    },
  },
  wave: {
    minDurationMs: 2000,
    transitions: {
      tick50Ms: {
        idle: { probability: 1 },
      },
    },
  },
};

export default class StateMachine {
  constructor(initialState) {
    this._state = initialState;
    this._stateStartTime = new Date().getTime();
  }

  getState() {
    return this._state;
  }

  getNewState(transition) {
    this._updateState(transition);
    return this._state;
  }

  _updateState(transition) {
    var stateInfo = States[this._state];

    var timeInStateMs = new Date().getTime() - this._stateStartTime;
    if (timeInStateMs < stateInfo.minDurationMs) {
      return;
    }

    var newStates = stateInfo.transitions[transition];
    if (!newStates) {
      return;
    }

    for (const entry of Object.entries(newStates)) {
      if (Math.random() > entry[1].probability) {
        continue;
      }

      // found new state, reset timer
      this._stateStartTime = new Date().getTime();
      this._state = entry[0];
      return;
    }
  }
}
