<template>
  <div class="flex flex-col w-full items-center h-full justify-between">
    <div class="flex items-center h-full">
      <BoxText :text="claraText[claraSteps]" />
      <img src="../assets/clara.svg" alt="" class="w-24">
    </div>
    <div class="flex flex-col items-end w-full">
      <Button ref="continueButton" @onClick="$emit('incrementSteps')" text="Continue" v-if="claraSteps < claraText.length - 1"/>
      <div v-else>
        <Button ref="startButton" @onClick="$emit('startClick')" text="Start" />
      </div>
    </div>
  </div>
</template>

<script>
import BoxText from '@/components/BoxText'
import Button from '@/components/Button'

export default {
  name: 'ClaraIntroduction',
  components: {
    BoxText,
    Button
  },
  data () {
    return {
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
  props: {
    claraSteps: {
      type: Number,
      default: 0
    }
  }
}
</script>
