<template>
  <button @click.prevent="localCount++">
    {{ localCount }}
  </button>
</template>

<script>
export default {
  name: 'CounterButton',

  props: {
    count: {
      type: Number,
      default: 0,
    },
  },

  emits: ['update:count'],

  data() {
    return {
      localCount: this.count,
    };
  },

  watch: {
    count(newValue) {
      this.localCount = newValue;
    },

    localCount(newValue) {
      this.$emit('update:count', newValue);
    },
  },
};
</script>
