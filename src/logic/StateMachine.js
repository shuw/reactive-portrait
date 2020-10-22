// TODO
// * States to introduce: smile, silly, all directions, multiple idle states
const States = {
  idle: {
    minDurationMs: 0.0,
    transitions: {
      mouseEnter: {
        wave: {},
      },
      mouseLeft: {
        lookingLeft: {},
      },
      mouseRight: {
        lookingRight: {},
      },
    },
  },
  wave: {
    minDurationMs: 3000,
    transitions: {
      tick50Ms: {
        idle: {},
      },
    },
  },
  lookingLeft: {
    minDurationMs: 3000,
    transitions: {
      tick50Ms: {
        idle: {},
      },
    },
  },
  lookingRight: {
    minDurationMs: 3000,
    transitions: {
      tick50Ms: {
        idle: {},
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
      const probability = entry[1].probability || 1.0;
      if (Math.random() > probability) {
        continue;
      }

      // found new state, reset timer
      this._stateStartTime = new Date().getTime();
      this._state = entry[0];
      return;
    }
  }
}
