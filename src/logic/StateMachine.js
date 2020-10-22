const DIRECTION_PROB = 0.05;

// TODO
// * States to introduce:
// looking around, smile, silly, all directions, multiple idle states
const States = {
  idle: {
    minDurationS: 0.0,
    transitions: {
      tick50Ms: {
        wave: { probability: 0.001 },
        lookingAround: { probability: 0.001 },
        lookingAround2: { probability: 0.001 },
      },

      attention: {
        wave: { probability: 0.2 },
        thumbsUp: { probability: 0.3 },
        knockKnock: { probability: 0.3 },
        thinking: { probability: 0.2 },
      },

      mouseUp: { lookingUp: { probability: DIRECTION_PROB } },
      mouseUpLeft: { lookingUpLeft: { probability: DIRECTION_PROB } },
      mouseUpRight: {
        lookingUpRight: { probability: DIRECTION_PROB },
      },
      mouseLeft: { lookingLeft: { probability: DIRECTION_PROB } },
      mouseRight: { lookingRight: { probability: DIRECTION_PROB } },
      mouseDown: { lookingDown: { probability: DIRECTION_PROB } },
      mouseDownLeft: { lookingDownLeft: { probability: DIRECTION_PROB } },
      mouseDownRight: { lookingDownRight: { probability: DIRECTION_PROB } },
    },
  },
  wave: {
    minDurationS: 3,
    transitions: { tick50Ms: { idle: {} } },
  },
  thumbsUp: {
    minDurationS: 4.6,
    transitions: { tick50Ms: { idle: {} } },
  },
  knockKnock: {
    minDurationS: 6.9,
    transitions: { tick50Ms: { idle: {} } },
  },
  thinking: {
    minDurationS: 6.9,
    transitions: { tick50Ms: { idle: {} } },
  },
  lookingAround: {
    minDurationS: 7,
    transitions: { tick50Ms: { idle: {} } },
  },
  lookingAround2: {
    minDurationS: 6.3,
    transitions: { tick50Ms: { idle: {} } },
  },
  lookingUp: {
    minDurationS: 5.6,
    transitions: { tick50Ms: { idle: {} } },
  },
  lookingUpLeft: {
    minDurationS: 5.5,
    transitions: { tick50Ms: { idle: {} } },
  },
  lookingUpRight: {
    minDurationS: 7,
    transitions: { tick50Ms: { idle: {} } },
  },
  lookingLeft: {
    minDurationS: 6,
    transitions: { tick50Ms: { idle: {} } },
  },
  lookingRight: {
    minDurationS: 5.5,
    transitions: { tick50Ms: { idle: {} } },
  },
  lookingDown: {
    minDurationS: 5.3,
    transitions: { tick50Ms: { idle: {} } },
  },
  lookingDownLeft: {
    minDurationS: 7.3,
    transitions: { tick50Ms: { idle: {} } },
  },
  lookingDownRight: {
    minDurationS: 7.3,
    transitions: { tick50Ms: { idle: {} } },
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
      probability += entry[1].probability || 1.0;
      if (probability < randomFloat) {
        continue;
      }

      // found new state, reset timer
      this._stateStartTime = new Date().getTime();
      this._state = entry[0];
      return;
    }
  }
}
