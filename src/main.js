// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
// Import CSS file
import '../static/video-game-font/variables.scss'

// Global event Bus. Used so that any component can listen to an event emitted by anoy another component, regardless of their hiearchy relationship

const evt = new Vue()
Vue.prototype.$evt = evt

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
})
