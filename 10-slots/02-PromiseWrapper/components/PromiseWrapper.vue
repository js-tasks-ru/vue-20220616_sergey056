<template>
  <slot :name="state" :[prop]="result" />
</template>

<script>
export default {
  name: 'PromiseWrapper',

  props: {
    promise: {
      type: Promise,
      required: true,
    },
  },

  data() {
    return {
      state: null,
      result: null,
    };
  },

  computed: {
    prop() {
      if (this.state === 'fulfilled') return 'result';
      else if (this.state === 'rejected') return 'error';
      else return null;
    },
  },

  watch: {
    promise: {
      handler(promise) {
        this.state = 'pending';
        this.result = null;
        promise
          .then((result) => {
            this.state = 'fulfilled';
            this.result = result;
          })
          .catch((error) => {
            this.state = 'rejected';
            this.result = error;
          });
      },
      immediate: true,
    },
  },
};
</script>
