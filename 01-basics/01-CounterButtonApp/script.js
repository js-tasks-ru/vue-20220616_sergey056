import { createApp, defineComponent } from './vendor/vue.esm-browser.js';

const App = defineComponent({
  name: 'App',
  data() {
    return {
      counter: 0,
    };
  },
  template: `<button type="button" @click="counter++">{{ counter }}</button>`,
});

const app = createApp(App);
app.mount('#app');
