import { createApp, defineComponent } from './vendor/vue.esm-browser.js';

const API_URL = 'https://course-vue.javascript.ru/api';

function fetchMeetupById(meetupId) {
  return fetch(`${API_URL}/meetups/${meetupId}`).then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      return response.json().then((error) => {
        throw error;
      });
    }
  });
}

// Требуется создать Vue приложение
const App = defineComponent({
  name: 'App',
  data() {
    return {
      meetupId: null,
      meetupData: null,
    };
  },
  watch: {
    meetupId(newVal) {
      if (newVal) {
        fetchMeetupById(newVal).then((r) => (this.meetupData = r));
      }
    },
  },
  template: `
    <div>
    <label v-for="(index) in 5">
      <input
        type="radio"
        name="meetupId"
        :value="index"
        v-model="meetupId"
      />
      {{ index }}
    </label>

    <hr />

    <h3>{{ meetupData?.title }}</h3>
    </div>
  `,
});

const app = createApp(App);
app.mount('#app');
