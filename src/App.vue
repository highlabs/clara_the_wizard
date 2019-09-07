<template>
  <main id="app" class="font-body bg-gray-800 min-h-screen text-gray-200 p-2">
    <Title text="Maho"/>
    <ul class="flex">
      <li v-for="card in cards" :key="card.code" class="mx-1">{{card.code}}</li>
    </ul>
  </main>
</template>

<script>
import Title from './components/Title.vue'

export default {
  name: 'app',
  data () {
    return {
      firstDeck: null,
      cards: [],
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
    getCards (deckId) {
      const self = this
      fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=21`)
        .then(response => {
          return response.json()
        }).then(json => {
          self.cards = json.cards
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
