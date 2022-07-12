<template>
  <div :class="`toast ${classByType}`">
    <ui-icon class="toast__icon" :icon="iconByType" />
    <span>{{ toast.message }}</span>
  </div>
</template>

<script>
import UiIcon from './UiIcon';
import { iconsByToastType, periodToDeleteByToastType } from './toasterConstants';

export default {
  name: 'UiToast',

  components: {
    UiIcon,
  },

  props: {
    toast: {
      type: Object,
      required: true,
    },
  },

  emits: ['delete'],

  computed: {
    classByType() {
      return `toast_${this.toast.type}`;
    },

    iconByType() {
      return iconsByToastType[this.toast.type];
    },

    periodByType() {
      return periodToDeleteByToastType[this.toast.type];
    },
  },

  mounted() {
    setTimeout(() => {
      this.$emit('delete', this.toast.id);
    }, this.periodByType);
  },
};
</script>

<style scoped>
.toast {
  display: flex;
  flex: 0 0 auto;
  flex-direction: row;
  align-items: center;
  padding: 16px;
  background: #ffffff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  border-radius: 4px;
  font-size: 18px;
  line-height: 28px;
  width: auto;
}

.toast + .toast {
  margin-top: 20px;
}

.toast__icon {
  margin-right: 12px;
}

.toast.toast_success {
  color: var(--green);
}

.toast.toast_error {
  color: var(--red);
}
</style>
