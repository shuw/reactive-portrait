const DIRECTION_PROB = 0.01;

// TODO
// * States to introduce:
// looking around, smile, silly, all directions, multiple idle states
const States = {
  idle: {
    minDurationS: 0.0,
    transitions: {
      tick50: {
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

      mouseUp: { lookingUp: { probability: DIRECTION_PROB } },
      mouseUpLeft: { lookingUpLeft: { probability: DIRECTION_PROB } },
      mouseUpRight: {
        lookingUpRight: { probability: DIRECTION_PROB },
      },
      mouseLeft: { lookingLeft: { probability: DIRECTION_PROB } },
      mouseRight: { lookingRight: { probability: DIRECTION_PROB } },
      mouseDown: { lookingDown: { probability: DIRECTION_PROB * 0.5 } },
      mouseDownLeft: { lookingDownLeft: { probability: DIRECTION_PROB } },
      mouseDownRight: { lookingDownRight: { probability: DIRECTION_PROB } },
    },
  },

  bye: {
    minDurationS: 3.5,
    transitions: { almostFinished: { wave: {} } },
  },

  wave: {
    minDurationS: 3,
    transitions: { almostFinished: { idle: {} } },
  },
  thumbsUp: {
    minDurationS: 4.6,
    transitions: { almostFinished: { idle: {} } },
  },
  knockKnock: {
    minDurationS: 6.9,
    transitions: { almostFinished: { idle: {} } },
  },
  thinking: {
    minDurationS: 6.9,
    transitions: { almostFinished: { idle: {} } },
  },
  lookingAround: {
    minDurationS: 7.2,
    transitions: { almostFinished: { idle: {} } },
  },
  lookingAround2: {
    minDurationS: 6.3,
    transitions: { almostFinished: { idle: {} } },
  },
  lookingUp: {
    minDurationS: 5.6,
    transitions: { almostFinished: { idle: {} } },
  },
  lookingUpLeft: {
    minDurationS: 5.5,
    transitions: { almostFinished: { idle: {} } },
  },
  lookingUpRight: {
    minDurationS: 7,
    transitions: { almostFinished: { idle: {} } },
  },
  lookingLeft: {
    minDurationS: 6,
    transitions: { almostFinished: { idle: {} } },
  },
  lookingRight: {
    minDurationS: 5.5,
    transitions: { almostFinished: { idle: {} } },
  },
  lookingDown: {
    minDurationS: 5.3,
    transitions: { almostFinished: { idle: {} } },
  },
  lookingDownLeft: {
    minDurationS: 7.3,
    transitions: { almostFinished: { idle: {} } },
  },
  lookingDownRight: {
    minDurationS: 7.3,
    transitions: { almostFinished: { idle: {} } },
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
    if (timeInStateMs < stateInfo.minDurationS * 1000) {
      return;
    }

    var newStates = stateInfo.transitions[transition];
    if (!newStates) {
      return;
    }

    const randomFloat = Math.random();
    var probability = 0.0;
    for (const entry of Object.entries(newStates)) {
      const newState = entry[0];
      if (!(newState in States)) {
        continue;
      }

      probability += entry[1].probability || 1.0;
      if (probability < randomFloat) {
        continue;
      }

      // found new state, reset timer
      this._stateStartTime = new Date().getTime();
      this._state = newState;
      return;
    }
  }
}
