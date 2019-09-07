<template>
  <div class="border-gray-100 border-4 mb-3 text-sm p-2 w-full md:w-64">
    <p>{{ text }}</p>
  </div>
</template>

<script>
export default {
  name: 'BoxText',
  props: {
    text: {
      type: String,
      default: ''
    }
  }
}
</script>
