const DIRECTION_PROB = 0.02;

// TODO
// * States to introduce:
// looking around, smile, silly, all directions, multiple idle states
const States = {
  idle: {
    transitions: {
      tick50: {
        minTimeElapsedInState: 10,
        wave: { probability: 0.001 },
        lookingAround: { probability: 0.0003 },
        lookingAround2: { probability: 0.0002 },
      },

      attention: {
        wave: { probability: 0.2 },
        thumbsUp: { probability: 0.3 },
        knockKnock: { probability: 0.3 },
        thinking: { probability: 0.2 },
      },

      thumbsUp: { thumbsUp: {} },

      bye: { bye: {} },

      lookLeft: { lookingLeft: {} },
      lookRight: { lookingRight: {} },
      lookDown: { lookingDown: {} },
      lookUp: { lookingUp: {} },

      mouseUp: {
        minTimeElapsedInState: 5,
        lookingUp: { probability: DIRECTION_PROB },
      },
      mouseUpLeft: {
        minTimeElapsedInState: 5,
        lookingUpLeft: { probability: DIRECTION_PROB },
      },
      mouseUpRight: {
        minTimeElapsedInState: 5,
        lookingUpRight: { probability: DIRECTION_PROB },
      },
      mouseLeft: {
        minTimeElapsedInState: 5,
        lookingLeft: { probability: DIRECTION_PROB },
      },
      mouseRight: {
        minTimeElapsedInState: 5,
        lookingRight: { probability: DIRECTION_PROB },
      },
      mouseDown: {
        minTimeElapsedInState: 5,
        lookingDown: { probability: DIRECTION_PROB * 0.5 },
      },
      mouseDownLeft: {
        minTimeElapsedInState: 5,
        lookingDownLeft: { probability: DIRECTION_PROB },
      },
      mouseDownRight: {
        minTimeElapsedInState: 5,
        lookingDownRight: { probability: DIRECTION_PROB },
      },
    },
  },

  bye: {
    transitions: { almostFinished: { wave: {} } },
  },

  wave: {
    transitions: { almostFinished: { idle: {} } },
  },
  thumbsUp: {
    transitions: { almostFinished: { idle: {} } },
  },
  knockKnock: {
    transitions: { almostFinished: { idle: {} } },
  },
  thinking: {
    transitions: { almostFinished: { idle: {} } },
  },
  lookingAround: {
    transitions: { almostFinished: { idle: {} } },
  },
  lookingAround2: {
    transitions: { almostFinished: { idle: {} } },
  },
  lookingUp: {
    transitions: { almostFinished: { idle: {} } },
  },
  lookingUpLeft: {
    transitions: { almostFinished: { idle: {} } },
  },
  lookingUpRight: {
    transitions: { almostFinished: { idle: {} } },
  },
  lookingLeft: {
    transitions: { almostFinished: { idle: {} } },
  },
  lookingRight: {
    transitions: { almostFinished: { idle: {} } },
  },
  lookingDown: {
    transitions: { almostFinished: { idle: {} } },
  },
  lookingDownLeft: {
    transitions: { almostFinished: { idle: {} } },
  },
  lookingDownRight: {
    transitions: { almostFinished: { idle: {} } },
  },
};

export default class StateMachine {
  constructor(initialStateName) {
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
    var stateInfo = States[this._state.name];

    // handle failure by going back to idle
    if (event === "failed") {
      return this._setState("idle");
    }

    var newStates = stateInfo.transitions[event];
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
      if (!(newStateName in States)) {
        continue;
      }

      probability += entry[1].probability || 1.0;
      if (probability < randomFloat) {
        continue;
      }

      // found new state, reset timer
      return this._setState(newStateName);
    }
  }

  _setState(stateName) {
    this._state = {
      name: stateName,
      info: States[stateName],
    };
    this._stateStartTime = new Date().getTime();
  }
}
