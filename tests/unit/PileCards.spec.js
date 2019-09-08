import { shallowMount } from '@vue/test-utils'
import PileCards from '@/components/PileCards.vue'

describe('PileCards.vue', () => {
  it('PileCards container click emit', () => {
    const wrapper = shallowMount(PileCards)

    wrapper.find({ ref: 'cardsContainer' }).trigger('click')
    expect(wrapper.emitted('toggleMini')).toBeTruthy()
  })

  it('PileCards arrange click emit', () => {
    const wrapper = shallowMount(PileCards)

    wrapper.find({ ref: 'arrangeButton' }).trigger('click')
    expect(wrapper.emitted('arrangeCards')).toBeTruthy()
  })
})
