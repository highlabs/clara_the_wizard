<template>
  <main id="app" class="font-body bg-gray-800 min-h-screen text-gray-200 p-2">
    <Title text="Maho"/>
  </main>
</template>

<script>
import Title from './components/Title.vue'

export default {
  name: 'app',
  data () {
    return {
      firstDeck: null,
    }
  },
  components: {
    Title
  },
  methods: {
    getDeck () {
      const self = this
      fetch('https://deckofcardsapi.com/api/deck/new/')
        .then(function (response) {
          return response.json()
        })
        .then(function (json) {
          const { deck_id: deckId } = json
          self.firstDeck = json
          self.getCards(deckId)
        })
    },
  },
  mounted () {
    this.$nextTick(function () {
      this.getDeck()
    })
  }
}
</script>
