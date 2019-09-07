<template>
  <div class="hello">
    <h1 class="text-4xl bold">{{ msg }}</h1>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
</script>
