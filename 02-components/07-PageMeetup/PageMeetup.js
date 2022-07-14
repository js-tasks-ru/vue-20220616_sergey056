import { defineComponent } from './vendor/vue.esm-browser.js';
import UiContainer from './UiContainer.js';
import UiAlert from './UiAlert.js';
import { fetchMeetupById } from './meetupService.js';
import MeetupView from '../06-MeetupView/MeetupView';

export default defineComponent({
  name: 'PageMeetup',

  components: {
    UiAlert,
    UiContainer,
    MeetupView,
  },

  props: {
    meetupId: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      meetupData: null,
      errorMsg: null,
    };
  },
  watch: {
    meetupId: {
      handler(newVal) {
        this.loadMeetup(newVal);
      },
      immediate: true,
    },
  },
  methods: {
    loadMeetup(meetupId) {
      this.meetupData = null;
      this.errorMsg = null;
      fetchMeetupById(meetupId)
        .then((res) => {
          this.meetupData = res;
        })
        .catch((reason) => {
          this.errorMsg = reason.message;
        });
    },
  },
  template: `
    <div class="page-meetup">
      <meetup-view v-if="meetupData" :meetup="meetupData" />

      <ui-container v-else-if="!errorMsg">
        <ui-alert>Загрузка...</ui-alert>
      </ui-container>

      <ui-container v-else-if="errorMsg">
        <ui-alert>{{ errorMsg }}</ui-alert>
      </ui-container>
    </div>
  `,
});
