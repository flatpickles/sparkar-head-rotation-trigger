const Time = require("Time");

/**
 * Generate a PeriodicEvent object, to call an event function at random intervals
 * @param  {Function} eventFunction A function to be called periodically
 * @param  {number}   minTime       Minimum duration between periodic function calls (milliseconds)
 * @param  {number}   maxTime       Maximum duration between periodic function calls (milliseconds)
 * @return {Object}                 A PeriodicEvent object which can be scheduled and cancelled
 */
function PeriodicEvent(eventFunction, minTime, maxTime) {
  var event = {
    runOnce: eventFunction,
    minTime: minTime,
    maxTime: maxTime,
  };

  /**
   * Start running the function periodically, as specified in the PeriodicEvent configuration
   */
  event.schedule = () => {
    const nextTimeoutDuration = Math.random() * (event.maxTime - event.minTime) + event.minTime;
    event.currentTimeout = Time.setTimeout(() => {
      event.runOnce();
      event.schedule();
    }, nextTimeoutDuration);
  };

  /**
   * Cancel the PeriodicEvent
   */
  event.cancel = () => {
    if (event.currentTimeout) {
      Time.clearTimeout(event.currentTimeout);
    }
  };

  return event;
}

/**
 * Generate a LimitedEvent object, to limit the repeated execution of a specified event function
 * @param  {Function} eventFunction A function to be called at a limited frequency
 * @param  {number}   maxFrequency  Minimum duration between executions of the specified function (milliseconds)
 * @return {Object}                 A LimitedEvent object
 */
function LimitedEvent(eventFunction, maxFrequency) {
  var event = {
    eventFunction: eventFunction,
    maxFrequency: maxFrequency,
    allowExecution: true,
  };

  /**
   * Run the LimitedEvent as specified in the PeriodicEvent configuration 
   */
  event.run = () => {
    if (event.allowExecution) {
      event.eventFunction();
      event.allowExecution = false;
      Time.setTimeout(() => {
        event.allowExecution = true;
      }, maxFrequency);
    }
  };

  return event;
}

module.exports = {
  /**
   * Schedule a periodic event to be called at random intervals
   * @param  {Function} eventFunction A function to be called periodically
   * @param  {number}   minTime       Minimum duration between periodic function calls (milliseconds)
   * @param  {number}   maxTime       Maximum duration between periodic function calls (milliseconds)
   * @return {Object}                 A PeriodicEvent object which can be cancelled
   */
  scheduleEvent: (eventFunction, minTime, maxTime) => {
    const newEvent = PeriodicEvent(eventFunction, minTime, maxTime);
    newEvent.schedule();
    return newEvent;
  },

  /**
   * Generate a LimitedEvent object, to limit the repeated execution of a specified event function
   * @param  {Function}     eventFunction A function to be called at a limited frequency
   * @param  {number=200}   maxFrequency  Minimum duration between executions of the specified function (milliseconds)
   * @return {Object}                     A LimitedEvent object
   */
  makeLimitedEvent: (eventFunction, maxFrequency = 200) => {
    const newEvent = LimitedEvent(eventFunction, maxFrequency);
    return newEvent.run;
  }
};
