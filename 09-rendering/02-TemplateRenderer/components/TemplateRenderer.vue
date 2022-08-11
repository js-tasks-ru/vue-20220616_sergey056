<script>
import { defineComponent, compile, h } from 'vue';

export default {
  name: 'TemplateRenderer',

  props: {
    template: {
      type: String,
      required: true,
    },

    bindings: {
      type: Object,
      default: () => ({}),
    },

    components: {
      type: [Object, Array],
      default: () => [],
    },
  },

  computed: {
    component() {
      return defineComponent({
        components: this.components,
        props: {
          bindings: {
            type: Object,
            default: () => ({}),
          },
        },
        render: compile(this.template),
      });
    },
  },

  errorCaptured() {
    return false;
  },

  render() {
    return h(this.component, { bindings: this.bindings });
  },
};
</script>
