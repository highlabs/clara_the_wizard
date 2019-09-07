<template>
  <div
    class="bg-gray-300 p-2 mx-1 border-black rounded"
    :class="mini ? '-mb-3': ' mb-4'"
  >
    <header class="flex text-black">
      <img :src="suitURI" :alt="`${value} of ${suit}`" class="w-4 mr-1">
      <span class="text-sm">{{value}}</span>
    </header>
    <div class="p-8" v-if="!mini">
      <img :src="suitURI" :alt="`${value} of ${suit}`">
    </div>
    <footer v-if="!mini" class="flex justify-end text-black">
      <span class="text-sm mr-1">{{value}}</span>
      <img :src="suitURI" :alt="`${value} of ${suit}`" class="w-4">
    </footer>
  </div>
</template>

<script>
import spades from '../assets/spades.svg'
import hearts from '../assets/hearts.svg'
import clubs from '../assets/clubs.svg'
import diamonds from '../assets/diamonds.svg'

export default {
  props: {
    code: String,
    suit: String,
    value: String,
    mini: Boolean
  },
  computed: {
    suitURI () {
      let suit = ''
      switch (this.suit) {
        case 'SPADES':
          suit = spades
          break
        case 'HEARTS':
          suit = hearts
          break
        case 'CLUBS':
          suit = clubs
          break
        case 'DIAMONDS':
          suit = diamonds
          break
        default:
          break
      }
      return suit
    }
  }
}
</script>
