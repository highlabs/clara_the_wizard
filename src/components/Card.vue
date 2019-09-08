<template>
  <div
    class="bg-white p-2 border-black border-2 rounded flex flex-col justify-between items-center h-42 w-24 max-w-full relative"
    :class="mini ? '-mb-24 md:-mr-12 md:mb-1': 'mb-2 md:mb-1 mr-2'"
  >
    <header class="flex text-black w-full">
      <img :src="suitURI" :alt="`${value} of ${suit}`" class="w-4 mr-1">
      <span class="text-sm">{{name}}</span>
    </header>
    <div class="py-2">
      <img :src="suitURI" :alt="`${value} of ${suit}`" class="w-12">
    </div>
    <footer class="flex justify-end text-black w-full">
      <span class="text-sm mr-1">{{name}}</span>
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
    suit: {
      type: String,
      default: ''
    },
    value: {
      type: String,
      default: ''
    },
    mini: {
      type: Boolean,
      default: false
    }
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
    },
    name () {
      return this.value.charAt(0)
    }
  }
}
</script>
