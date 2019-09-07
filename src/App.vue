<template>
  <main id="app" class="font-body bg-gray-800 min-h-screen text-gray-200 p-2">
    <Title text="Maho"/>
    <ul class="flex">
      <li v-for="card in cards" :key="card.code" class="mx-1">{{card.code}}</li>
    </ul>

    <ul class="flex">
      <p>Pile1</p>
      <li v-for="pileOne in pile1" :key="pileOne.code" class="mx-1">{{pileOne.code}}</li>
    </ul>

    <ul class="flex">
      <p>Pile2</p>
      <li v-for="pileTwo in pile2" :key="pileTwo.code" class="mx-1">{{pileTwo.code}}</li>
    </ul>

    <ul class="flex">
      <p>Pile3</p>
      <li v-for="pileThree in pile3" :key="pileThree.code" class="mx-1">{{pileThree.code}}</li>
    </ul>

    <button class="px-4 py-2 border border-gray-400" @click="dealCards">Deal cards</button>
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
      pile1: [],
      pile2: [],
      pile3: [],
      pile3: []
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
    dealCards () {
      if (this.cards.length === 0) {
        this.getDeck()
        return false
      }
      this.resetPiles()

      const cards = this.cards
      let pile = 0
      for (let index = 0; index < cards.length; index++) {
        if (pile > 2) pile = 0

        switch (pile) {
          case 0:
            this.pile1.push(cards[index])
            break
          case 1:
            this.pile2.push(cards[index])
            break
          case 2:
            this.pile3.push(cards[index])
            break
          default:
            break
        }

        pile++
      }
    },
    resetPiles () {
      this.pile1 = []
      this.pile2 = []
      this.pile3 = []
    }
  },
  mounted () {
    this.$nextTick(function () {
      this.getDeck()
    })
  }
}
</script>
