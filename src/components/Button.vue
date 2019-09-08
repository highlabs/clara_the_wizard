<template>
  <button class="px-4 py-2 border-4 border-gray-400 mb-1 inline-block whitespace-no-wrap text-sm" @click="$emit('onClick')">
    <span class="text-xs">{{ text }}</span>
  </button>
</template>

<script>
export default {
  name: 'Button',
  props: {
    text: {
      type: String,
      default: ''
    }
  }
}
</script>
