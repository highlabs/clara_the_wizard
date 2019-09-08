<template>
  <div class="absolute top-0 left-0 right-0 text-center -mt-2 leading-none mx-auto">
    <Title text="Clara, the wizard" class="inline px-2 bg-gray-800"/>
  </div>
</template>

<script>
import Title from '@/components/Title.vue'

export default {
  name: 'Header',
  components: {
    Title
  }
}
</script>
