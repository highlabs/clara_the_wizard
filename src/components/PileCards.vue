<template>
  <div class="flex flex-col w-1/4 justify-center items-stretch md:flex-row-reverse md:w-full">
    <div ref="cardsContainer" @click="$emit('toggleMini')" class="flex items-center flex-col md:flex-row md:ml-4 md:h-40 md:justify-center">
      <Card
        v-for="(card, index) in pile"
        :style="`z-index: ${index}`"
        :key="card.code"
        :value="card.value"
        :mini="mini && index !== pile.length - 1"
        :suit="card.suit"
      />
    </div>
    <Button ref="arrangeButton" class="mt-8 md:mt-1" :text="pileNumber" @onClick="$emit('arrangeCards')" />
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
