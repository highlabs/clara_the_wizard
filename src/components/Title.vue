<template>
  <h1 class="text-4xl bold">{{ text }}</h1>
</template>

<script>
export default {
  name: 'Title',
  props: {
    text: {
      type: String,
      default: ''
    }
  }
}
</script>
