<template>
  <div class="flex flex-col w-1/4 justify-center items-stretch md:flex-row-reverse md:w-full">
    <div @click="$emit('toggleMini')" class="md:flex md:ml-4 md:h-40 md:justify-center">
      <Card
        v-for="card in pile"
        :key="card.code"
        :value="card.value"
        :mini="mini"
        :suit="card.suit"
      />
    </div>
    <Button class="mt-8 md:mt-1" :text="pileNumber" @onClick="$emit('arrangeCards')" />
  </div>
</template>

<script>
import Card from '@/components/Card'
import Button from '@/components/Button'

export default {
  name: 'PileCards',
  components: {
    Card,
    Button
  },
  props: {
    pile: {
      type: Array,
      default: () => {
        return []
      }
    },
    mini: {
      type: Boolean,
      default: true
    },
    pileNumber: {
      type: String,
      default: ''
    }
  }
}
</script>
