import Mixin from './mixin';
import Logger from './logger';
import Listener from './listener';
import Emitter from './emitter';

export default class VueMqtt {
  /**
   * lets take all resource
   * @param io
   * @param vuex
   * @param debug
   * @param options
   */
  constructor({ mqtt, vuex, debug, options }) {
    Logger.debug = debug;
    this.mqtt = mqtt;

    this.emitter = new Emitter(vuex);

    Listener.setEventMapHandler(options.eventMapHandler);
    this.listener = new Listener(this.mqtt, this.emitter);
  }

  /**
   * Vue.js entry point
   * @param Vue
   */
  install(Vue) {
    const version = Number(Vue.version.split('.')[0]);

    if (version >= 3) {
      Vue.config.globalProperties.$mqtt = this.mqtt;
      Vue.config.globalProperties.$vueMqtt = this;
    } else {
      Vue.prototype.$mqtt = this.mqtt;
      Vue.prototype.$vueMqtt = this;
    }

    Vue.mixin(Mixin);

    Logger.info('Vue-Mqtt plugin enabled');
  }
}
