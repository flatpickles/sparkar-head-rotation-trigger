# Spark AR - Head Rotation Trigger

## Description

This package provides a helper function to enable firing events when the user moves their head around, which can be especially useful for interactive audio. Examples of audio experiences where this is useful include rustling branches and jangling jewelry. The head movement threshold can be adjusted (default 0.4). Head rotation can be an especially noisy signal, so this works well in combination `makeLimitedEvent` from the [EventHelpers package](https://github.com/man1/sparkar-event-helpers), as demonstrated in the example below. 

## Usage

```javascript
const Audio = require("Audio");
const FaceTracking = require("FaceTracking");

const HeadRotationTrigger = require("sparkar-head-rotation-trigger");
const EventHelpers = require("sparkar-event-helpers");

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

```