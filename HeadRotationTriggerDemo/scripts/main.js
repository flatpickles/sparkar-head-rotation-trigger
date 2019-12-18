const Audio = require("Audio");
const FaceTracking = require("FaceTracking");

const HeadRotationTrigger = require("./sparkar-head-rotation-trigger.js");
const EventHelpers = require("./sparkar-event-helpers.js");

// Head move sound controller & event function
const headMoveSoundController = Audio.getPlaybackController("head_move_sound_controller");
function playHeadMoveSound() {
  headMoveSoundController.reset();
  headMoveSoundController.setPlaying(true);
}

// Play the sound when the user's head moves
const face = FaceTracking.face(0);
const limitedEvent = EventHelpers.makeLimitedEvent({eventFunction: playHeadMoveSound});
HeadRotationTrigger.attach({
  face: face,
  eventFunction: limitedEvent,
});
