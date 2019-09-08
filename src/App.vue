<template>
  <main id="app" class="font-body bg-gray-800 min-h-screen text-gray-200 p-2 flex items-stretch">
    <section class="p-4 border-gray-100 border-4 relative w-full">
      <div class="absolute top-0 left-0 right-0 text-center -mt-2 leading-none mx-auto">
        <Title text="Clara, the wizard" class="inline px-2 bg-gray-800"/>
      </div>

      <div class="flex flex-col w-full items-center h-full justify-between" v-if="claraSteps < 6">
        <div class="flex items-center h-full">
          <BoxText :text="claraText[claraSteps]" />
          <img src="./assets/clara.svg" alt="" class="w-24">
        </div>
        <div class="flex flex-col items-end w-full">
          <button @click="claraSteps = claraSteps + 1" v-if="claraSteps < 5"><span class="text-xs">Continue</span></button>
          <button @click="start()" v-else><span class="text-xs">Start</span></button>
        </div>
      </div>

      <div v-else class="flex flex-col w-full items-center h-full justify-between">
        <BoxText :text="`Step ${step + 1}`" v-if="step <= 2" />

        <div v-if="step <= 2" class="flex justify-around h-full w-full md:flex-col-reverse">
          <div class="flex flex-col w-1/4 justify-center items-stretch md:flex-row-reverse md:w-full">
            <div @click="mini = !mini" class="md:flex md:ml-4 md:h-40 md:justify-center">
              <Card
                v-for="pileOne in pile1"
                :key="pileOne.code"
                :value="pileOne.value"
                :mini="mini"
                :suit="pileOne.suit"
              />
            </div>
            <button class="mt-8 md:mt-1" @click="arrangeCards(pile2, pile1, pile3)">1</button>
          </div>

          <div class="flex flex-col w-1/4 justify-center items-stretch md:flex-row-reverse md:w-full">
            <div @click="mini = !mini" class="md:flex md:ml-4 md:h-40 md:justify-center">
              <Card
                v-for="pileTwo in pile2"
                :key="pileTwo.code"
                :value="pileTwo.value"
                :mini="mini"
                :suit="pileTwo.suit"
              />
            </div>
            <button class="mt-8 md:mt-1" @click="arrangeCards(pile1, pile2, pile3)">2</button>
          </div>

          <div class="flex flex-col w-1/4 justify-center items-stretch md:flex-row-reverse md:w-full">
            <div @click="mini = !mini" class="md:flex md:ml-4 md:h-40 md:justify-center">
              <Card
                v-for="pileThree in pile3"
                :key="pileThree.code"
                :value="pileThree.value"
                :mini="mini"
                :suit="pileThree.suit"
              />
            </div>
            <button class="mt-8 md:mt-1" @click="arrangeCards(pile1, pile3, pile2)">3</button>
          </div>
        </div>

        <div v-else class="flex flex-col justify-center items-center h-full">
          <div class="flex items-center h-full">
              <BoxText text="Your card is..." />
              <img src="./assets/clara.svg" alt="" class="w-24 mb-3">
          </div>
          <div class="w-32">
            <Card :value="handCards[10].value" :suit="handCards[10].suit" :code="handCards[10].code"/>
          </div>
          <button @click="again()" class="mt-3"><span class="text-xs">Again</span></button>
        </div>
      </div>

    </section>
  </main>
</template>

<script>
import axios from 'axios'
import Title from './components/Title.vue'
import Card from './components/Card.vue'
import BoxText from './components/BoxText'

export default {
  name: 'app',
  data () {
    return {
      firstDeck: null,
      cards: [],
      pile1: [],
      pile2: [],
      pile3: [],
      handCards: [],
      step: 0,
      mini: true,
      claraSteps: 0,
      claraText: [
        "Hi! I'm Clara Oswald! I love magic! Can I show you my favorite trick?",
        'Cool! I will show you 3 piles of cards...',
        "And you need to choose one card in just one of the piles. And don't tell me the card!",
        'When you choose the card, click on the number of the pile',
        'You will need to point it to me three times for the magic to work!',
        "Let's start?"
      ]
    }
  },
  components: {
    Title,
    Card,
    BoxText
  },
  methods: {
    async getDeck () {
      const deck = await axios.get('https://deckofcardsapi.com/api/deck/new/')
      const { deck_id: deckId } = deck.data

      this.firstDeck = deck
      this.getCards(deckId)
    },
    async getCards (deckId) {
      const cards = await axios.get(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=21`)
      this.cards = cards.data.cards
    },
    dealCards (hand) {
      if (this.cards.length === 0) {
        this.getDeck()
        return false
      }
      this.resetPiles()
      const cards = hand ? this.cards : this.handCards
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
    arrangeCards (first, middle, last) {
      let pileOfCards = [...first, ...middle, ...last]
      this.handCards = pileOfCards
      this.dealCards()
      this.step = this.step + 1
    },
    resetPiles () {
      this.pile1 = []
      this.pile2 = []
      this.pile3 = []
    },
    start () {
      this.claraSteps = this.claraSteps + 1
      this.dealCards(true)
    },
    again () {
      this.step = 0
      this.dealCards()
    }
  },
  mounted () {
    this.$nextTick(function () {
      this.getDeck()
    })
  }
}
</script>

<style scoped>
button {
  @apply px-4 py-2 border-4 border-gray-400 mb-1 inline-block whitespace-no-wrap text-sm
}

#app {
  height: 100vh; /* Fallback for browsers that do not support Custom Properties */
  height: calc(var(--vh, 1vh) * 100);
}
</style>
