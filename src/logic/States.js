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
        events: {
          tick50Ms: {
            minTimeElapsedInState: 10,
            wave: { probability: 0.001 },
            smile: { probability: 0.0005 },
            lookingAround: { probability: 0.0003 },
            lookingAround2: { probability: 0.0002 },
          },

          attention: {
            wave: { probability: 0.2 },
            thumbsUp: { probability: 0.2 },
            smile: { probability: 0.2 },
            thinking: { probability: 0.2 },
            customReaction1: { probability: 0.2 },
            customReaction2: { probability: 0.2 },
            customReaction3: { probability: 0.2 },
            customReaction4: { probability: 0.2 },
            customReaction5: { probability: 0.2 },
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
        events: { almostFinished: { wave: {} } },
      },

      smile: { events: { almostFinished: { idle: {} } } },
      wave: { events: { almostFinished: { idle: {} } } },
      thumbsUp: { events: { almostFinished: { idle: {} } } },
      knockKnock: { events: { almostFinished: { idle: {} } } },
      thinking: { events: { almostFinished: { idle: {} } } },
      lookingAround: { events: { almostFinished: { idle: {} } } },
      lookingAround2: { events: { almostFinished: { idle: {} } } },
      lookingUp: { events: { almostFinished: { idle: {} } } },
      lookingUpLeft: { events: { almostFinished: { idle: {} } } },
      lookingUpRight: { events: { almostFinished: { idle: {} } } },
      lookingLeft: { events: { almostFinished: { idle: {} } } },
      lookingRight: { events: { almostFinished: { idle: {} } } },
      lookingDown: { events: { almostFinished: { idle: {} } } },
      lookingDownLeft: { events: { almostFinished: { idle: {} } } },
      lookingDownRight: { events: { almostFinished: { idle: {} } } },
      customReaction1: { events: { almostFinished: { idle: {} } } },
      customReaction2: { events: { almostFinished: { idle: {} } } },
      customReaction3: { events: { almostFinished: { idle: {} } } },
      customReaction4: { events: { almostFinished: { idle: {} } } },
      customReaction5: { events: { almostFinished: { idle: {} } } },
    };
  }
}
