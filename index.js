module.exports = {
  /**
   * Execute an event function when detecting quick rotational movements of the specified face
   * @param {Object}     config               Configuration parameters for the head rotation trigger
   * @param {Face}       config.face          A Face object used to detect rotational movements
   * @param {Function}   config.eventFunction A function called when rotational face movements are detected
   * @param {number=0.4} config.threshold     Configurable threshold for sensitivity of movement detection
   */
  attach: (config) => {
    const face = config.face;
    const eventFunction = config.eventFunction;
    const threshold = config.threshold || 0.4;

    const faceRotX = face.cameraTransform.rotationX;
    const faceRotY = face.cameraTransform.rotationY;
    const faceRotZ = face.cameraTransform.rotationZ;
    const faceRotXD = faceRotX.sub(faceRotX.expSmooth(200)).abs();
    const faceRotYD = faceRotY.sub(faceRotY.expSmooth(200)).abs();
    const faceRotZD = faceRotZ.sub(faceRotZ.expSmooth(200)).abs();
    const faceRotXDD = faceRotXD.sub(faceRotXD.expSmooth(200));
    const faceRotYDD = faceRotYD.sub(faceRotYD.expSmooth(200));
    const faceRotZDD = faceRotZD.sub(faceRotZD.expSmooth(200));
    faceRotXDD.mul(5).gt(threshold).onOn().subscribe(eventFunction); // Nod
    faceRotYDD.mul(5).gt(threshold).onOn().subscribe(eventFunction); // Turn
    faceRotZDD.mul(5).gt(threshold).onOn().subscribe(eventFunction); // Tilt
  }
};
