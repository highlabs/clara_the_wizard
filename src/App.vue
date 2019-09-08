<template>
  <main id="app" class="font-body bg-gray-800 min-h-screen text-gray-200 p-2 flex items-stretch">
    <section class="p-4 border-gray-100 border-4 relative w-full">
      <Header />

      <ClaraIntroduction
        v-if="claraSteps < 6"
        :claraSteps="claraSteps"
        @startClick="start"
        @incrementSteps="incrementClaraSteps"
        ref="claraSteps"
      />

      <div ref="magicContainer" v-else class="flex flex-col w-full items-center h-full justify-between">
        <BoxText :text="`Step ${step + 1}`" v-if="step <= 2" />

        <div v-if="step <= 2" class="flex justify-around h-full w-full md:flex-col">
          <PileCards
            :pile="pile1"
            @toggleMini="toggleMiniCards"
            :mini="mini"
            @arrangeCards="arrangeCards(pile2, pile1, pile3)"
            pileNumber="1"
          />

          <PileCards
            :pile="pile2"
            @toggleMini="toggleMiniCards"
            :mini="mini"
            @arrangeCards="arrangeCards(pile1, pile2, pile3)"
            pileNumber="2"
          />

          <PileCards
            :pile="pile3"
            @toggleMini="toggleMiniCards"
            :mini="mini"
            @arrangeCards="arrangeCards(pile1, pile3, pile2)"
            pileNumber="3"
          />
        </div>

        <div v-else class="flex flex-col justify-center items-center h-full">
          <div class="flex items-center h-full">
              <BoxText text="Your card is..." />
              <img src="./assets/clara.svg" alt="" class="w-24 mb-3">
          </div>
          <div class="w-32 flex justify-center">
            <Card class="m-2" :value="cards[10].value" :suit="cards[10].suit" :code="cards[10].code"/>
          </div>
          <Button @onClick="again()" text="Again" class="mt-3" />
        </div>
      </div>

    </section>
  </main>
</template>

<script>
import axios from 'axios'
import Card from './components/Card.vue'
import BoxText from './components/BoxText'
import Header from './components/Header'
import ClaraIntroduction from '@/components/ClaraIntroduction'
import PileCards from '@/components/PileCards'
import Button from '@/components/Button'

export default {
  name: 'app',
  data () {
    return {
      firstDeck: null,
      cards: [],
      pile1: [],
      pile2: [],
      pile3: [],
      step: 0,
      mini: true,
      claraSteps: 0
    }
  },
  components: {
    Card,
    BoxText,
    Header,
    ClaraIntroduction,
    PileCards,
    Button
  },
  methods: {
    async getDeck () {
      const deck = await axios.get('https://deckofcardsapi.com/api/deck/new/')
      const { deck_id: deckId } = deck.data

      this.firstDeck = deck
      await this.getCards(deckId)
    },
    async getCards (deckId) {
      const cards = await axios.get(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=21`)
      this.cards = cards.data.cards
    },
    async dealCards (hand) {
      if (this.cards.length === 0) {
        await this.getDeck()
        this.dealCards()
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
    arrangeCards (first, middle, last) {
      let pileOfCards = [...first, ...middle, ...last]
      this.cards = pileOfCards
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
      this.dealCards()
    },
    incrementClaraSteps () {
      this.claraSteps = this.claraSteps + 1
    },
    toggleMiniCards () {
      this.mini = !this.mini
    },
    again () {
      this.step = 0
      this.dealCards()
    }
  }
}
</script>

<style>
#app {
  min-height: 100vh;
  min-height: calc(var(--vh, 1vh) * 100);
}
</style>
