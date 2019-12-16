module.exports = {
  /**
   * Execute an event function when detecting quick rotational movements of the specified face
   * @param {Face}       face          A Face object used to detect rotational movements
   * @param {Function}   eventFunction A function called when rotational face movements are detected
   * @param {number=0.4} threshold     Configurable threshold for sensitivity of movement detection
   */
  bindEvent: (face, eventFunction, threshold = 0.4) => {
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
