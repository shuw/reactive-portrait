export default class States {
  static get(options) {
    var DIRECTION_PROB, IDLE_BEFORE_DIRECTION;
    if (options.lookAround) {
      DIRECTION_PROB = 1;
      IDLE_BEFORE_DIRECTION = 1;
    } else {
      DIRECTION_PROB = 0.02;
      IDLE_BEFORE_DIRECTION = 5;
    }

    return {
      idle: {
        transitions: {
          tick50: {
            minTimeElapsedInState: 10,
            wave: { probability: 0.001 },
            smile: { probability: 0.0005 },
            lookingAround: { probability: 0.0003 },
            lookingAround2: { probability: 0.0002 },
          },

          attention: {
            wave: { probability: 0.2 },
            thumbsUp: { probability: 0.3 },
            smile: { probability: 0.3 },
            thinking: { probability: 0.2 },
          },

          thumbsUp: { thumbsUp: {} },

          bye: { bye: {} },
          lookLeft: { lookingLeft: {} },
          lookRight: { lookingRight: {} },
          lookDown: { lookingDown: {} },
          lookUp: { lookingUp: {} },

          mouseUp: {
            minTimeElapsedInState: IDLE_BEFORE_DIRECTION,
            lookingUp: { probability: DIRECTION_PROB },
          },
          mouseUpLeft: {
            minTimeElapsedInState: IDLE_BEFORE_DIRECTION,
            lookingUpLeft: { probability: DIRECTION_PROB },
          },
          mouseUpRight: {
            minTimeElapsedInState: IDLE_BEFORE_DIRECTION,
            lookingUpRight: { probability: DIRECTION_PROB },
          },
          mouseLeft: {
            minTimeElapsedInState: IDLE_BEFORE_DIRECTION,
            lookingLeft: { probability: DIRECTION_PROB },
          },
          mouseRight: {
            minTimeElapsedInState: IDLE_BEFORE_DIRECTION,
            lookingRight: { probability: DIRECTION_PROB },
          },
          mouseDown: {
            minTimeElapsedInState: IDLE_BEFORE_DIRECTION,
            lookingDown: { probability: DIRECTION_PROB * 0.5 },
          },
          mouseDownLeft: {
            minTimeElapsedInState: IDLE_BEFORE_DIRECTION,
            lookingDownLeft: { probability: DIRECTION_PROB },
          },
          mouseDownRight: {
            minTimeElapsedInState: IDLE_BEFORE_DIRECTION,
            lookingDownRight: { probability: DIRECTION_PROB },
          },
        },
      },

      bye: {
        transitions: { almostFinished: { wave: {} } },
      },

      smile: { transitions: { almostFinished: { idle: {} } } },
      wave: { transitions: { almostFinished: { idle: {} } } },
      thumbsUp: { transitions: { almostFinished: { idle: {} } } },
      knockKnock: { transitions: { almostFinished: { idle: {} } } },
      thinking: { transitions: { almostFinished: { idle: {} } } },
      lookingAround: { transitions: { almostFinished: { idle: {} } } },
      lookingAround2: { transitions: { almostFinished: { idle: {} } } },
      lookingUp: { transitions: { almostFinished: { idle: {} } } },
      lookingUpLeft: { transitions: { almostFinished: { idle: {} } } },
      lookingUpRight: { transitions: { almostFinished: { idle: {} } } },
      lookingLeft: { transitions: { almostFinished: { idle: {} } } },
      lookingRight: { transitions: { almostFinished: { idle: {} } } },
      lookingDown: { transitions: { almostFinished: { idle: {} } } },
      lookingDownLeft: { transitions: { almostFinished: { idle: {} } } },
      lookingDownRight: { transitions: { almostFinished: { idle: {} } } },
    };
  }
}
