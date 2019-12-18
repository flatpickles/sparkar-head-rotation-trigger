const Time = require("Time");

/**
 * Generate a PeriodicEvent object, to call an event function at random intervals
 * @param  {Object}   config               Configuration parameters for the PeriodicEvent
 * @param  {Function} config.eventFunction A function to be called periodically
 * @param  {number}   config.minTime       Minimum duration between periodic function calls (milliseconds)
 * @param  {number}   config.maxTime       Maximum duration between periodic function calls (milliseconds)
 * @return {Object}                        A PeriodicEvent object which can be scheduled and cancelled
 */
function PeriodicEvent(config) {
  var event = {
    runOnce: config.eventFunction,
    minTime: config.minTime,
    maxTime: config.maxTime,
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
 * @param  {Object}   config               Configuration parameters for the LimitedEvent
 * @param  {Function} config.eventFunction A function to be called at a limited frequency
 * @param  {number}   config.maxFrequency  Minimum duration between executions of the specified function (milliseconds)
 * @return {Object}                        A LimitedEvent object
 */
function LimitedEvent(config) {
  var event = {
    eventFunction: config.eventFunction,
    maxFrequency: config.maxFrequency,
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
      }, event.maxFrequency);
    }
  };

  return event;
}

module.exports = {
  /**
   * Schedule a periodic event to be called at random intervals
   * @param  {Object}   config               Configuration parameters for the scheduled event
   * @param  {Function} config.eventFunction A function to be called periodically
   * @param  {number}   config.minTime       Minimum duration between periodic function calls (milliseconds)
   * @param  {number}   config.maxTime       Maximum duration between periodic function calls (milliseconds)
   * @return {Object}                        A PeriodicEvent object which can be cancelled
   */
  scheduleEvent: (config) => {
    const newEvent = PeriodicEvent(config);
    newEvent.schedule();
    return newEvent;
  },

   /**
    * Generate a LimitedEvent object, to limit the repeated execution of a specified event function
    * @param  {Object}       config               Configuration parameters for the LimitedEvent
    * @param  {Function}     config.eventFunction A function to be called at a limited frequency
    * @param  {number=200}   config.maxFrequency  Minimum duration between executions of the specified function (milliseconds)
    * @return {Object}                            A LimitedEvent object
    */
  makeLimitedEvent: (config) => {
    config.maxFrequency = config.maxFrequency || 200;
    const newEvent = LimitedEvent(config);
    return newEvent.run;
  }
};
