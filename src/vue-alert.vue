<template>
  <div class="alert-wrapper">
      <slot name="title">
        <h1 class="title" :class="titleClass">{{ title }}</h1>
      </slot>
      <slot name="message">
        <p class="message" :class="messageClass">{{ message }}</p>
      </slot>
  </div>
</template>

<script>

export default {
  name: 'vue-alert',
  props: {
    title: {
      type: String,
      default: 'Alert'
    },
    message: {
      type: String,
      default: 'Alert message'
    },
    titleClass: {
      type: Array,
      default: []
    },
    messageClass: {
      type: Array,
      default: []
    },
  }
}

</script>

<style scoped>
  .alert-wrapper {
    position: absolute;
    bottom: 20px;
    right: 20px;
  }

  .title {
    color: darkgray;
  }

  .message {
    color: dimgray;
  }
</style>