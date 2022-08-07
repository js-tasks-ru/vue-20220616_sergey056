<template>
  <div class="image-uploader">
    <label
      class="image-uploader__preview"
      :class="{ 'image-uploader__preview-loading': loading }"
      :style="loaded ? `--bg-url: url('${localPreview}')` : ''"
    >
      <span class="image-uploader__text">{{ message }}</span>
      <input
        v-bind="$attrs"
        ref="fileInput"
        type="file"
        accept="image/*"
        class="image-uploader__input"
        @change="handleChange"
        @click="handleClick"
      />
    </label>
  </div>
</template>

<script>
export default {
  name: 'UiImageUploader',

  inheritAttrs: false,

  props: {
    preview: {
      type: String,
      default: '',
    },

    uploader: {
      type: Function,
    },
  },

  emits: ['remove', 'select', 'error', 'upload'],

  data() {
    return {
      loading: false,
      loaded: !!this.preview,
      localPreview: this.preview,
    };
  },

  computed: {
    message() {
      if (this.loading) return 'Загрузка...';
      else if (this.loaded) return 'Удалить изображение';
      else return 'Загрузить изображение';
    },
  },

  watch: {
    preview(newValue) {
      this.localPreview = newValue;
    },
  },

  methods: {
    handleChange(event) {
      if (!event.target.files?.length) return;

      const file = event.target.files[0];
      this.$emit('select', file);

      if (this.uploader) {
        this.toLoadingState();
        try {
          this.uploader(file).then(
            (result) => {
              this.$emit('upload', result);
              this.toSuccessLoadedState();
            },
            (error) => {
              this.$emit('error', error);
              this.toEmptyState();
            },
          );
        } catch (e) {
          this.toEmptyState();
        }
      } else {
        this.localPreview = URL.createObjectURL(file);
        this.toSuccessLoadedState();
      }
    },

    handleClick(event) {
      if (this.loaded) {
        event.preventDefault();
        this.$refs.fileInput.value = '';
        this.$emit('remove');
        this.loaded = false;
      }
    },

    toLoadingState() {
      this.loading = true;
      this.loaded = false;
    },

    toSuccessLoadedState() {
      this.loading = false;
      this.loaded = true;
    },

    toEmptyState() {
      this.loading = false;
      this.loaded = false;
      this.$refs.fileInput.value = '';
    },
  },
};
</script>

<style scoped>
.image-uploader {
}

.image-uploader__input {
  opacity: 0;
  height: 0;
}

.image-uploader__preview {
  --bg-url: var(--default-cover);
  background-size: cover;
  background-position: center;
  background-image: linear-gradient(0deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), var(--bg-url);
  border: 2px solid var(--blue-light);
  border-radius: 8px;
  transition: 0.2s border-color;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 512px;
  height: 228px;
}

.image-uploader__text {
  color: var(--white);
  font-family: 'Nunito', sans-serif;
  font-weight: 600;
  font-size: 20px;
  line-height: 28px;
}

.image-uploader__preview:hover {
  border-color: var(--blue);
}

.image-uploader__preview.image-uploader__preview-loading {
  cursor: no-drop;
}
</style>
