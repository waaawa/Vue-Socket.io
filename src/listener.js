export default class VueMqttListener {
  /**
   * mqtt-client reserved event keywords
   * @type {string[]}
   */
  static staticEvents = [
    'connect',
    'error',
    'disconnect',
    'reconnect',
    'reconnect_attempt',
    'reconnecting',
    'reconnect_error',
    'reconnect_failed',
    'connect_error',
    'connect_timeout',
    'connecting',
    'ping',
    'pong'
  ];

  static eventMapHandler = (e) => null;

  static setEventMapHandler(handler) {
    VueMqttListener.eventMapHandler = handler;
  }

  constructor(mqtt, emitter) {
    this.mqtt = mqtt;
    this.register();
    this.emitter = emitter;
  }

  /**
   * Listening all mqtt events
   */
  register() {
    this.mqtt.on('message', (topic, message) => {
      const msg = message.toString();
      const key = VueMqttListener.eventMapHandler(topic);
      key && this.onEvent(key, JSON.parse(msg));
      this.onEvent(topic, JSON.parse(msg));
    });

    VueMqttListener.staticEvents.forEach((event) => this.mqtt.on(event, (args) => this.onEvent(event, args)));
  }

  /**
   * Broadcast all events to vuejs environment
   */
  onEvent(event, args) {
    this.emitter.emit(event, args);
  }
}
