<template>
  <div class="hello">
    <h1 class="text-4xl bold">{{ text }}</h1>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    text: {
      type: String,
      default: ''
    }
  }
}
</script>
