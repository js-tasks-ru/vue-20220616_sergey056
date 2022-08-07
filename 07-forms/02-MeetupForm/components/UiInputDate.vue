<template>
  <ui-input :model-value="value" :type="type" @input="handleInput">
    <template v-for="slotName in Object.keys($slots)" #[slotName]="slotProps">
      <slot :name="slotName" v-bind="slotProps" />
    </template>
  </ui-input>
</template>

<script>
import UiInput from './UiInput';

export default {
  name: 'UiInputDate',

  components: { UiInput },

  props: {
    type: {
      type: String,
      default: 'date',
      validator: (value) => ['date', 'time', 'datetime-local'].includes(value),
    },

    modelValue: {
      type: Number,
    },
  },

  emits: ['update:modelValue'],

  computed: {
    value() {
      if (!this.modelValue) {
        return '';
      }
      const isoDateTime = new Date(this.modelValue).toISOString();
      if (this.type === 'date') {
        return isoDateTime.split('T')[0];
      } else if (this.type === 'time') {
        return isoDateTime.split('T')[1].split('.')[0].substring(0, 5);
      } else {
        return isoDateTime.split('.')[0];
      }
    },
  },

  methods: {
    handleInput(event) {
      this.$emit('update:modelValue', event.target.valueAsNumber);
    },
  },
};
</script>
