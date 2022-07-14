<template>
  <div class="toasts">
    <ui-toast v-for="toast in toasts" :key="toast.id" :toast="toast" @delete="deleteToast(toast.id)" />
  </div>
</template>

<script>
import UiIcon from './UiIcon.vue';
import UiToast from './UiToast';

export default {
  name: 'TheToaster',

  components: { UiToast, UiIcon },
  data() {
    return {
      toasts: [],
      nextId: 1,
    };
  },

  methods: {
    success(message) {
      this.toasts.push({
        id: this.nextId++,
        message,
        type: 'success',
      });
    },

    error(message) {
      this.toasts.push({
        id: this.nextId++,
        message,
        type: 'error',
      });
    },

    deleteToast(id) {
      this.toasts = this.toasts.filter((toast) => toast.id !== id);
    },
  },
};
</script>

<style scoped>
.toasts {
  position: fixed;
  bottom: 8px;
  right: 8px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  white-space: pre-wrap;
  z-index: 999;
}

@media all and (min-width: 992px) {
  .toasts {
    bottom: 72px;
    right: 112px;
  }
}
</style>
